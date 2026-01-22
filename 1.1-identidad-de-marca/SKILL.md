---
name: brand-identity
description: Proporciona la fuente única de verdad para guías de marca, tokens de diseño, decisiones tecnológicas y voz/tono. Usar este skill cuando se generen componentes UI, se estilicen aplicaciones, se escriba copy o se creen assets para usuarios para asegurar consistencia de marca.
---

# Identidad de Marca y Guías

**Nombre de Marca:** 100X

Este skill define las restricciones fundamentales para diseño visual e implementación técnica de la marca. Debes adherirte a estas guías estrictamente para mantener consistencia.

## Documentación de Referencia

Dependiendo de la tarea que estés realizando, consulta los archivos de recursos específicos abajo. No adivines elementos de marca; siempre lee el archivo correspondiente.

### Para Diseño Visual y Estilizado UI
Si necesitas colores exactos, fuentes, radios de borde o valores de espaciado, lee:
👉 **`resources/design-tokens.json`**

### Para Código e Implementación de Componentes
Si estás generando código, eligiendo librerías o estructurando componentes UI, lee las restricciones técnicas aquí:
👉 **`resources/tech-stack.md`**

### Para Copywriting y Generación de Contenido
Si estás escribiendo copy de marketing, mensajes de error, documentación o texto para usuarios, lee las guías de persona aquí:
👉 **`resources/voice-tone.md`**

### Para Diseño de Interfaces de IA
Si estás construyendo interfaces con IA, chatbots, estados de "pensando" o diseños que transmiten inteligencia:
👉 **`1.4-diseno-gemini/SKILL.md`**

## Assets de Marca
- **Logo**: `assets/logo.png`
- **Color Primario**: Verde Lima `#DBFF00`
- **Fondo**: Negro Profundo `#050505`

## Ejemplo de Tokens de Diseño

```json
{
  "colors": {
    "primary": "#DBFF00",
    "background": "#050505",
    "text": "#FFFFFF",
    "textMuted": "#A0A0A0"
  },
  "fonts": {
    "heading": "Outfit, sans-serif",
    "body": "Inter, sans-serif"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  }
}
```

---

## Créditos

> 🚀 **Compilado y Traducido por [100x](https://www.100x.mx)** — Agentes de IA para empresas que quieren crecer 100x.
>
> 📚 Más skills y tutoriales en [github.com/agentes100x/agentes-100x](https://github.com/agentes100x/agentes-100x)
>
> 💼 ¿Quieres que implementemos agentes en tu empresa? [Contáctanos](https://www.100x.mx/empresas)
