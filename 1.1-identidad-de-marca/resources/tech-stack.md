# Stack Tecnológico Preferido

Cuando generes código o componentes UI, sigue estas elecciones tecnológicas por defecto (a menos que el usuario especifique otras).

## Stack Core
* **Framework:** React (Preferible TypeScript)
* **Estilos:** Tailwind CSS (Obligatorio para nuevos proyectos a menos que se indique lo contrario)
* **Componentes:** shadcn/ui (Recomendado como base)
* **Iconos:** Lucide React

## Guías de Implementación

### 1. Uso de Tailwind
* Usa clases de utilidad directamente en JSX.
* Utiliza los tokens de color definidos en `design-tokens.json` (ej. `bg-primary` en lugar de hex codes).
* **Modo Oscuro:** Soporta modo oscuro usando el modificador `dark:` de Tailwind.

### 2. Patrones de Componentes
* **Botones:** Acciones primarias deben usar el color Primary.
* **Layout:** Usa Flexbox y CSS Grid vía utilidades de Tailwind.

### 3. Patrones Prohibidos
* NO uses jQuery.
* NO crees archivos CSS nuevos si puedes usar Tailwind.
