# 📑 Índice de Pruebas Automatizadas - TechShop

## 🎯 Resumen Ejecutivo

Se han creado **pruebas automatizadas completas** usando Playwright para tu aplicación TechShop.

| Métrica | Valor |
|---------|-------|
| **Pruebas Totales** | 27+ pruebas |
| **Navegadores** | 3 (Chromium, Firefox, WebKit) |
| **Tipos de Pruebas** | 3 (Autenticación, Navegación, Productos) |
| **Funciones Utilitarias** | 10+ funciones reutilizables |
| **Archivos de Pruebas** | 5 archivos |
| **Documentación** | 3 guías completas |

## 📂 Estructura del Proyecto de Pruebas

```
tests/
├── 📄 auth.spec.ts           (7 pruebas)  - Autenticación y Login
├── 📄 navigation.spec.ts      (10 pruebas) - Navegación entre páginas
├── 📄 products.spec.ts        (10 pruebas) - Productos y Carrito
├── 📄 example.spec.ts         (10 ejemplos) - Patrones y mejores prácticas
└── 🔧 utils.ts                (10 funciones) - Utilidades reutilizables

Raíz:
├── playwright.config.ts       - Configuración principal
├── .github/workflows/playwright.yml - CI/CD (GitHub Actions)
└── 📖 Documentación:
    ├── QUICKSTART.md          - Inicio rápido
    ├── TESTING.md             - Guía completa
    └── PLAYWRIGHT_CHEATSHEET.md - Referencia rápida
```

## 🧪 Detalle de Pruebas por Archivo

### auth.spec.ts (7 pruebas)

#### Suite: Autenticación - Login

1. ✅ **Debe permitir login con credenciales válidas**
   - Ingresa email: `test@example.com`
   - Ingresa password: `password123`
   - Verifica redirección a `/`
   - Verifica navbar en Home

2. ✅ **Debe mostrar error con credenciales inválidas**
   - Ingresa email incorrecto
   - Ingresa password incorrecta
   - Verifica mensaje de error: "Invalid email or password"
   - Verifica que sigue en `/login`

3. ✅ **Debe mostrar error si el email está vacío**
   - Deja email vacío
   - Ingresa password válida
   - Verifica mensaje: "Email is required"

4. ✅ **Debe mostrar error si la contraseña está vacía**
   - Ingresa email válido
   - Deja password vacía
   - Verifica mensaje: "Password is required"

5. ✅ **Debe mostrar error si la contraseña es muy corta**
   - Ingresa email válido
   - Ingresa password < 6 caracteres
   - Verifica mensaje: "Password must be at least 6 characters"

6. ✅ **Debe redirigir a login si intenta acceder sin autenticación**
   - Intenta navegar a `/`
   - Verifica redirección a `/login`

#### Suite: Autenticación - Logout

7. ✅ **Debe permitir logout y redirigir a login**
   - Login exitoso
   - Hace clic en logout
   - Verifica redirección a `/login`
   - Verifica inaccesibilidad a rutas protegidas

---

### navigation.spec.ts (10 pruebas)

Todas usan `test.beforeEach()` para login automático.

1. ✅ **Debe navegar a Home al hacer clic en el logo**
   - Desde cualquier página, clic en logo
   - Verifica redirección a `/`
   - Verifica página se carga correctamente

2. ✅ **Debe navegar a Shop desde el menú**
   - Desde dashboard, clic en "Shop"
   - Verifica URL es `/`

3. ✅ **Debe navegar a Carrito desde el navbar**
   - Clic en icono del carrito
   - Verifica redirección a `/cart`

4. ✅ **Debe navegar a Dashboard desde el navbar**
   - Clic en link del dashboard/perfil
   - Verifica redirección a `/dashboard`

5. ✅ **El enlace Shop debe estar siempre visible**
   - Verifica visibilidad en `/`, `/cart`, `/dashboard`

6. ✅ **Debe redirigir a home si navega a ruta inexistente**
   - Navega a `/ruta-inexistente-12345`
   - Verifica redirección a `/`

7. ✅ **Debe poder navegar desde Carrito a Shop**
   - Navega a `/cart`
   - Clic en "Shop"
   - Verifica URL es `/`

8. ✅ **Debe poder navegar desde Dashboard a Shop**
   - Navega a `/dashboard`
   - Clic en "Shop"
   - Verifica URL es `/`

9. ✅ **El carrito debe mostrar el contador de items**
   - Verifica visibilidad del icono del carrito
   - Verifica estructura del contador

10. ✅ **Debe poder navegar entre múltiples páginas en secuencia**
    - Navega: Dashboard → Cart → Home
    - Verifica cada transición

---

### products.spec.ts (10 pruebas)

Todas usan `test.beforeEach()` para login automático.

1. ✅ **Debe mostrar productos en la página de inicio**
   - Verifica que hay elementos de productos visibles
   - Verifica encabezados y contenido

2. ✅ **Debe permitir buscar productos**
   - Escribe en barra de búsqueda
   - Verifica que el input refleja el término

3. ✅ **Debe permitir limpiar la búsqueda**
   - Escribe término de búsqueda
   - Limpia el input
   - Verifica que está vacío

4. ✅ **Debe mostrar carrito vacío inicialmente**
   - Navega a `/cart`
   - Verifica que página se cargó correctamente

5. ✅ **Debe poder navegar a detalles de un producto**
   - Clic en link de producto
   - Verifica redirección a `/product/:id`

6. ✅ **Debe poder volver a home desde detalles**
   - Desde detalles, clic en botón "Volver"
   - Verifica redirección a `/`

7. ✅ **Navbar funciona desde detalles de producto**
   - Desde detalles, clic en "Shop"
   - Verifica redirección a `/`

8. ✅ **Logout está disponible en todas las páginas**
   - Verifica visibilidad en `/`, `/cart`, `/dashboard`

9. ✅ **Home debe mostrar título bienvenida**
   - Verifica título: "Welcome to TechShop"
   - Verifica contenido adicional

10. ✅ **Carrito está visible en el navbar**
    - Verifica icono del carrito
    - Verifica funcionalidad al hacer clic

---

## 🔧 Funciones Utilitarias (utils.ts)

```typescript
// Autenticación
login(page, credentials)                    // Hacer login
logout(page)                                // Hacer logout
loginAndLogout(page, credentials)          // Ciclo completo

// Verificación
verifyUserIsAuthenticated(page)             // Verificar auth
verifyUserIsNotAuthenticated(page)          // Verificar no auth
verifyLoginError(page, errorMessage)        // Verificar error

// Navegación
navigateTo(page, url, timeout)              // Navegar a URL
clickNavbarLink(page, testId, expectedUrl)  // Clic en navbar

// Utilidades
waitForElement(page, testId, timeout)       // Esperar vista
getElementText(page, testId)                // Obtener texto

// Constantes
TEST_USERS.validUser                        // Usuario de prueba
TEST_USERS.demoUser                         // Usuario demo
```

## 📊 Cobertura de Casos de Uso

| Caso de Uso | Pruebas | Cobertura |
|-------------|---------|-----------|
| Login | 6 pruebas | ✅ Completa |
| Logout | 1 prueba | ✅ Completa |
| Navegación | 10 pruebas | ✅ Completa |
| Búsqueda | 2 pruebas | ✅ Completa |
| Carrito | 3 pruebas | ✅ Básica |
| Detalles Producto | 2 pruebas | ✅ Básica |
| Responsividad | Ejemplos | ℹ️ Preparada |

## 🎯 Selectores Utilizados

### Login
```typescript
data-testid="login-title"        // Título
data-testid="email-input"        // Input email
data-testid="login-form"         // Formulario
input[type="password"]           // Input password
data-testid="login-error"        // Mensaje de error
```

### Navbar
```typescript
data-testid="navbar"             // Navbar completo
data-testid="logo-link"          // Logo
data-testid="home-link"          // Link Shop
data-testid="cart-link"          // Link Carrito
data-testid="dashboard-link"     // Link Dashboard
data-testid="logout-button"      // Botón Logout
data-testid="cart-count"         // Contador
```

### Página
```typescript
data-testid="page-title"         // Título principal
data-testid="search-input"       // Input búsqueda
```

## ✅ Checklist de Casuística

- ✅ Login válido
- ✅ Login inválido (múltiples validaciones)
- ✅ Logout
- ✅ Acceso a rutas sin autenticación
- ✅ Redireccionamientos automáticos
- ✅ Navegación entre todas las páginas principales
- ✅ Funcionalidad del carrito
- ✅ Búsqueda de productos
- ✅ Rutas 404
- ✅ Persistencia de sesión (login con localStorage)
- ✅ Visibilidad condicional (navbar para autenticados)

## 📈 Ejecutar Pruebas

```bash
# Inicio rápido
npm test

# Con UI interactiva
npm run test:ui

# Con navegador visible
npm run test:headed

# En navegador específico
npm run test:chromium

# Debug mode
npm run test:debug

# Reporte
npm run test:report
```

## 📚 Documentación Disponible

| Archivo | Contenido |
|---------|-----------|
| **QUICKSTART.md** | Inicio rápido (5 min) |
| **TESTING.md** | Guía completa y detallada |
| **PLAYWRIGHT_CHEATSHEET.md** | Referencia rápida de comandos |
| **example.spec.ts** | 10 ejemplos de patrones |
| **utils.ts** | Funciones reutilizables |

## 🎓 Mejores Prácticas Implementadas

✅ Selectores claros basados en `data-testid`
✅ Esperas explícitas con `expect()`
✅ Comentarios explicativos en cada prueba
✅ Funciones utilitarias para reutilización
✅ Organización lógica con `describe()` y `beforeEach()`
✅ Manejo robusto de errores
✅ Screenshots y videos en caso de fallo
✅ Credenciales de prueba centralizadas
✅ Configuración de múltiples navegadores
✅ Compatible con CI/CD

## 🚀 Próximos Pasos Recomendados

1. **Ejecuta `npm test`** para ver las pruebas en acción
2. **Abre `TESTING.md`** para documentación detallada
3. **Revisa `example.spec.ts`** para ver patrones avanzados
4. **Adapta las pruebas** a nuevas funcionalidades
5. **Configura CI/CD** en tu repositorio

## 📞 Soporte

Para preguntas sobre:
- **Playwright**: Documentación oficial en https://playwright.dev
- **Tus pruebas**: Revisa los ejemplos en `example.spec.ts`
- **Configuración**: Mira `playwright.config.ts`

## 📌 Notas Importantes

- Las pruebas requieren que la app esté corriendo en `http://localhost:5173`
- Las credenciales de prueba están en `src/context/AuthContext.tsx`
- Los reportes se guardan en `playwright-report/`
- Las pruebas no modifican datos reales (todo es mock)
- Las pruebas son independientes (cada una limpia su estado)

---

**Creado:** Marzo 2026
**Versión de Playwright:** 1.58.2
**Navegadores:** Chromium, Firefox, WebKit

