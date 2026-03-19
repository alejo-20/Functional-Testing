# 📋 Playwright - Referencia Rápida

## 🚀 Comandos Principales

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar en navegador visible (no headless)
npm run test:headed

# Ejecutar con UI interactivo
npm run test:ui

# Ejecutar en modo debug
npm run test:debug

# Ejecutar solo un archivo
npm test tests/auth.spec.ts

# Ejecutar solo una prueba por nombre
npm test -g "Debe permitir login"

# Ejecutar en navegadores específicos
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Ver reporte HTML
npm run test:report
```

## 🎯 Selectores en Playwright

```typescript
// Por testid (recomendado)
page.getByTestId('login-button')

// Por rol (accesibilidad)
page.getByRole('button', { name: 'Login' })

// Por placeholder
page.getByPlaceholder('Enter password')

// Por label
page.getByLabel('Email')

// Por texto
page.getByText('Welcome Back')

// Por localizador CSS
page.locator('.button-primary')

// Por localizador XPath
page.locator('//button[@id="submit"]')
```

## ⏱️ Esperas y Assertions

```typescript
// Esperar a que elemento sea visible
await expect(element).toBeVisible()

// Esperar a que sea clickeable
await expect(element).toBeEnabled()

// Esperar a URL
await expect(page).toHaveURL('/dashboard')

// Esperar a que contenga texto
await expect(element).toContainText('Welcome')

// Esperar timeout personalizado
await expect(element).toBeVisible({ timeout: 10000 })

// Esperar a que elemento desaparezca
await expect(element).not.toBeVisible()

// Esperar por cambio de URL
await page.waitForURL('/dashboard', { timeout: 5000 })

// Esperar por carga de red
await page.waitForLoadState('networkidle')
```

## 📝 Interacciones Comunes

```typescript
// Llenar input
await page.getByTestId('email-input').fill('user@example.com')

// Hacer clic
await page.getByRole('button', { name: 'Login' }).click()

// Presionar tecla
await page.getByTestId('password-input').press('Enter')

// Limpiar input
await page.getByTestId('search-input').clear()

// Escribir (más lento, simula tipeo)
await page.getByTestId('message').type('Hello')

// Navegar
await page.goto('/dashboard')

// Obtener valor de input
const value = await page.getByTestId('email-input').inputValue()

// Obtener texto
const text = await page.getByTestId('title').textContent()

// Obtener atributo
const href = await page.locator('a').getAttribute('href')
```

## 🔍 Búsqueda de Elementos

```typescript
// Obtener texto de elemento
const title = await page.getByTestId('page-title').textContent()

// Contar elementos
const count = await page.locator('button').count()

// Verificar si visible
const isVisible = await page.getByTestId('element').isVisible()

// Verificar si existe
const exists = await page.locator('.element').count() > 0

// Obtener primer elemento
const first = page.locator('button').first()

// Obtener último elemento  
const last = page.locator('button').last()

// Obtener por índice
const second = page.locator('button').nth(1)
```

## 🐛 Debug

```typescript
// Abrir developer tools
await page.pause()

// Mostrar elemento en la página
await element.highlight()

// Tomar screenshot
await page.screenshot({ path: 'screenshot.png' })

// Grabar video (se hace automático con video: 'on-failure')

// Mostrar traza (automático con trace: 'on-first-retry')

// Imprimir URL actual
console.log(page.url())

// Imprimir contenido HTML
const html = await page.content()
console.log(html)
```

## 📸 Screenshots y Videos

```typescript
// En configuración (playwright.config.ts)
screenshot: 'only-on-failure'  // Solo si falla
video: 'retain-on-failure'     // Video solo si falla

// Manual
await page.screenshot({ path: 'shot.png' })
```

##  🧪 Estructura de Prueba

```typescript
import { test, expect } from '@playwright/test';

test.describe('Grupo de pruebas', () => {
  
  // Ejecutar antes de cada prueba
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  // Test individual
  test('Descripción de la prueba', async ({ page }) => {
    // Arreglo
    await page.getByTestId('email').fill('test@example.com');
    
    // Acción
    await page.getByRole('button').click();
    
    // Verificación
    await expect(page).toHaveURL('/dashboard');
  });

  // Ejecutar después de cada prueba
  test.afterEach(async ({ page }) => {
    // Cleanup si es necesario
  });
});
```

## 🛡️ Errores Comunes

```typescript
// ❌ MALO - Timeout genérico
await page.waitForTimeout(5000);

// ✅ BIEN - Esperar elemento específico
await expect(element).toBeVisible({ timeout: 5000 });

// ❌ MALO - Sin manejo de error
const text = await element.textContent();

// ✅ BIEN - Con fallback
const text = await element.textContent() ?? '';

// ❌ MALO - Sin esperar carga
await page.goto('/page');
const text = await element.textContent();

// ✅ BIEN - Esperar carga completa
await page.goto('/page');
await page.waitForLoadState('networkidle');
const text = await element.textContent();
```

## 🎨 Personalizaciones Útiles

```typescript
// Viewport móvil
await page.setViewportSize({ width: 375, height: 667 });

// Viewport tablet
await page.setViewportSize({ width: 768, height: 1024 });

// Viewport desktop
await page.setViewportSize({ width: 1280, height: 720 });

// Emular navegador específico
const iPhone = devices['iPhone 12'];
// (configurar en playwright.config.ts)
```

##  📍 Localizadores vs Selectores

```typescript
// Localizador (recomendado) - más flexible y tipado
const button = page.getByRole('button', { name: 'Login' });
const button = page.getByTestId('login-btn');

// Selector directo - menos flexible
const button = page.locator('button.btn-primary');
const button = page.locator('xpath=//button[@id="login"]');
```

## 🔗 Referencia Rápida de Métodos

| Método | Uso |
|--------|-----|
| `page.goto(url)` | Navegar a URL |
| `page.waitForURL(url)` | Esperar cambio de URL |
| `page.reload()` | Recargar página |
| `page.goBack()` | Volver atrás |
| `page.goForward()` | Adelante |
| `page.title()` | Obtener título |
| `page.url()` | Obtener URL actual |
| `element.click()` | Hacer clic |
| `element.fill(text)` | Llenar input |
| `element.press(key)` | Presionar tecla |
| `element.isVisible()` | ¿Es visible? |
| `element.isEnabled()` | ¿Está habilitado? |
| `element.textContent()` | Obtener texto |
| `element.getAttribute(name)` | Obtener atributo |

## 🎓 Recursos

- [Documentación oficial](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging](https://playwright.dev/docs/debug)

