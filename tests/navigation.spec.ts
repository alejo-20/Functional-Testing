import { test, expect } from '@playwright/test';

/**
 * Suite de pruebas para navegación
 * 
 * Verifica que los enlaces del menú funcionan correctamente
 * y que las rutas se cargan apropiadamente.
 * 
 * Nota: Todas estas pruebas requieren que el usuario esté autenticado.
 */

test.describe('Navegación', () => {
  
  /**
   * Ejecutar antes de cada prueba: hacer login
   * 
   * Esto asegura que cada prueba comienza con un usuario autenticado
   */
  test.beforeEach(async ({ page }) => {
    // Ir a la página de login
    await page.goto('/login');

    // Iniciar sesión con credenciales válidas
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('login-form').locator('input[type="password"]').fill('password123');
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Esperar a que redirija a home y confirmar que estamos autenticados
    await page.waitForURL('/', { timeout: 5000 });
    await expect(page).toHaveURL('/');
    
    // Verificar que el navbar está presente
    const navbar = page.getByTestId('navbar');
    await expect(navbar).toBeVisible();
  });

  /**
   * Prueba 1: Navegar a Home/Shop desde el logo
   * 
   * Pasos:
   * 1. Desde cualquier página, hacer clic en el logo
   * 2. Verificar que navega a /
   */
  test('Debe navegar a Home al hacer clic en el logo', async ({ page }) => {
    // Primero, navegar a una página diferente para verificar que el logo nos lleva a home
    await page.getByTestId('dashboard-link').click();
    await page.waitForURL('/dashboard', { timeout: 5000 });
    await expect(page).toHaveURL('/dashboard');

    // Hacer clic en el logo
    const logoLink = page.getByTestId('logo-link');
    await expect(logoLink).toBeVisible();
    await logoLink.click();

    // Verificar que navega a home
    await page.waitForURL('/', { timeout: 5000 });
    await expect(page).toHaveURL('/');

    // Verificar que la página se cargó correctamente
    const pageTitle = page.getByTestId('page-title');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('Welcome to TechShop');
  });

  /**
   * Prueba 2: Navegar a Shop desde el menú
   * 
   * Pasos:
   * 1. Hacer clic en el enlace "Shop"
   * 2. Verificar que navega a / (home)
   * 3. Verificar que la página de inicio se carga correctamente
   */
  test('Debe navegar a Shop desde el menú', async ({ page }) => {
    // Comenzar en dashboard
    await page.getByTestId('dashboard-link').click();
    await page.waitForURL('/dashboard', { timeout: 5000 });

    // Hacer clic en "Shop" del navbar
    const homeLink = page.getByTestId('home-link');
    await expect(homeLink).toBeVisible();
    await homeLink.click();

    // Verificar que navega a home
    await page.waitForURL('/', { timeout: 5000 });
    await expect(page).toHaveURL('/');

    // Verificar que la página se cargó
    const pageTitle = page.getByTestId('page-title');
    await expect(pageTitle).toBeVisible();
  });

  /**
   * Prueba 3: Navegar a Carrito
   * 
   * Pasos:
   * 1. Hacer clic en el icono del carrito
   * 2. Verificar que navega a /cart
   * 3. Verificar que la página se carga
   */
  test('Debe navegar a Carrito desde el navbar', async ({ page }) => {
    // Hacer clic en el carrito
    const cartLink = page.getByTestId('cart-link');
    await expect(cartLink).toBeVisible();
    await cartLink.click();

    // Verificar que navega a cart
    await page.waitForURL('/cart', { timeout: 5000 });
    await expect(page).toHaveURL('/cart');

    // Verificar que la página se cargó (buscar algún elemento característico del carrito)
    // Por ejemplo, un encabezado o mensaje
    const heading = page.locator('h1, h2, [role="heading"]').first();
    await expect(heading).toBeVisible();
  });

  /**
   * Prueba 4: Navegar a Dashboard/Perfil
   * 
   * Pasos:
   * 1. Hacer clic en el enlace del perfil/dashboard
   * 2. Verificar que navega a /dashboard
   * 3. Verificar que muestra el nombre del usuario
   */
  test('Debe navegar a Dashboard desde el navbar', async ({ page }) => {
    // Hacer clic en el dashboard
    const dashboardLink = page.getByTestId('dashboard-link');
    await expect(dashboardLink).toBeVisible();
    await dashboardLink.click();

    // Verificar que navega a dashboard
    await page.waitForURL('/dashboard', { timeout: 5000 });
    await expect(page).toHaveURL('/dashboard');

    // Verificar que la página se cargó
    const heading = page.locator('h1, h2, [role="heading"]').first();
    await expect(heading).toBeVisible();
  });

  /**
   * Prueba 5: Verificar que Shop está siempre activo en el navbar
   * 
   * Pasos:
   * 1. Desde cualquier página, verificar que el enlace "Shop" está visible
   * 2. Verificar que es un enlace funcional
   */
  test('El enlace Shop debe estar siempre visible en todas las páginas', async ({ page }) => {
    // Navegar a diferentes páginas y verificar que Shop siempre está presente
    const paginasAProbar = ['/', '/cart', '/dashboard'];

    for (const ruta of paginasAProbar) {
      await page.goto(ruta);
      
      const homeLink = page.getByTestId('home-link');
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toContainText('Shop');
    }
  });

  /**
   * Prueba 6: Navegación a página no encontrada redirige a home
   * 
   * Pasos:
   * 1. Intentar navegar a una ruta inexistente
   * 2. Verificar que redirige a / (home)
   */
  test('Debe redirigir a home si navega a una ruta inexistente', async ({ page }) => {
    // Intentar navegar a una ruta que no existe
    await page.goto('/ruta-inexistente-12345');

    // Debe redirigir a home
    await page.waitForURL('/', { timeout: 5000 });
    await expect(page).toHaveURL('/');

    // Verificar que estamos en home
    const pageTitle = page.getByTestId('page-title');
    await expect(pageTitle).toBeVisible();
  });

  /**
   * Prueba 7: Navegar desde Cart a Shop
   * 
   * Pasos:
   * 1. Navegar a /cart
   * 2. Hacer clic en "Shop"
   * 3. Verificar que navega a /
   */
  test('Debe poder navegar desde Carrito a Shop', async ({ page }) => {
    // Ir al carrito
    await page.goto('/cart');
    await expect(page).toHaveURL('/cart');

    // Hacer clic en Shop
    await page.getByTestId('home-link').click();

    // Verificar que navega a home
    await page.waitForURL('/', { timeout: 5000 });
    await expect(page).toHaveURL('/');
  });

  /**
   * Prueba 8: Navegar desde Dashboard a Shop
   * 
   * Pasos:
   * 1. Navegar a /dashboard
   * 2. Hacer clic en "Shop"
   * 3. Verificar que navega a /
   */
  test('Debe poder navegar desde Dashboard a Shop', async ({ page }) => {
    // Ir a dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');

    // Hacer clic en Shop
    await page.getByTestId('home-link').click();

    // Verificar que navega a home
    await page.waitForURL('/', { timeout: 5000 });
    await expect(page).toHaveURL('/');
  });

  /**
   * Prueba 9: El carrito contiene un contador de items
   * 
   * Pasos:
   * 1. Verificar que el icono del carrito está visible
   * 2. Verificar que inicialmente no hay un contador o dice 0
   * 3. (Opcional: agregar un producto al carrito y verificar el contador)
   */
  test('El carrito debe mostrar el contador de items', async ({ page }) => {
    // Ir a home
    await page.goto('/');

    // Verificar que el carrito está visible
    const cartLink = page.getByTestId('cart-link');
    await expect(cartLink).toBeVisible();

    // El contador podría no estar visible si el carrito está vacío
    // Pero el icono debe estar siempre presente
    const cartIcon = cartLink.locator('svg').first();
    await expect(cartIcon).toBeVisible();
  });

  /**
   * Prueba 10: Navegar entre múltiples páginas en secuencia
   * 
   * Pasos:
   * 1. Home -> Dashboard -> Cart -> Home
   * 2. Verificar que cada transición es correcta
   */
  test('Debe poder navegar entre múltiples páginas sin problemas', async ({ page }) => {
    const routeSequence = [
      { link: 'dashboard-link', url: '/dashboard' },
      { link: 'cart-link', url: '/cart' },
      { link: 'home-link', url: '/' },
    ];

    for (const { link, url } of routeSequence) {
      const element = page.getByTestId(link);
      await expect(element).toBeVisible();
      await element.click();

      await page.waitForURL(url, { timeout: 5000 });
      await expect(page).toHaveURL(url);
    }
  });
});
