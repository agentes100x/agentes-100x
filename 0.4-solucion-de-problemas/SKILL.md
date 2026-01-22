---
name: troubleshooting
description: Patrones maestros de manejo de errores en múltiples lenguajes incluyendo excepciones, tipos Result, propagación de errores y degradación elegante para construir aplicaciones resilientes. Usar cuando se implementa manejo de errores, se diseñan APIs o se mejora la confiabilidad de aplicaciones.
---

# Patrones de Manejo de Errores

Construye aplicaciones resilientes con estrategias robustas de manejo de errores que manejan fallos elegantemente y proporcionan excelentes experiencias de debugging.

## Cuándo Usar Este Skill
- Implementando manejo de errores en nuevas funcionalidades
- Diseñando APIs resilientes a errores
- Debuggeando issues de producción
- Mejorando la confiabilidad de aplicaciones
- Creando mejores mensajes de error para usuarios y desarrolladores
- Implementando patrones de retry y circuit breaker
- Manejando errores async/concurrentes
- Construyendo sistemas distribuidos tolerantes a fallos

## Conceptos Fundamentales

### 1. Filosofías de Manejo de Errores

**Excepciones vs Tipos Result:**
- **Excepciones**: Try-catch tradicional, interrumpe flujo de control
- **Tipos Result**: Éxito/fallo explícito, enfoque funcional
- **Códigos de Error**: Estilo C, requiere disciplina
- **Tipos Option/Maybe**: Para valores nullable

**Cuándo Usar Cada Uno:**
- **Excepciones**: Errores inesperados, condiciones excepcionales
- **Tipos Result**: Errores esperados, fallos de validación
- **Panics/Crashes**: Errores irrecuperables, bugs de programación

### 2. Categorías de Errores

**Errores Recuperables:**
- Timeouts de red
- Archivos faltantes
- Input de usuario inválido
- Límites de rate de API

**Errores Irrecuperables:**
- Sin memoria
- Stack overflow
- Bugs de programación (null pointer, etc.)

## Patrones por Lenguaje

### Python - Manejo de Errores

**Jerarquía de Excepciones Personalizadas:**
```python
class ApplicationError(Exception):
    """Excepción base para todos los errores de aplicación."""
    def __init__(self, message: str, code: str = None, details: dict = None):
        super().__init__(message)
        self.code = code
        self.details = details or {}
        self.timestamp = datetime.utcnow()

class ValidationError(ApplicationError):
    """Se lanza cuando falla la validación."""
    pass

class NotFoundError(ApplicationError):
    """Se lanza cuando el recurso no se encuentra."""
    pass
```

**Retry con Backoff Exponencial:**
```python
def retry(max_attempts: int = 3, backoff_factor: float = 2.0, exceptions: tuple = (Exception,)):
    """Decorador retry con backoff exponencial."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        sleep_time = backoff_factor ** attempt
                        time.sleep(sleep_time)
                        continue
                    raise
            raise last_exception
        return wrapper
    return decorator
```

### TypeScript/JavaScript - Manejo de Errores

**Clases de Error Personalizadas:**
```typescript
class ApplicationError extends Error {
    constructor(
        message: string,
        public code: string,
        public statusCode: number = 500,
        public details?: Record<string, any>
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends ApplicationError {
    constructor(message: string, details?: Record<string, any>) {
        super(message, 'VALIDATION_ERROR', 400, details);
    }
}
```

**Patrón de Tipo Result:**
```typescript
type Result<T, E = Error> =
    | { ok: true; value: T }
    | { ok: false; error: E };

function Ok<T>(value: T): Result<T, never> {
    return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
    return { ok: false, error };
}
```

## Patrones Universales

### Patrón 1: Circuit Breaker
Previene fallos en cascada en sistemas distribuidos.

```python
class CircuitState(Enum):
    CLOSED = "closed"       # Operación normal
    OPEN = "open"          # Fallando, rechaza requests
    HALF_OPEN = "half_open"  # Probando si se recuperó

class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5, timeout: timedelta = timedelta(seconds=60)):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.state = CircuitState.CLOSED
        
    def call(self, func):
        if self.state == CircuitState.OPEN:
            if datetime.now() - self.last_failure_time > self.timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker está OPEN")
        # ... implementación completa
```

### Patrón 2: Agregación de Errores
Recolecta múltiples errores en lugar de fallar en el primero.

### Patrón 3: Degradación Elegante
Proporciona funcionalidad de fallback cuando ocurren errores.

```python
def with_fallback(primary, fallback, log_error=True):
    """Intenta función primaria, hace fallback en error."""
    try:
        return primary()
    except Exception as e:
        if log_error:
            logger.error(f"Función primaria falló: {e}")
        return fallback()
```

## Mejores Prácticas
- **Falla Rápido**: Valida input temprano, falla rápido
- **Preserva Contexto**: Incluye stack traces, metadata, timestamps
- **Mensajes Significativos**: Explica qué pasó y cómo arreglarlo
- **Loggea Apropiadamente**: Error = log, fallo esperado = no spamear logs
- **Maneja al Nivel Correcto**: Captura donde puedas manejar significativamente
- **Limpia Recursos**: Usa try-finally, context managers, defer
- **No Tragues Errores**: Loggea o re-lanza, no ignores silenciosamente

## Errores Comunes a Evitar
- **Capturar Demasiado Amplio**: `except Exception` oculta bugs
- **Bloques Catch Vacíos**: Tragarse errores silenciosamente
- **Loggear y Re-lanzar**: Crea entradas de log duplicadas
- **No Limpiar**: Olvidar cerrar archivos, conexiones
- **Mensajes Pobres**: "Ocurrió error" no es útil

---

## Créditos

> 🚀 **Compilado y Traducido por [100x](https://www.100x.mx)** — Agentes de IA para empresas que quieren crecer 100x.
>
> 📚 Más skills y tutoriales en [github.com/agentes100x/agentes-100x](https://github.com/agentes100x/agentes-100x)
>
> 💼 ¿Quieres que implementemos agentes en tu empresa? [Contáctanos](https://www.100x.mx/empresas)
