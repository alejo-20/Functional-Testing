# Pruebas Automatizadas con Playwright - TechShop

Este documento explica cómo ejecutar y mantener las pruebas automatizadas de la aplicación TechShop usando Playwright.

## 📋 Contenido

- **playwright.config.ts** - Configuración global de Playwright
- **tests/auth.spec.ts** - Pruebas de autenticación (login, logout)
- **tests/navigation.spec.ts** - Pruebas de navegación entre páginas
- **tests/utils.ts** - Funciones utilitarias reutilizables

## 🚀 Instalación

Playwright ya está instalado en el proyecto. Si necesitas reinstalarlo:

```bash
npm install -D @playwright/test
```

## 🎯 Scripts Disponibles

Todos los scripts se ejecutan desde la raíz del proyecto:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en navegador (UI interactivo)
npm run test:ui

# Ejecutar pruebas en modo debug (con Dev Tools)
npm run test:debug

# Ejecutar pruebas en navegador visible (no headless)
npm run test:headed

# Ejecutar pruebas solo en Chromium
npm run test:chromium

# Ejecutar pruebas solo en Firefox
npm run test:firefox

# Ejecutar pruebas solo en WebKit (Safari)
npm run test:webkit

# Ver el reporte HTML de la última ejecución
npm run test:report
```

## 🧪 Pruebas Disponibles

### 1. Autenticación (auth.spec.ts)

#### Pruebas de Login

- **Login exitoso**: Verifica que se puede iniciar sesión con credenciales válidas y redirige a home
- **Login fallido**: Verifica que muestra error con credenciales incorrectas
- **Email vacío**: Verifica validación de email requerido
- **Contraseña vacía**: Verifica validación de contraseña requerida
- **Contraseña corta**: Verifica que la contraseña debe tener mínimo 6 caracteres
- **Acceso a ruta protegida sin auth**: Verifica que redirige a login

#### Pruebas de Logout

- **Logout exitoso**: Verifica que se puede cerrar sesión y redirige a login

### 2. Navegación (navigation.spec.ts)

- **Navegación por logo**: Verificar que el logo lleva a home desde cualquier página
- **Enlace Shop**: Verificar que Shop lleva a /
- **Enlace Carrito**: Verificar que el carrito lleva a /cart
- **Enlace Dashboard**: Verificar que el dashboard lleva a /dashboard
- **Shop visible**: Verificar que Shop está visible en todas las páginas
- **Ruta no encontrada**: Verificar que redirige a home
- **Navegación secuencial**: Verificar múltiples navegaciones sin problemas
- **Contador del carrito**: Verificar que el carrito muestra items

## 👤 Credenciales de Prueba

Las siguientes credenciales están disponibles en la aplicación para pruebas:

```typescript
// Usuario 1
Email: test@example.com
Password: password123

// Usuario 2
Email: demo@example.com
Password: demo123
```

Estas credenciales se encuentran en `src/context/AuthContext.tsx` en el array `MOCK_USERS`.

## 📁 Estructura de Archivos

```
tests/
├── auth.spec.ts              # Pruebas de autenticación
├── navigation.spec.ts         # Pruebas de navegación
├── utils.ts                   # Funciones utilitarias
└── playwright.config.ts       # (en raíz) Configuración de Playwright
```

## 🛠️ Usando Funciones Utilitarias

El archivo `tests/utils.ts` contiene funciones reutilizables que simplificanel código de pruebas:

```typescript
import { login, logout, TEST_USERS, verifyUserIsAuthenticated } from './utils';

test('Ejemplo de prueba', async ({ page }) => {
  // Login usando utilidad
  await login(page, TEST_USERS.validUser);
  
  // Verificar que está autenticado
  await verifyUserIsAuthenticated(page);
  
  // Logout usando utilidad
  await logout(page);
});
```

### Funciones Disponibles en utils.ts

- `login(page, credentials)` - Hacer login
- `logout(page)` - Hacer logout
- `verifyUserIsAuthenticated(page)` - Verificar autenticación
- `verifyUserIsNotAuthenticated(page)` - Verificar que NO está autenticado
- `navigateTo(page, url, timeout)` - Navegar a una URL
- `clickNavbarLink(page, testId, expectedUrl)` - Hacer clic en enlace del navbar
- `verifyLoginError(page, errorMessage)` - Verificar error de login
- `loginAndLogout(page, credentials)` - Ciclo completo de autenticación
- `waitForElement(page, testId, timeout)` - Esperar elemento visible
- `getElementText(page, testId)` - Obtener texto de elemento

## 🎨 Selectores Utilizados

Las pruebas utilizan selectores claros basados en `data-testid`:

```typescript
// Elementos de login
page.getByTestId('login-title')      // Título de login
page.getByTestId('email-input')      // Input de email
page.getByTestId('login-form')       // Formulario de login
page.getByTestId('login-error')      // Mensaje de error

// Elementos del navbar
page.getByTestId('navbar')           // Navbar completo
page.getByTestId('logo-link')        // Logo/Inicio
page.getByTestId('home-link')        // Enlace a Shop
page.getByTestId('cart-link')        // Enlace al carrito
page.getByTestId('dashboard-link')   // Enlace al dashboard
page.getByTestId('logout-button')    // Botón de logout
page.getByTestId('cart-count')       // Contador del carrito

// Elementos de página
page.getByTestId('page-title')       // Título de la página
page.getByTestId('search-input')     // Input de búsqueda
```

## 🔍 Modo Debug

Para debugar una prueba específica:

```bash
# Ejecutar una prueba en modo debug
npx playwright test --debug

# Ejecutar solo un archivo de pruebas
npx playwright test tests/auth.spec.ts

# Ejecutar solo una prueba
npx playwright test -g "Debe permitir login con credenciales válidas"
```

## 📊 Reportes

Los reportes se guardan automáticamente en `playwright-report/`. Para verlos:

```bash
npm run test:report
```

Esto abrirá una interfaz HTML donde puedes ver:
- Resultado de cada prueba
- Capturas de pantalla (solo si fallan)
- Videos (solo si fallan)
- Trazas de ejecución

## ✅ Mejores Prácticas Implementadas

1. **Esperas adecuadas** - Usar `waitForURL()`, `expect()` en lugar de esperas fijas
2. **Selectores claros** - Utilizar `data-testid` siempre que sea posible
3. **Funciones reutilizables** - El archivo `utils.ts` contiene funciones comunes
4. **Organización** - Pruebas agrupadas por funcionalidad (`describe`)
5. **Comentarios** - Cada prueba tiene comentarios explicativos
6. **beforeEach** - Setup automático para pruebas que lo requieren
7. **Manejo de errores** - Verificaciones claras de estado esperado

## 🐛 Solución de Problemas

### Las pruebas no encuentran la app

Asegúrate de que la aplicación está corriendo:
```bash
npm run dev
```

La configuración de Playwright inicia automáticamente el servidor, pero puedes hacerlo manualmente.

### Tests fallan en CI/CD

Asegúrate de que el puerto 5173 está disponible. Si usas Docker, expón el puerto correctamente.

### Timeout en pruebas

Aumenta el timeout en `playwright.config.ts`:
```typescript
timeout: 60000, // 60 segundos
```

### No se capturan pantallas/videos

Asegúrate de que la configuración en `playwright.config.ts` tiene:
```typescript
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

## 📚 Recursos Adicionales

- [Documentación oficial de Playwright](https://playwright.dev)
- [Mejores prácticas de testing](https://playwright.dev/docs/best-practices)
- [Debugging de tests](https://playwright.dev/docs/debug)

## 🤝 Agregar Nuevas Pruebas

Para agregar nuevas pruebas:

1. Crea un archivo `tests/nombre.spec.ts`
2. Usa el patrón de pruebas existentes
3. Aprovecha las funciones de `utils.ts`
4. Ejecuta con `npm test`

Ejemplo de nueva prueba:

```typescript
import { test, expect } from '@playwright/test';
import { login, TEST_USERS } from './utils';

test.describe('Nueva funcionalidad', () => {
  test('Descripción de la prueba', async ({ page }) => {
    await login(page, TEST_USERS.validUser);
    
    // Tu código de prueba aquí
    
    await expect(page).toHaveURL('/ruta-esperada');
  });
});
```

## 📝 Notas

- Las pruebas usan el servidor de desarrollo (Vite) en `http://localhost:5173`
- Las credenciales son datos mock, no uso datos reales
- Las pruebas son independientes entre sí (test.beforeEach() resetea el estado)
- El carrito se reinicia cada vez (se borra del localStorage)

---

**Última actualización:** Marzo 2026
