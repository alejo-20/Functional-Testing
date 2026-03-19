import { test, expect } from '@playwright/test';

/**
 * Suite de pruebas para autenticación (Login y Logout)
 * 
 * Credenciales de prueba disponibles:
 * - test@example.com / password123
 * - demo@example.com / demo123
 * 
 * Rutas protegidas:
 * - / (Home)
 * - /dashboard
 * - /cart
 * - /checkout
 */

test.describe('Autenticación - Login', () => {
  
  /**
   * Prueba 1: Login exitoso
   * 
   * Pasos:
   * 1. Navegar a la página de login
   * 2. Ingresar email válido
   * 3. Ingresar contraseña válida
   * 4. Hacer clic en el botón de login
   * 5. Verificar que redirige al home (/)
   * 6. Verificar que aparece el navbar con opciones autenticadas
   */
  test('Debe permitir login con credenciales válidas', async ({ page }) => {
    // Navegar a la página de login
    await page.goto('/login');
    
    // Verificar que estamos en la página de login
    await expect(page).toHaveURL('/login');
    const loginTitle = page.getByTestId('login-title');
    await expect(loginTitle).toBeVisible();
    await expect(loginTitle).toContainText('Welcome Back');

    // Llenar el formulario con credenciales válidas
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('login-form').locator('input[type="password"]').fill('password123');

    // Hacer clic en el botón de login
    // Nota: el botón tiene el texto "Login" o "Sign In"
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Esperar a que se redirija a la página de inicio
    await page.waitForURL('/', { timeout: 5000 });
    await expect(page).toHaveURL('/');

    // Verificar que la página de inicio se ha cargado correctamente
    const pageTitle = page.getByTestId('page-title');
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText('Welcome to TechShop');

    // Verificar que el navbar está visible y contiene opciones de usuario autenticado
    const navbar = page.getByTestId('navbar');
    await expect(navbar).toBeVisible();

    // Verificar que el botón de logout está visible
    const logoutButton = page.getByTestId('logout-button');
    await expect(logoutButton).toBeVisible();

    // Verificar que el enlace al carrito está visible
    const cartLink = page.getByTestId('cart-link');
    await expect(cartLink).toBeVisible();

    // Verificar que el enlace al dashboard está visible
    const dashboardLink = page.getByTestId('dashboard-link');
    await expect(dashboardLink).toBeVisible();
  });

  /**
   * Prueba 2: Login con credenciales incorrectas
   * 
   * Pasos:
   * 1. Navegar a la página de login
   * 2. Ingresar email inválido
   * 3. Ingresar contraseña inválida
   * 4. Hacer clic en el botón de login
   * 5. Verificar que aparece un mensaje de error
   * 6. Verificar que NO redirige al home
   */
  test('Debe mostrar error con credenciales inválidas', async ({ page }) => {
    // Navegar a la página de login
    await page.goto('/login');
    await expect(page).toHaveURL('/login');

    // Llenar el formulario con credenciales incorrectas
    await page.getByTestId('email-input').fill('wrong@example.com');
    await page.getByTestId('login-form').locator('input[type="password"]').fill('wrongpassword');

    // Hacer clic en el botón de login
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Esperar a que aparezca el mensaje de error
    const errorMessage = page.getByTestId('login-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid email or password');

    // Verificar que seguimos en la página de login (no redirijo)
    await expect(page).toHaveURL('/login');
  });

  /**
   * Prueba 3: Login con email vacío
   * 
   * Pasos:
   * 1. Navegar a la página de login
   * 2. Dejar el email vacío
   * 3. Ingresar contraseña
   * 4. Hacer clic en login
   * 5. Verificar que aparece mensaje de error
   */
  test('Debe mostrar error si el email está vacío', async ({ page }) => {
    await page.goto('/login');

    // Dejar email vacío y llenar contraseña
    await page.getByTestId('login-form').locator('input[type="password"]').fill('password123');

    // Hacer clic en el botón de login
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Verificar que aparece mensaje de error
    const errorMessage = page.getByTestId('login-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Email is required');

    // Verificar que seguimos en la página de login
    await expect(page).toHaveURL('/login');
  });

  /**
   * Prueba 4: Login con contraseña vacía
   * 
   * Pasos:
   * 1. Navegar a la página de login
   * 2. Ingresar email válido
   * 3. Dejar contraseña vacía
   * 4. Hacer clic en login
   * 5. Verificar que aparece mensaje de error
   */
  test('Debe mostrar error si la contraseña está vacía', async ({ page }) => {
    await page.goto('/login');

    // Llenar email y dejar contraseña vacía
    await page.getByTestId('email-input').fill('test@example.com');

    // Hacer clic en el botón de login
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Verificar que aparece mensaje de error
    const errorMessage = page.getByTestId('login-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Password is required');

    // Verificar que seguimos en la página de login
    await expect(page).toHaveURL('/login');
  });

  /**
   * Prueba 5: Login con contraseña muy corta
   * 
   * Pasos:
   * 1. Navegar a la página de login
   * 2. Ingresar email válido
   * 3. Ingresar contraseña con menos de 6 caracteres
   * 4. Hacer clic en login
   * 5. Verificar que aparece mensaje de error
   */
  test('Debe mostrar error si la contraseña es muy corta', async ({ page }) => {
    await page.goto('/login');

    // Llenar email y contraseña corta
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('login-form').locator('input[type="password"]').fill('short');

    // Hacer clic en el botón de login
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Verificar que aparece mensaje de error
    const errorMessage = page.getByTestId('login-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Password must be at least 6 characters');

    // Verificar que seguimos en la página de login
    await expect(page).toHaveURL('/login');
  });

  /**
   * Prueba 6: Intento de acceder a ruta protegida sin autenticación
   * 
   * Pasos:
   * 1. Navegar directamente a una ruta protegida (/)
   * 2. Verificar que redirige a /login
   */
  test('Debe redirigir a login si intenta acceder a ruta protegida sin autenticación', async ({ page }) => {
    // Intentar acceder directamente a la página de inicio
    await page.goto('/', { waitUntil: 'networkidle' });

    // Debe redirigir a /login
    await expect(page).toHaveURL('/login');
  });
});

test.describe('Autenticación - Logout', () => {
  
  /**
   * Prueba 7: Logout exitoso
   * 
   * Pasos:
   * 1. Login con credenciales válidas
   * 2. Verificar que se está en la página de inicio
   * 3. Hacer clic en el botón de logout
   * 4. Verificar que redirige a la página de login
   * 5. Verificar que no se puede acceder a rutas protegidas
   */
  test('Debe permitir logout y redirigir a login', async ({ page }) => {
    // Hacer login primero
    await page.goto('/login');
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('login-form').locator('input[type="password"]').fill('password123');
    await page.getByRole('button', { name: /login|sign in/i }).click();

    // Esperar a que redirige a home
    await page.waitForURL('/', { timeout: 5000 });
    await expect(page).toHaveURL('/');

    // Hacer clic en el botón de logout
    const logoutButton = page.getByTestId('logout-button');
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    // Verificar que redirige a la página de login
    await page.waitForURL('/login', { timeout: 5000 });
    await expect(page).toHaveURL('/login');

    // Verificar que el botón de logout ya no está visible (porque no hay sesión)
    const logoutBtn = page.getByTestId('logout-button');
    await expect(logoutBtn).not.toBeVisible();

    // Intentar acceder a la página de inicio nuevamente
    await page.goto('/');
    // Debe redirigir nuevamente a login
    await expect(page).toHaveURL('/login');
  });
});
