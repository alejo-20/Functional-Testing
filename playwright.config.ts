import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para pruebas de la aplicación TechShop
 * 
 * Esta configuración define:
 * - La URL base de la aplicación (localhost:5173 - puerto por defecto de Vite)
 * - Navegadores a probar (Chromium, Firefox, WebKit)
 * - Ubicación de los reportes de prueba
 * - Timeouts y reintentos
 */
export default defineConfig({
  testDir: './tests',
  
  // Configuración de timeouts
  timeout: 30000, // Timeout máximo por prueba
  expect: {
    timeout: 5000, // Timeout para assertions
  },

  // Configurar para ejecutar pruebas en paralelo
  fullyParallel: false,
  
  // Detener en la primera falla para debugging
  forbidOnly: !!process.env.CI,
  
  // Reintentos solo en CI
  retries: process.env.CI ? 2 : 0,
  
  // Número de workers en paralelo
  workers: process.env.CI ? 1 : 1,

  // Reporter HTML
  reporter: [
    ['html'],
    ['list'],
  ],

  // Opciones compartidas para todos los proyectos
  use: {
    // URL base de la aplicación
    baseURL: 'http://localhost:5173',
    
    // Configuración de trace para debugging
    trace: 'on-first-retry',
    
    // Captura de pantallas
    screenshot: 'only-on-failure',
    
    // Video solo si falla
    video: 'retain-on-failure',
  },

  // Configurar web server (si quieres que Playwright inicie el servidor)
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // Definir navegadores para las pruebas
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
