import { test, expect } from '@playwright/test';
import { login, TEST_USERS, clickNavbarLink, loginAndLogout } from './utils';

/**
 * Ejemplo de Suite de Pruebas Personalizada
 * 
 * Este archivo muestra cómo crear pruebas personalizadas para tu aplicación.
 * Puedes usar este como plantilla para crear nuevas suites de pruebas.
 * 
 * Para ejecutar solo estas pruebas:
 * npx playwright test tests/example.spec.ts
 */

// ============================================================================
// Ejemplo 1: Suite básica con pruebas simples
// ============================================================================

test.describe('Ejemplo - Pruebas Básicas', () => {
  
  test('Verificar título de la página', async ({ page }) => {
    // Navegar a la página
    await page.goto('/');
    
    // Verificar que tiene el título esperado
    await expect(page).toHaveTitle(/.*TechShop.*/i);
  });

  test('Verificar que la app está respondiendo', async ({ page }) => {
    // Ir a la página de login
    await page.goto('/login');
    
    // Verificar que la página está disponible
    const response = await page.goto('/login');
    expect(response?.status()).toBe(200);
  });
});

// ============================================================================
// Ejemplo 2: Usando utilidades (funciones reutilizables)
// ============================================================================

test.describe('Ejemplo - Usando Utilidades', () => {
  
  test('Login y logout usando utilidades', async ({ page }) => {
    // Usar función reutilizable para todo el ciclo
    await loginAndLogout(page, TEST_USERS.validUser);
  });

  test('Navegar entre páginas usando utilidades', async ({ page }) => {
    // Login
    await login(page, TEST_USERS.validUser);

    // Navegar usando el navbar
    await clickNavbarLink(page, 'dashboard-link', '/dashboard');
    await clickNavbarLink(page, 'cart-link', '/cart');
    await clickNavbarLink(page, 'home-link', '/');
  });
});

// ============================================================================
// Ejemplo 3: Pruebas con condicionales y flexibilidad
// ============================================================================

test.describe('Ejemplo - Pruebas Flexibles', () => {
  
  test('Encontrar elementos dinámicamente', async ({ page }) => {
    await login(page, TEST_USERS.validUser);
    
    // Encontrar botones por su contenido (texto)
    const loginButtons = await page.getByRole('button').count();
    console.log(`Hay ${loginButtons} botones en la página`);

    // Encontrar links por su texto
    const hasShopLink = await page.getByRole('link', { name: /shop/i }).isVisible().catch(() => false);
    expect(hasShopLink).toBeTruthy();
  });

  test('Capturar información de la página', async ({ page }) => {
    await login(page, TEST_USERS.validUser);

    // Obtener URL actual
    const currentUrl = page.url();
    console.log(`URL actual: ${currentUrl}`);

    // Obtener título de página
    const title = await page.title();
    console.log(`Título: ${title}`);

    // Obtener el HTML de un elemento
    const htmlContent = await page.getByTestId('page-title').innerHTML();
    console.log(`HTML del título: ${htmlContent}`);
  });
});

// ============================================================================
// Ejemplo 4: Pruebas con errores y manejo de excepciones
// ============================================================================

test.describe('Ejemplo - Manejo de Errores', () => {
  
  test('Manejar elementos que podría no existir', async ({ page }) => {
    await page.goto('/');

    // Buscar un elemento que podría no estar
    const optionalElement = await page.locator('[class*="nonexistent"]').isVisible().catch(() => false);
    
    if (optionalElement) {
      console.log('Elemento encontrado');
    } else {
      console.log('Elemento no encontrado - esto es OK');
    }
  });

  test('Manejar timeouts gracefully', async ({ page }) => {
    // Login
    await login(page, TEST_USERS.validUser);

    // Intentar encontrar algo con timeout personalizado
    const element = await page.getByTestId('cart-count')
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (element) {
      console.log('Hay items en el carrito');
    } else {
      console.log('El carrito está vacío');
    }
  });
});

// ============================================================================
// Ejemplo 5: Pruebas con validaciones múltiples
// ============================================================================

test.describe('Ejemplo - Validaciones Múltiples', () => {
  
  test('Validar estructura de página completa', async ({ page }) => {
    await login(page, TEST_USERS.validUser);

    // Validar que todos los elementos principales están presentes
    const validations = {
      navbar: page.getByTestId('navbar'),
      homeLink: page.getByTestId('home-link'),
      cartLink: page.getByTestId('cart-link'),
      dashboardLink: page.getByTestId('dashboard-link'),
      logoutButton: page.getByTestId('logout-button'),
    };

    // Verificar que todos están visibles
    for (const [name, element] of Object.entries(validations)) {
      await expect(element).toBeVisible({ timeout: 3000 });
      console.log(`✓ ${name} está visible`);
    }
  });

  test('Validar atributos HTML', async ({ page }) => {
    // Ir a login
    await page.goto('/login');

    // Validar que los inputs tienen atributos esperados
    const emailInput = page.getByTestId('email-input');
    
    const type = await emailInput.getAttribute('type');
    expect(type).toBe('email');

    const placeholder = await emailInput.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });
});

// ============================================================================
// Ejemplo 6: Pruebas de interacción más complejas
// ============================================================================

test.describe('Ejemplo - Interacciones Complejas', () => {
  
  test('Relleno de formulario y envío', async ({ page }) => {
    await page.goto('/login');

    // Rellenar formulario con pasos claros
    const emailInput = page.getByTestId('email-input');
    const passwordInput = page.getByTestId('login-form').locator('input[type="password"]');
    const submitButton = page.getByRole('button', { name: /login|sign in/i });

    // Llenar campo a campo con pequeñas esperas
    await emailInput.fill('test@example.com');
    await page.waitForTimeout(100); // Pequeña espera

    await passwordInput.fill('password123');
    await page.waitForTimeout(100);

    // Enviar
    await submitButton.click();

    // Verificar resultado
    await page.waitForURL('/', { timeout: 5000 });
    await expect(page).toHaveURL('/');
  });

  test('Interactuar con múltiples elementos', async ({ page }) => {
    await login(page, TEST_USERS.validUser);

    // Navegar a diferentes páginas rápidamente
    const links = [
      { testId: 'home-link', expected: '/' },
      { testId: 'cart-link', expected: '/cart' },
      { testId: 'dashboard-link', expected: '/dashboard' },
    ];

    for (const { testId, expected } of links) {
      await page.getByTestId(testId).click();
      await page.waitForURL(expected, { timeout: 5000 });
      expect(page.url()).toContain(expected);
    }
  });
});

// ============================================================================
// Ejemplo 7: Pruebas con datos generados
// ============================================================================

test.describe('Ejemplo - Datos Dinámicos', () => {
  
  test('Usar múltiples usuarios de prueba', async ({ page }) => {
    const users = [TEST_USERS.validUser, TEST_USERS.demoUser];

    for (const user of users) {
      // Login
      await login(page, user);

      // Verificar que está logueado
      await expect(page).toHaveURL('/');

      // Logout
      await page.getByTestId('logout-button').click();
      await page.waitForURL('/login', { timeout: 5000 });
    }
  });

  test('Generar términos de búsqueda y probar', async ({ page }) => {
    await login(page, TEST_USERS.validUser);

    const searchTerms = ['laptop', 'phone', 'tablet', 'keyboard'];

    for (const term of searchTerms) {
      const searchInput = page.getByTestId('search-input');
      await searchInput.fill(term);
      await page.waitForTimeout(300); // Esperar a que React actualice

      // Verificar que se busca
      await expect(searchInput).toHaveValue(term);
    }
  });
});

// ============================================================================
// Ejemplo 8: Pruebas con snapshots (comparación visual)
// ============================================================================

test.describe('Ejemplo - Snapshots', () => {
  
  test('Comparar HTML de página', async ({ page }) => {
    await page.goto('/login');

    // Obtener HTML de un elemento
    const form = page.getByTestId('login-form');
    const html = await form.innerHTML();

    // Verificar que contiene ciertos elementos
    expect(html).toContain('email');
    expect(html).toContain('password');
  });
});

// ============================================================================
// Ejemplo 9: Pruebas con esperas personalizadas
// ============================================================================

test.describe('Ejemplo - Esperas Personalizadas', () => {
  
  test('Esperar a condiciones específicas', async ({ page }) => {
    await login(page, TEST_USERS.validUser);

    // Esperar a que un elemento tenga un texto específico
    await expect(page.getByTestId('page-title')).toContainText('Welcome');

    // Esperar a que la URL tenga un patrón
    await expect(page).toHaveURL(/\d*/, { timeout: 5000 });
  });

  test('Esperar a que un elemento desaparezca', async ({ page }) => {
    await page.goto('/login');

    // Un elemento podría desaparecer después de hacer login
    const loginForm = page.getByTestId('login-form');
    
    // El formulario está presente
    await expect(loginForm).toBeVisible();

    // Hacer login
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('login-form').locator('input[type="password"]').fill('password123');
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Esperar a que el formulario desaparezca
    await expect(loginForm).not.toBeVisible({ timeout: 5000 });
  });
});

// ============================================================================
// Ejemplo 10: Pruebas de responsividad (opcional)
// ============================================================================

test.describe('Ejemplo - Responsividad', () => {
  
  test('Verificar en vista móvil', async ({ page }) => {
    // Configurar viewport móvil
    await page.setViewportSize({ width: 375, height: 667 });

    // Navegar y probar
    await page.goto('/login');

    const emailInput = page.getByTestId('email-input');
    await expect(emailInput).toBeVisible();
  });

  test('Verificar en vista desktop', async ({ page }) => {
    // Configurar viewport desktop
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navegar y probar
    await page.goto('/login');

    const emailInput = page.getByTestId('email-input');
    await expect(emailInput).toBeVisible();
  });
});
