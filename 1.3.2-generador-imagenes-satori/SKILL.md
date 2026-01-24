---
name: generador-imagenes-satori
description: Genera imágenes PNG desde HTML/CSS usando Satori. Úsalo para crear imágenes sociales, carruseles o cualquier visual programático.
---

# Generador de Imágenes Satori

> **Marca:** Antes de empezar, personaliza el skill con tu marca.
> 1. Sube tu logo a `assets/logo.png`.
> 2. Sube tu foto de perfil a `assets/autor.jpg`.
> 3. Abre `scripts/generate.js` y edita el objeto `COLORS` con tus colores de marca (especialmente `accent`).

## Inicio Rápido
```powershell
cd "global_skills/1.3.2-generador-imagenes-satori/scripts"
node generate.js
```

## Ubicación de Salida

Los carruseles se guardan en:
- `../output/{nombre-carpeta}/`

## Reglas de Flujo de Trabajo

> [!IMPORTANT]
> Después de generar un carrusel, SIEMPRE crea un artefacto walkthrough mostrando todas las slides en una vista previa de carrusel:
> 
> ```markdown
> ````carousel
> ![Slide 1](path/to/slide-01.png)
> <!-- slide -->
> ![Slide 2](path/to/slide-02.png)
> ````
> ```

---

## Parte 1: Referencia Satori

### CSS Soportado

| Categoría | Propiedades |
|-----------|-------------|
| **Diseño** | `display` (flex/none), `position`, `flexDirection`, `flexWrap`, `alignItems`, `justifyContent`, `gap` |
| **Tamaño** | `width`, `height`, `min/maxWidth`, `min/maxHeight`, `margin`, `padding` |
| **Tipografía** | `fontFamily`, `fontSize`, `fontWeight`, `textAlign`, `lineHeight`, `letterSpacing` |
| **Colores** | `color`, `backgroundColor`, `backgroundImage` (gradientes, url) |
| **Bordes** | `border`, `borderRadius`, `borderWidth`, `borderColor` |
| **Efectos** | `opacity`, `boxShadow`, `textShadow`, `filter`, `transform` |

### NO Soportado

> [!CAUTION]
> - `z-index` (usa orden del DOM)
> - `calc()`
> - Fuentes WOFF2 (usa TTF/OTF/WOFF)
> - Transformaciones 3D
> - **Símbolos Unicode** (▸, →, etc.) — las fuentes no los incluyen

### Iconos SVG (¡Usa esto!)

```javascript
// Icono de flecha
function ArrowRightIcon({ size = 24, color = '#DBFF00' }) {
    return {
        type: 'svg',
        props: {
            width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
            children: [
                { type: 'path', props: { d: 'M5 12h14M12 5l7 7-7 7', stroke: color, strokeWidth: 2.5, strokeLinecap: 'round' } },
            ],
        },
    };
}

// Viñeta Chevron
function ChevronRightIcon({ size = 20, color = '#DBFF00' }) {
    return {
        type: 'svg',
        props: {
            width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
            children: [
                { type: 'path', props: { d: 'M9 18l6-6-6-6', stroke: color, strokeWidth: 3, strokeLinecap: 'round' } },
            ],
        },
    };
}
```

> [!TIP]
> Encuentra paths SVG en [Lucide Icons](https://lucide.dev/) o [Heroicons](https://heroicons.com/)

### Carga de Fuentes
```javascript
const fontData = await fetch('https://fonts.gstatic.com/s/inter/...woff').arrayBuffer();
const fonts = [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' }];
```

### Incrustación de Imágenes (base64)
```javascript
const buffer = readFileSync('image.png');
const src = `data:image/png;base64,${buffer.toString('base64')}`;
```

> [!WARNING]
> **¡Siempre detecta el formato de imagen por magic bytes, no por extensión!**
> Los archivos pueden tener extensiones incorrectas. Usa firmas:
> - PNG: `89504e47`
> - JPEG: `ffd8ff`
> - GIF: `47494638`

### Sintaxis sin JSX
```javascript
const element = {
    type: 'div',
    props: {
        style: { display: 'flex', background: '#0a0a0a', color: '#fff' },
        children: 'Hola Mundo',
    },
};
await satori(element, { width: 1080, height: 1080, fonts });
```

---

## Parte 2: Plantillas de Carrusel LinkedIn

### Reglas de Diseño Críticas

| Regla | Valor |
|-------|-------|
| **Tamaño** | 1080×1080 (cuadrado) |
| **Fuente** | Outfit (Google Fonts TTF) |
| **Puntos de pág** | 16px mínimo |
| **Slide Portada** | Usa MagazineCover con imagen |
| **Viñetas** | Usa iconos SVG chevron |
| **Título Portada** | 67px (bold) |
| **Subtítulo Portada** | 31px |
| **Título Slide** | 43-48px (bold, acento) |
| **Texto cuerpo** | 48px |
| **Texto viñeta** | 36px |
| **Título CTA** | 55px |
| **Botón CTA** | 34px |
| **Gradiente Portada** | 14%-70% opacidad (más claro para visibilidad de imagen) |

### MagazineCover (Por defecto para portadas)
```javascript
MagazineCover({ 
    title: '...', 
    subtitle: '...', 
    tags: ['Tag 1']  // Tags lima opcionales
})
```
Características: Imagen de fondo full-bleed, capa de gradiente, footer de autor.

### CoverSlide (Solo texto simple)
```javascript
CoverSlide({ title: '...', subtitle: '...' })
```

### TextSlide
```javascript
TextSlide({ title: 'Problema', text: '...' })
```

### BulletSlide
```javascript
BulletSlide({ title: 'Puntos Clave', bullets: ['...', '...'] })
```

### CTASlide
```javascript
CTASlide({ title: '...', cta: 'Click Aquí', link: 'tu-sitio.com' })
```

---

## Parte 3: Plantillas Genéricas

### SimpleCard
```javascript
SimpleCard({ title: '...', description: '...' })
```

### Quote
```javascript
Quote({ text: '...', author: '...' })
```

### Stats
```javascript
Stats({ number: '100x', label: 'Más Rápido' })
```

---

## Tamaños de Salida

| Caso de Uso | Tamaño |
|-------------|--------|
| LinkedIn/Instagram | 1080×1080 |
| Carrusel LinkedIn | 1080×1350 |
| Twitter/X card | 1200×675 |
| Imagen OG | 1200×630 |

## Activos
- `assets/logo.png` — Tu Logo (Reemplaza este archivo)
- `assets/autor.jpg` — Tu Foto (Reemplaza este archivo)

---

## Créditos

> 🚀 **Compilado y Traducido por [100x](https://www.100x.mx)** — Agentes de IA para empresas que quieren crecer 100x.
>
> 📚 Más skills y tutoriales en [github.com/agentes100x/agentes-100x](https://github.com/agentes100x/agentes-100x)
>
> 💼 ¿Quieres que implementemos agentes en tu empresa? [Contáctanos](https://www.100x.mx/empresas)
