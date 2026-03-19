import { Page, expect } from '@playwright/test';

/**
 * Utilidades para pruebas de Playwright
 * 
 * Este archivo contiene funciones reutilizables para las pruebas
 * de la aplicación TechShop.
 */

/**
 * Interfaz para credenciales de prueba
 */
export interface TestCredentials {
  email: string;
  password: string;
  name?: string;
}

/**
 * Credenciales de prueba disponibles
 */
export const TEST_USERS = {
  validUser: {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  },
  demoUser: {
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User'
  }
};

/**
 * Función para hacer login
 * 
 * Navega a /login, rellena el formulario y verifica el login exitoso
 * 
 * @param page - Página de Playwright
 * @param credentials - Credenciales de usuario (email y password)
 * @throws Error si el login falla
 */
export async function login(page: Page, credentials: TestCredentials): Promise<void> {
  // Navegar a login
  await page.goto('/login');
  await expect(page).toHaveURL('/login');

  // Llenar formulario
  await page.getByTestId('email-input').fill(credentials.email);
  await page.getByTestId('login-form').locator('input[type="password"]').fill(credentials.password);

  // Hacer clic en botón de login
  await page.getByRole('button', { name: /login|sign in/i }).click();

  // Esperar a redirección a home
  await page.waitForURL('/', { timeout: 5000 });
  await expect(page).toHaveURL('/');
}

/**
 * Función para hacer logout
 * 
 * Hace clic en el botón de logout y verifica la redirección a login
 * 
 * @param page - Página de Playwright
 * @throws Error si el logout falla
 */
export async function logout(page: Page): Promise<void> {
  // Verificar que estamos autenticados
  const logoutButton = page.getByTestId('logout-button');
  await expect(logoutButton).toBeVisible();

  // Hacer clic en logout
  await logoutButton.click();

  // Esperar a redirección a login
  await page.waitForURL('/login', { timeout: 5000 });
  await expect(page).toHaveURL('/login');
}

/**
 * Función para verificar que el usuario está autenticado
 * 
 * Verifica que los elementos del navbar de usuario autenticado sean visibles
 * 
 * @param page - Página de Playwright
 */
export async function verifyUserIsAuthenticated(page: Page): Promise<void> {
  const navbar = page.getByTestId('navbar');
  await expect(navbar).toBeVisible();

  const logoutButton = page.getByTestId('logout-button');
  await expect(logoutButton).toBeVisible();

  const dashboardLink = page.getByTestId('dashboard-link');
  await expect(dashboardLink).toBeVisible();

  const cartLink = page.getByTestId('cart-link');
  await expect(cartLink).toBeVisible();
}

/**
 * Función para verificar que el usuario NO está autenticado
 * 
 * Verifica que estamos en la página de login
 * 
 * @param page - Página de Playwright
 */
export async function verifyUserIsNotAuthenticated(page: Page): Promise<void> {
  await expect(page).toHaveURL('/login');

  const loginTitle = page.getByTestId('login-title');
  await expect(loginTitle).toBeVisible();
}

/**
 * Función para naviguar a una página específica y verificar que se cargó
 * 
 * @param page - Página de Playwright
 * @param url - URL a navegar
 * @param timeout - Timeout en ms (default: 5000)
 */
export async function navigateTo(page: Page, url: string, timeout: number = 5000): Promise<void> {
  await page.goto(url);
  await page.waitForURL(url, { timeout });
  await expect(page).toHaveURL(url);
}

/**
 * Función para hacer clic en un elemento del navbar
 * 
 * @param page - Página de Playwright
 * @param testId - TestID del elemento
 * @param expectedUrl - URL esperada después de hacer clic
 */
export async function clickNavbarLink(
  page: Page,
  testId: string,
  expectedUrl: string
): Promise<void> {
  const link = page.getByTestId(testId);
  await expect(link).toBeVisible();
  await link.click();

  await page.waitForURL(expectedUrl, { timeout: 5000 });
  await expect(page).toHaveURL(expectedUrl);
}

/**
 * Función para verificar que un error de login se muestra
 * 
 * @param page - Página de Playwright
 * @param errorMessage - Mensaje de error esperado (parcial)
 */
export async function verifyLoginError(page: Page, errorMessage: string): Promise<void> {
  const error = page.getByTestId('login-error');
  await expect(error).toBeVisible();
  await expect(error).toContainText(errorMessage);

  // Verificar que seguimos en login
  await expect(page).toHaveURL('/login');
}

/**
 * Función para hacer login y luego logout
 * 
 * Útil para pruebas que necesitan verificar el ciclo completo de autenticación
 * 
 * @param page - Página de Playwright
 * @param credentials - Credenciales de usuario
 */
export async function loginAndLogout(page: Page, credentials: TestCredentials): Promise<void> {
  await login(page, credentials);
  await verifyUserIsAuthenticated(page);
  await logout(page);
  await verifyUserIsNotAuthenticated(page);
}

/**
 * Función para esperar a que un elemento sea visible
 * 
 * @param page - Página de Playwright
 * @param testId - TestID del elemento
 * @param timeout - Timeout en ms (default: 5000)
 */
export async function waitForElement(
  page: Page,
  testId: string,
  timeout: number = 5000
): Promise<void> {
  const element = page.getByTestId(testId);
  await expect(element).toBeVisible({ timeout });
}

/**
 * Función para obtener el texto de un elemento
 * 
 * @param page - Página de Playwright
 * @param testId - TestID del elemento
 * @returns El texto del elemento
 */
export async function getElementText(page: Page, testId: string): Promise<string> {
  const element = page.getByTestId(testId);
  return await element.textContent() ?? '';
}
