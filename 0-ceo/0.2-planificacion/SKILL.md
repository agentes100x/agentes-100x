---
name: planning
description: Úsalo cuando tengas especificaciones o requisitos para una tarea de múltiples pasos, antes de tocar código
---

# Escribiendo Planes

## Resumen

Escribe planes de implementación completos asumiendo que el ingeniero no tiene contexto sobre nuestro código base y tiene gusto cuestionable. Documenta todo lo que necesita saber: qué archivos tocar para cada tarea, código, testing, documentación que podría necesitar revisar, cómo probarlo. Dale el plan completo como tareas pequeñas. DRY. YAGNI. TDD. Commits frecuentes.

Asume que es un desarrollador habilidoso, pero no sabe casi nada sobre nuestras herramientas o dominio del problema. Asume que no conoce bien el buen diseño de tests.

**Anuncia al inicio:** "Estoy usando el skill de planning para crear el plan de implementación."

**Contexto:** Esto debería ejecutarse en un worktree dedicado (creado por el skill de brainstorming).

**Guarda planes en:** `docs/plans/YYYY-MM-DD-<nombre-feature>.md`

## Granularidad de Tareas Pequeñas

**Cada paso es una acción (2-5 minutos):**
- "Escribir el test que falla" - paso
- "Ejecutarlo para asegurar que falle" - paso
- "Implementar el código mínimo para que pase el test" - paso
- "Ejecutar los tests y asegurar que pasen" - paso
- "Commit" - paso

## Encabezado del Documento del Plan

**Cada plan DEBE comenzar con este encabezado:**

```markdown
# Plan de Implementación: [Nombre del Feature]

> **Para el Agente:** SUB-SKILL REQUERIDO: Usa executing-plans para implementar este plan tarea por tarea.

**Objetivo:** [Una oración describiendo qué construye esto]

**Arquitectura:** [2-3 oraciones sobre el enfoque]

**Stack Tecnológico:** [Tecnologías/librerías clave]

---
```

## Estructura de Tarea

```markdown
### Tarea N: [Nombre del Componente]

**Archivos:**
- Crear: `ruta/exacta/al/archivo.py`
- Modificar: `ruta/exacta/al/existente.py:123-145`
- Test: `tests/ruta/exacta/al/test.py`

**Paso 1: Escribir el test que falla**

```python
def test_comportamiento_especifico():
    resultado = funcion(entrada)
    assert resultado == esperado
```

**Paso 2: Ejecutar test para verificar que falle**

Ejecutar: `pytest tests/ruta/test.py::nombre_test -v`
Esperado: FALLA con "función no definida"

**Paso 3: Escribir implementación mínima**

```python
def funcion(entrada):
    return esperado
```

**Paso 4: Ejecutar test para verificar que pase**

Ejecutar: `pytest tests/ruta/test.py::nombre_test -v`
Esperado: PASA

**Paso 5: Commit**

```bash
git add tests/ruta/test.py src/ruta/archivo.py
git commit -m "feat: agregar función específica"
```
```

## Recuerda
- Rutas de archivos exactas siempre
- Código completo en el plan (no "agregar validación")
- Comandos exactos con salida esperada
- Referencia skills relevantes con sintaxis @
- DRY, YAGNI, TDD, commits frecuentes

## Entrega de Ejecución

Después de guardar el plan, ofrece opciones de ejecución:

**"Plan completo y guardado en `docs/plans/<archivo>.md`. Dos opciones de ejecución:**

**1. Subagent-Driven (esta sesión)** - Lanzo un subagente fresco por tarea, reviso entre tareas, iteración rápida

**2. Sesión Paralela (separada)** - Abre nueva sesión con executing-plans, ejecución por lotes con checkpoints

**¿Qué enfoque prefieres?"**

**Si elige Subagent-Driven:**
- **SUB-SKILL REQUERIDO:** Usa subagent-driven-development
- Quédate en esta sesión
- Subagente fresco por tarea + revisión de código

**Si elige Sesión Paralela:**
- Guíalo a abrir nueva sesión en worktree
- **SUB-SKILL REQUERIDO:** Nueva sesión usa executing-plans

---

## Créditos

> 🚀 **Creado por [100x](https://www.100x.mx)** — Agentes de IA para empresas que quieren crecer 100x.
>
> 📚 Más skills y tutoriales en [github.com/agentes100x/agentes-100x](https://github.com/agentes100x/agentes-100x)
>
> 💼 ¿Quieres que implementemos agentes en tu empresa? [Contáctanos](https://www.100x.mx/empresas)
