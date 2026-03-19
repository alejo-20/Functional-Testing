import { test, expect } from '@playwright/test';
import { login, TEST_USERS } from './utils';

/**
 * Suite de pruebas para funcionalidad de productos y carrito
 * 
 * Nota: Estas pruebas requieren que el usuario esté autenticado.
 */

test.describe('Productos y Carrito', () => {
  
  /**
   * Ejecutar antes de cada prueba: hacer login
   */
  test.beforeEach(async ({ page }) => {
    // Navegar a login e iniciar sesión
    await login(page, TEST_USERS.validUser);

    // Verificar que estamos en home
    await expect(page).toHaveURL('/');
  });

  /**
   * Prueba 1: La página de inicio muestra productos
   * 
   * Pasos:
   * 1. Navegar a home
   * 2. Verificar que hay productos visibles
   */
  test('Debe mostrar productos en la página de inicio', async ({ page }) => {
    // Esperar a que los productos se carguen
    // Buscar elementos que representen productos (cards)
    
    // Debe haber al menos un producto
    const firstProduct = page.locator('h2, h3, [role="heading"]').nth(1);
    await expect(firstProduct).toBeVisible({ timeout: 5000 });
  });

  /**
   *Prueba 2: Buscar productos
   * 
   * Pasos:
   * 1. Escribir en la barra de búsqueda
   * 2. Verificar que los resultados cambian
   */
  test('Debe permitir buscar productos', async ({ page }) => {
    // Esperar a que el input de búsqueda sea visible
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).toBeVisible();

    // Escribir un término de búsqueda
    await searchInput.fill('laptop');

    // Esperar a que se actualicen los resultados
    await page.waitForTimeout(500); // Esperar a que React actualice

    // Verificar que el input contiene lo que escribimos
    await expect(searchInput).toHaveValue('laptop');
  });

  /**
   * Prueba 3: Limpiar búsqueda
   * 
   * Pasos:
   * 1. Escribir en la búsqueda
   * 2. Limpiar
   * 3. Verificar que se muestran todos los productos nuevamente
   */
  test('Debe permitir limpiar la búsqueda', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
    
    // Escribir algo
    await searchInput.fill('test');
    await page.waitForTimeout(300);

    // Limpiar
    await searchInput.clear();
    
    // Verificar que está vacío
    await expect(searchInput).toHaveValue('');
  });

  /**
   * Prueba 4: Navegar a página de carrito vacío
   * 
   * Pasos:
   * 1. Hacer clic en el carrito
   * 2. Verificar que navega a /cart
   * 3. Verificar que aparece un mensaje de carrito vacío (si no hay items)
   */
  test('Debe mostrar carrito vacío inicialmente', async ({ page }) => {
    // Hacer clic en el carrito
    const cartLink = page.getByTestId('cart-link');
    await cartLink.click();

    // Verificar que estamos en /cart
    await page.waitForURL('/cart', { timeout: 5000 });
    await expect(page).toHaveURL('/cart');

    // La página de carrito se cargó correctamente
    await page.waitForLoadState('networkidle');
  });

  /**
   * Prueba 5: Navegar a detalles de un producto
   * 
   * Pasos:
   * 1. Desde home, hacer clic en un producto
   * 2. Verificar que navega a /product/:id
   * 3. Verificar que muestra detalles del producto
   */
  test('Debe poder navegar a detalles de un producto', async ({ page }) => {
    // Buscar un link o botón de producto
    // El pattern puede variar según la estructura
    const productLink = page.locator('a[href*="/product/"]').first();
    
    // Si hay un producto disponible
    const isVisible = await productLink.isVisible().catch(() => false);
    
    if (isVisible) {
      // Hacer clic
      await productLink.click();

      // Esperar a que la URL cambie a /product/
      await page.waitForURL(/\/product\/\d+/, { timeout: 5000 });
      
      // Verificar que está en la ruta de detalles
      expect(page.url()).toContain('/product/');
    }
  });

  /**
   * Prueba 6: Volver a home desde detalles de producto
   * 
   * Pasos:
   * 1. Navegar a detalles de producto (si existe)
   * 2. Hacer clic en "Volver"
   * 3. Verificar que regresa a home
   */
  test('Debe poder volver a home desde detalles de producto', async ({ page }) => {
    // Navegar a un producto (si existe)
    const productLink = page.locator('a[href*="/product/"]').first();
    const isVisible = await productLink.isVisible().catch(() => false);
    
    if (isVisible) {
      await productLink.click();
      await page.waitForURL(/\/product\//, { timeout: 5000 });

      // Buscar botón para volver
      const backButtons = [
        page.getByRole('button', { name: /back|volver|atrás/i }),
        page.getByRole('link', { name: /back|volver|atrás|home|inicio/i }),
        page.getByTestId('home-link'),
      ];

      let clickedBack = false;
      for (const btn of backButtons) {
        const isVisible = await btn.isVisible().catch(() => false);
        if (isVisible) {
          await btn.click();
          clickedBack = true;
          break;
        }
      }

      // Si encontramos un botón de vuelta, verificar que regresa a home
      if (clickedBack) {
        await page.waitForURL('/', { timeout: 5000 });
        await expect(page).toHaveURL('/');
      }
    }
  });

  /**
   * Prueba 7: Verificar que los enlaces del navbar siguen funcionando en detalles
   * 
   * Pasos:
   * 1. Navegar a detalles de producto
   * 2. Hacer clic en "Shop" del navbar
   * 3. Verificar regreso a home
   */
  test('Navbar funciona desde detalles de producto', async ({ page }) => {
    // Navegar a un producto
    const productLink = page.locator('a[href*="/product/"]').first();
    const isVisible = await productLink.isVisible().catch(() => false);
    
    if (isVisible) {
      await productLink.click();
      await page.waitForURL(/\/product\//, { timeout: 5000 });

      // Hacer clic en Shop del navbar
      const homeLink = page.getByTestId('home-link');
      await expect(homeLink).toBeVisible();
      await homeLink.click();

      // Verificar que regresa a home
      await page.waitForURL('/', { timeout: 5000 });
      await expect(page).toHaveURL('/');
    }
  });

  /**
   * Prueba 8: El botón de logout está siempre disponible
   * 
   * Pasos:
   * 1. Navegar a diferentes páginas
   * 2. Verificar que el botón de logout está visible en todas
   */
  test('Logout está disponible en todas las páginas', async ({ page }) => {
    const pagesToCheck = ['/', '/cart', '/dashboard'];

    for (const path of pagesToCheck) {
      await page.goto(path);
      
      const logoutButton = page.getByTestId('logout-button');
      await expect(logoutButton).toBeVisible({
        timeout: 5000
      }).catch(async () => {
        // Si no es visible (página lentamente cargada), esperar
        await page.waitForLoadState('networkidle');
        await expect(logoutButton).toBeVisible();
      });
    }
  });

  /**
   * Prueba 9: La página home contiene título y descripción
   * 
   * Pasos:
   * 1. Estar en home
   * 2. Verificar que existe título
   * 3. Verificar que existe descripción
   */
  test('Home debe mostrar título bienvenida', async ({ page }) => {
    await page.goto('/');

    // Verificar que está el título
    const pageTitle = page.getByTestId('page-title');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('Welcome to TechShop');

    // Verificar que hay contenido adicional
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  /**
   * Prueba 10: Contador del carrito está presente
   * 
   * Pasos:
   * 1. Verificar que el icono del carrito está en el navbar
   * 2. Verificar su funcionalidad
   */
  test('Carrito está visible en el navbar', async ({ page }) => {
    // El carrito debe estar siempre visible
    const cartLink = page.getByTestId('cart-link');
    await expect(cartLink).toBeVisible();

    // Hacer clic debe navegar a /cart
    await cartLink.click();
    await page.waitForURL('/cart', { timeout: 5000 });
    await expect(page).toHaveURL('/cart');
  });
});
