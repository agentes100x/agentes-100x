import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================
// CONSTANTES DE DISEÑO (PERSONALIZA ESTO)
// ============================================
const COLORS = {
    bg: '#0a0a0a',
    bgGradient: 'linear-gradient(145deg, #0a0a0a 0%, #151515 50%, #0a0a0a 100%)',
    accent: '#DBFF00', // PERSONALIZAR: Tu color de marca principal
    text: '#ffffff',
    textMuted: '#a0a0a0',
    border: '#222',
};

// ============================================
// CARGA DE FUENTES - Outfit (coincide con blog 100x)
// ============================================
async function loadFonts() {
    const regular = await fetch(
        'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.ttf'
    ).then(r => r.arrayBuffer());

    const bold = await fetch(
        'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4deyC4E.ttf'
    ).then(r => r.arrayBuffer());

    return [
        { name: 'Outfit', data: regular, weight: 400, style: 'normal' },
        { name: 'Outfit', data: bold, weight: 700, style: 'normal' },
    ];
}

// ============================================
// CARGA DE ACTIVOS - Detecta formato por magic bytes
// ============================================
function loadAsset(filename) {
    const path = join(__dirname, '..', 'assets', filename); // Ajustado ruta ../assets
    if (!existsSync(path)) {
        console.warn(`⚠️ Activo no encontrado: ${filename}`);
        return null;
    }
    const buffer = readFileSync(path);

    // Detect format from magic bytes (not extension!)
    const signature = buffer.slice(0, 4).toString('hex').toLowerCase();
    let mime;
    if (signature.startsWith('89504e47')) {
        mime = 'image/png';
    } else if (signature.startsWith('ffd8ff')) {
        mime = 'image/jpeg';
    } else if (signature.startsWith('47494638')) {
        mime = 'image/gif';
    } else {
        // Fallback to extension
        const ext = filename.split('.').pop().toLowerCase();
        mime = ext === 'png' ? 'image/png' : 'image/jpeg';
        console.warn(`⚠️ Formato desconocido para ${filename}, asumiendo ${mime}`);
    }

    console.log(`✅ Cargado ${filename} (${mime}, ${Math.round(buffer.length / 1024)}KB)`);
    return `data:${mime};base64,${buffer.toString('base64')}`;
}

const LOGO = loadAsset('logo.png');
const AUTHOR_PHOTO = loadAsset('autor.jpg');

// ============================================
// ICONOS SVG (Satori los renderiza correctamente)
// ============================================

function ArrowRightIcon({ size = 24, color = '#DBFF00' }) {
    return {
        type: 'svg',
        props: {
            width: size,
            height: size,
            viewBox: '0 0 24 24',
            fill: 'none',
            style: { display: 'flex' },
            children: [
                { type: 'path', props: { d: 'M5 12h14M12 5l7 7-7 7', stroke: color, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' } },
            ],
        },
    };
}

function ChevronRightIcon({ size = 20, color = '#DBFF00' }) {
    return {
        type: 'svg',
        props: {
            width: size,
            height: size,
            viewBox: '0 0 24 24',
            fill: 'none',
            style: { display: 'flex', marginTop: 4 },
            children: [
                { type: 'path', props: { d: 'M9 18l6-6-6-6', stroke: color, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } },
            ],
        },
    };
}

// ============================================
// COMPONENTES COMPARTIDOS
// ============================================

function PageDots({ current, total }) {
    const dots = [];
    for (let i = 1; i <= total; i++) {
        dots.push({
            type: 'div',
            props: {
                key: i,
                style: {
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    background: i === current ? COLORS.accent : '#444',
                    marginLeft: 10,
                },
            },
        });
    }
    return {
        type: 'div',
        props: {
            style: { display: 'flex', position: 'absolute', top: 40, right: 50 },
            children: dots,
        },
    };
}

function SwipeArrow() {
    return {
        type: 'div',
        props: {
            style: { display: 'flex', alignItems: 'center', position: 'absolute', top: 40, right: 50 },
            children: [
                { type: 'div', props: { style: { fontSize: 18, color: COLORS.textMuted, marginRight: 8 }, children: 'Desliza' } },
                ArrowRightIcon({ size: 28, color: COLORS.accent }),
            ],
        },
    };
}

function AuthorFooter() {
    return {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 'auto',
                paddingTop: 30,
                borderTop: `1px solid ${COLORS.border}`,
            },
            children: [
                {
                    type: 'div',
                    props: {
                        style: { display: 'flex', alignItems: 'center' },
                        children: [
                            AUTHOR_PHOTO && { type: 'img', props: { src: AUTHOR_PHOTO, width: 50, height: 50, style: { borderRadius: 25, objectFit: 'cover' } } },
                            { type: 'div', props: { style: { marginLeft: 14, fontSize: 22, fontWeight: 600, color: COLORS.text }, children: 'Tu Nombre' } }, // PERSONALIZAR: Tu nombre aquí
                        ].filter(Boolean),
                    },
                },
                LOGO && { type: 'img', props: { src: LOGO, width: 90, height: 36, style: { objectFit: 'contain' } } },
            ].filter(Boolean),
        },
    };
}

function SlideWrapper({ children, showArrow = false, pageNum, totalPages }) {
    return {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                padding: 45,
                background: COLORS.bgGradient,
                fontFamily: 'Outfit',
                color: COLORS.text,
                position: 'relative',
            },
            children: [
                showArrow ? SwipeArrow() : (pageNum && totalPages ? PageDots({ current: pageNum, total: totalPages }) : null),
                ...children,
                AuthorFooter(),
            ].filter(Boolean),
        },
    };
}

// ============================================
// PLANTILLAS DE CARRUSEL
// ============================================

function CoverSlide({ title, subtitle, pageNum, totalPages }) {
    return SlideWrapper({
        showArrow: true,
        pageNum,
        totalPages,
        children: [
            {
                type: 'div',
                props: {
                    style: { display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' },
                    children: [
                        { type: 'div', props: { style: { fontSize: 52, fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }, children: title } },
                        subtitle && { type: 'div', props: { style: { fontSize: 28, color: COLORS.textMuted }, children: subtitle } },
                    ].filter(Boolean),
                },
            },
        ],
    });
}

// Magazine-style cover with full-bleed image
const BLOG_HEADER = loadAsset('blog-header.png');

function MagazineCover({ title, subtitle, tags = [], pageNum, totalPages }) {
    return {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                fontFamily: 'Outfit',
                color: COLORS.text,
                position: 'relative',
            },
            children: [
                // Background image (full bleed)
                BLOG_HEADER && {
                    type: 'img',
                    props: {
                        src: BLOG_HEADER,
                        width: 1080,
                        height: 1080,
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        },
                    },
                },
                // Dark gradient overlay (bottom-heavy for text readability)
                {
                    type: 'div',
                    props: {
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.7) 100%)',
                        },
                    },
                },
                // Swipe arrow
                SwipeArrow(),
                // Content container
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            justifyContent: 'flex-end',
                            padding: 50,
                            paddingBottom: 130,
                            position: 'relative',
                        },
                        children: [
                            // Tags
                            tags.length > 0 && {
                                type: 'div',
                                props: {
                                    style: { display: 'flex', gap: 12, marginBottom: 20 },
                                    children: tags.map((tag, i) => ({
                                        type: 'div',
                                        props: {
                                            key: i,
                                            style: {
                                                background: COLORS.accent,
                                                color: '#000',
                                                fontSize: 17,
                                                fontWeight: 700,
                                                padding: '6px 14px',
                                                borderRadius: 6,
                                                textTransform: 'uppercase',
                                                letterSpacing: 1,
                                            },
                                            children: tag,
                                        },
                                    })),
                                },
                            },
                            // Title
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: 67,
                                        fontWeight: 700,
                                        lineHeight: 1.1,
                                        marginBottom: 16,
                                        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                                    },
                                    children: title,
                                },
                            },
                            // Subtitle
                            subtitle && {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: 31,
                                        color: 'rgba(255,255,255,0.85)',
                                        lineHeight: 1.4,
                                    },
                                    children: subtitle,
                                },
                            },
                        ].filter(Boolean),
                    },
                },
                // Footer
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '20px 50px',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            background: 'rgba(0,0,0,0.8)',
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: { display: 'flex', alignItems: 'center' },
                                    children: [
                                        AUTHOR_PHOTO && { type: 'img', props: { src: AUTHOR_PHOTO, width: 44, height: 44, style: { borderRadius: 22, objectFit: 'cover' } } },
                                        { type: 'div', props: { style: { marginLeft: 12, fontSize: 22, fontWeight: 600 }, children: 'Tu Nombre' } }, // PERSONALIZAR
                                    ].filter(Boolean),
                                },
                            },
                            LOGO && { type: 'img', props: { src: LOGO, width: 80, height: 32, style: { objectFit: 'contain' } } },
                        ].filter(Boolean),
                    },
                },
            ].filter(Boolean),
        },
    };
}

function TextSlide({ title, text, pageNum, totalPages }) {
    return SlideWrapper({
        pageNum,
        totalPages,
        children: [
            {
                type: 'div',
                props: {
                    style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', paddingTop: 30 },
                    children: [
                        title && {
                            type: 'div',
                            props: {
                                style: { display: 'flex', alignItems: 'center', marginBottom: 30 },
                                children: [
                                    { type: 'div', props: { style: { width: 5, height: 50, background: COLORS.accent, borderRadius: 3, marginRight: 20 } } },
                                    { type: 'div', props: { style: { fontSize: 43, fontWeight: 700, color: COLORS.accent }, children: title } },
                                ],
                            },
                        },
                        { type: 'div', props: { style: { fontSize: 48, lineHeight: 1.4 }, children: text } },
                    ].filter(Boolean),
                },
            },
        ],
    });
}

function BulletSlide({ title, bullets, pageNum, totalPages }) {
    return SlideWrapper({
        pageNum,
        totalPages,
        children: [
            {
                type: 'div',
                props: {
                    style: { display: 'flex', flexDirection: 'column', flex: 1, paddingTop: 50 },
                    children: [
                        { type: 'div', props: { style: { fontSize: 48, fontWeight: 700, marginBottom: 40 }, children: title } },
                        {
                            type: 'div',
                            props: {
                                style: { display: 'flex', flexDirection: 'column', gap: 24 },
                                children: bullets.map((b, i) => ({
                                    type: 'div',
                                    props: {
                                        key: i,
                                        style: { display: 'flex', alignItems: 'flex-start', fontSize: 36, lineHeight: 1.4 },
                                        children: [
                                            ChevronRightIcon({ size: 24, color: COLORS.accent }),
                                            { type: 'span', props: { style: { marginLeft: 12 }, children: b } },
                                        ],
                                    },
                                })),
                            },
                        },
                    ],
                },
            },
        ],
    });
}

function CTASlide({ title, cta, link, pageNum, totalPages }) {
    return SlideWrapper({
        pageNum,
        totalPages,
        children: [
            {
                type: 'div',
                props: {
                    style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' },
                    children: [
                        { type: 'div', props: { style: { fontSize: 55, fontWeight: 700, marginBottom: 40, lineHeight: 1.2 }, children: title } },
                        { type: 'div', props: { style: { display: 'flex', background: COLORS.accent, color: '#000', fontSize: 34, fontWeight: 700, padding: '20px 50px', borderRadius: 14 }, children: cta } },
                        link && { type: 'div', props: { style: { fontSize: 26, color: COLORS.textMuted, marginTop: 24 }, children: link } },
                    ].filter(Boolean),
                },
            },
        ],
    });
}

// ============================================
// GENERACIÓN CORE
// ============================================
async function generateImage(element, outputPath, options = {}) {
    const { width = 1080, height = 1080 } = options;
    const fonts = await loadFonts();

    const svg = await satori(element, { width, height, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width } });
    const png = resvg.render().asPng();

    const dir = dirname(outputPath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    writeFileSync(outputPath, png);
    console.log(`✅ Guardado: ${outputPath}`);
    return outputPath;
}

async function generateCarousel(slides, outputDir, baseName = 'slide') {
    // Salida simplificada a ../output
    const outputPath = join(__dirname, '..', 'output', outputDir);

    if (!existsSync(outputPath)) mkdirSync(outputPath, { recursive: true });

    const total = slides.length;
    for (let i = 0; i < slides.length; i++) {
        const { template, props } = slides[i];
        const num = i + 1;
        const filename = `${baseName}-${String(num).padStart(2, '0')}.png`;
        await generateImage(template({ ...props, pageNum: num, totalPages: total }), join(outputPath, filename));
    }
    console.log(`\n🎠 Carrusel: ${total} slides en ${outputPath}`);
}

// ============================================
// EJEMPLO PRINCIPAL
// ============================================
async function main() {
    const slides = [
        { template: MagazineCover, props: { title: 'Crea Carruseles en 10 Segundos', subtitle: 'El prompt exacto + la herramienta', tags: ['Inteligencia Artificial'] } },
        { template: TextSlide, props: { title: 'La herramienta', text: 'Satori convierte código en imágenes PNG. Tu agente de IA escribe el código. Tú solo describes lo que quieres.' } },
        { template: BulletSlide, props: { title: 'El prompt exacto', bullets: ['"Crea un generador de carruseles con Satori"', '"Fondo oscuro, acento marca"', '"Footer con mi foto y logo"', '"Slides: cover, texto, bullets, CTA"'] } },
        { template: BulletSlide, props: { title: 'El resultado', bullets: ['Un comando = 6 slides en 1 minuto', 'Misma marca en cada slide', 'Cambias el contenido, regeneras', 'Cero Canva, cero diseño manual'] } },
        { template: TextSlide, props: { title: 'La clave', text: 'No le pedí un carrusel. Le pedí un GENERADOR de carruseles. La diferencia es automatización infinita.' } },
        { template: CTASlide, props: { title: 'Estoy regalando el generador\n\nComenta "AGENTE"', cta: 'Sígueme para más', link: 'linkedin.com/in/tu-usuario' } },
    ];

    await generateCarousel(slides, 'ejemplo-carrusel-ia', 'slide');
}

export { generateImage, generateCarousel, CoverSlide, MagazineCover, TextSlide, BulletSlide, CTASlide };
main().catch(console.error);
