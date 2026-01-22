---
name: brainstorming
description: "DEBES usar esto antes de cualquier trabajo creativo - crear funciones, construir componentes, agregar funcionalidad o modificar comportamiento. Explora la intención del usuario, requisitos y diseño antes de implementar."
---

# Convertir Ideas en Diseños

## Resumen

Ayuda a transformar ideas en diseños y especificaciones completas a través de un diálogo colaborativo natural.

Comienza entendiendo el contexto actual del proyecto, luego haz preguntas una a la vez para refinar la idea. Una vez que entiendas lo que estás construyendo, presenta el diseño en secciones pequeñas (200-300 palabras), verificando después de cada sección si todo va bien hasta ahora.

## El Proceso

**Entendiendo la idea:**
- Primero revisa el estado actual del proyecto (archivos, docs, commits recientes)
- Haz preguntas una a la vez para refinar la idea
- Prefiere preguntas de opción múltiple cuando sea posible, pero las abiertas también están bien
- Solo una pregunta por mensaje - si un tema necesita más exploración, divídelo en múltiples preguntas
- Enfócate en entender: propósito, restricciones, criterios de éxito

**Explorando enfoques:**
- Propón 2-3 enfoques diferentes con sus pros y contras
- Presenta opciones de manera conversacional con tu recomendación y razonamiento
- Lidera con tu opción recomendada y explica por qué

**Presentando el diseño:**
- Una vez que creas entender lo que estás construyendo, presenta el diseño
- Divídelo en secciones de 200-300 palabras
- Pregunta después de cada sección si todo va bien hasta ahora
- Cubre: arquitectura, componentes, flujo de datos, manejo de errores, testing
- Prepárate para volver atrás y clarificar si algo no tiene sentido

## Después del Diseño

**Documentación:**
- Escribe el diseño validado en `docs/plans/YYYY-MM-DD-<tema>-design.md`
- Usa el skill writing-clearly-and-concisely si está disponible
- Haz commit del documento de diseño a git

**Implementación (si continúas):**
- Pregunta: "¿Listo para configurar la implementación?"
- Usa using-git-worktrees para crear un espacio de trabajo aislado
- Usa planning para crear un plan de implementación detallado

## Principios Clave

- **Una pregunta a la vez** - No abrumes con múltiples preguntas
- **Opción múltiple preferida** - Más fácil de responder que preguntas abiertas cuando sea posible
- **YAGNI sin piedad** - Elimina funcionalidades innecesarias de todos los diseños
- **Explora alternativas** - Siempre propón 2-3 enfoques antes de decidir
- **Validación incremental** - Presenta el diseño en secciones, valida cada una
- **Sé flexible** - Regresa y clarifica cuando algo no tenga sentido

---

## Créditos

> 🚀 **Compilado y Traducido por [100x](https://www.100x.mx)** — Agentes de IA para empresas que quieren crecer 100x.
>
> 📚 Más skills y tutoriales en [github.com/agentes100x/agentes-100x](https://github.com/agentes100x/agentes-100x)
>
> 💼 ¿Quieres que implementemos agentes en tu empresa? [Contáctanos](https://www.100x.mx/empresas)
