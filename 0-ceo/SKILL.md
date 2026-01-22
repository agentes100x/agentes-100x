---
name: ceo-orchestrator
description: "Skill orquestador de nivel superior. Se invoca en proyectos nuevos, tareas multi-skill, o con el comando /ceo. Dirige el trabajo a los líderes de división y supervisa entregas entre divisiones."
---

# Orquestador CEO

## Cuándo Invocar

Este skill se activa cuando:
- El usuario usa explícitamente el comando `/ceo`
- La tarea requiere skills de **múltiples divisiones**
- Se está creando un **nuevo asset** (página, campaña, componente, skill)
- El trabajo afecta **múltiples productos**

**Omitir para:** Ediciones de un solo archivo, corrección de typos, cambios rápidos a un componente.

## Divisiones

| División | Líder | Enfoque |
|----------|-------|---------|
| **0-ceo** | (este) | Estrategia, orquestación, creación de skills |
| **1-crecimiento** | `1-crecimiento/SKILL.md` | Adquisición y retención de clientes |
| **2-producto** | `2-producto/SKILL.md` | Ingeniería, construcción de valor |
| **3-operaciones** | `3-operaciones/SKILL.md` | Finanzas, RRHH, legal, estrategia |

## Flujo de Trabajo

### 1. Evaluar la Solicitud
- Identificar qué divisiones son relevantes
- Determinar complejidad (división única vs. multi-división)
- Elegir enfoque de coordinación:
  - **Secuencial:** Una división completa antes de que la siguiente comience
  - **Paralelo:** Múltiples divisiones trabajan simultáneamente
  - **Primario + Consultor:** Una lidera, otras proporcionan guía

### 2. Crear Brief para Líder de División
Antes de hacer handoff, preparar:
- **Contexto:** ¿Qué problema estamos resolviendo?
- **Restricciones:** Presupuesto, timeline, limitaciones técnicas
- **Criterios de éxito:** ¿Cómo sabemos que está listo?

### 3. Dirigir al Líder de División
Cargar el skill de división apropiado:
- Trabajo de Growth → Cargar `1-crecimiento/SKILL.md`
- Trabajo de Product → Cargar `2-producto/SKILL.md`
- Trabajo de Operations → Cargar `3-operaciones/SKILL.md`

El líder de división entonces dirige a skills específicos.

### 4. Supervisión Post-Completación

Después de que cualquier división complete trabajo, aplicar estas heurísticas:

**Producto → Crecimiento**
- Cambios que afectan al cliente → Crecimiento revisa alineación de marca

**Crecimiento → Producto**
- Assets que necesitan deployment → Producto maneja hosting

**Cualquiera → Operaciones**
- Nuevos procesos o integraciones → Operaciones documenta

## Skills del CEO

Estos skills se usan directamente, no vía líderes de división:
- `0.1-lluvia-de-ideas` - Explorar ideas antes de implementar
- `0.2-planificacion` - Crear planes de implementación
- `0.3-creacion-de-skills` - Construir nuevos skills

---

## Créditos

> 🚀 **Compilado y Traducido por [100x](https://www.100x.mx)** — Agentes de IA para empresas que quieren crecer 100x.
>
> 📚 Más skills y tutoriales en [github.com/agentes100x/agentes-100x](https://github.com/agentes100x/agentes-100x)
>
> 💼 ¿Quieres que implementemos agentes en tu empresa? [Contáctanos](https://www.100x.mx/empresas)
