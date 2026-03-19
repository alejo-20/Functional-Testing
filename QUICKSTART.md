# ⚡ Inicio Rápido - Pruebas con Playwright

## 📦 ¿Qué se ha instalado?

Se ha instalado y configurado **Playwright** (versión 1.58.2) para pruebas automatizadas de tu aplicación TechShop.

## 📁 Estructura de Archivos Creados

```
tu-proyecto/
├── playwright.config.ts              # Configuración principal de Playwright
├── TESTING.md                        # Documentación completa
├── PLAYWRIGHT_CHEATSHEET.md         # Referencia rápida de comandos
├── package.json                      # (Actualizado con scripts)
├── .gitignore                        # (Actualizado con directorios de Playwright)
├── .github/
│   └── workflows/
│       └── playwright.yml            # Configuración para CI/CD (GitHub Actions)
└── tests/
    ├── auth.spec.ts                 # Pruebas de autenticación
    ├── navigation.spec.ts            # Pruebas de navegación
    ├── products.spec.ts              # Pruebas de productos y carrito
    ├── example.spec.ts               # Ejemplos y patrones
    └── utils.ts                      # Funciones reutilizables
```

## 🚀 Pasos para Empezar

### 1. Asegúrate de que la app está corriendo
```bash
npm run dev
```
La app estará disponible en `http://localhost:5173`

### 2. Ejecuta las pruebas
En otra terminal, ejecuta:
```bash
npm test
```

### 3. Ver resultados interactivos
```bash
npm run test:ui
```

## 📋 Pruebas Incluidas

### ✅ Autenticación (7 pruebas)
- ✓ Login con credenciales válidas
- ✓ Login con credenciales inválidas
- ✓ Validación de email vacío
- ✓ Validación de contraseña vacía
- ✓ Validación de contraseña corta
- ✓ Redireccionamiento automático a login
- ✓ Logout exitoso

### ✅ Navegación (10 pruebas)
- ✓ Navegar por logo
- ✓ Navegar a Shop
- ✓ Navegar al Carrito
- ✓ Navegar al Dashboard
- ✓ Visibilidad de Shop en todas las páginas
- ✓ Redirección de rutas no encontradas
- ✓ Navegación secuencial
- ✓ Contador del carrito
- ✓ Y más...

### ✅ Productos y Carrito (10 pruebas)
- ✓ Mostrar productos en home
- ✓ Búsqueda de productos
- ✓ Limpiar búsqueda
- ✓ Carrito vacío
- ✓ Detalles de producto
- ✓ Y más...

## 👤 Credenciales de Prueba

```
Email: test@example.com
Password: password123

Email: demo@example.com
Password: demo123
```

## 🎯 Comandos Útiles

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar con interfaz gráfica
npm run test:ui

# Ejecutar en modo debug
npm run test:debug

# Ejecutar con navegador visible
npm run test:headed

# Ejecutar solo un navegador
npm run test:chromium      # Chrome
npm run test:firefox       # Firefox
npm run test:webkit        # Safari

# Ver reporte HTML
npm run test:report

# Ejecutar una prueba específica
npm test -g "nombre de la prueba"

# Ejecutar un archivo específico
npm test tests/auth.spec.ts
```

## 📖 Próximos Pasos

1. **Leer la documentación completa**: Abre `TESTING.md`
2. **Explorar ejemplos**: Revisa `tests/example.spec.ts`
3. **Referencia rápida**: Usa `PLAYWRIGHT_CHEATSHEET.md`
4. **Crear nuevas pruebas**: Basándote en los patrones existentes

## 🎨 Estructura de una Prueba

```typescript
import { test, expect } from '@playwright/test';

test('Descripción de mi prueba', async ({ page }) => {
  // 1. Arreglo (setup)
  await page.goto('/mi-pagina');
  
  // 2. Acción 
  await page.getByTestId('mi-boton').click();
  
  // 3. Verificación (assertion)
  await expect(page).toHaveURL('/resultado');
});
```

## 💡 Tips Importantes

1. **Usa `data-testid`** - Es más confiable que selectores CSS
2. **Espera de forma explícita** - No uses `waitForTimeout()`, usa `expect()`
3. **Reutiliza funciones** - El archivo `utils.ts` tiene funciones comunes
4. **Organiza por funcionalidad** - Mantén pruebas relacionadas juntas
5. **Comenta tu código** - Especialmente pasos complejos

## 📊 Reportes

Después de ejecutar las pruebas:
- Los reportes están en `playwright-report/`
- Puedes verlos con: `npm run test:report`
- Incluyen screenshots de fallos y videos

## ❓ Preguntas Frecuentes

**P: ¿Las pruebas necesitan que la app esté corriendo?**
R: Sí, la app debe estar en `http://localhost:5173`

**P: ¿Puedo ejecutar las pruebas en paralelo?**
R: Sí, le Playwright es paralelo por defecto (en diferentes workers)

**P: ¿Hay límite de pruebas?**
R: No, puedes tener tantas como necesites

**P: ¿Cómo agregopic nuevas pruebas?**
R: Crea un nuevo archivo `.spec.ts` en la carpeta `tests/`

## 🔄 CI/CD

Se incluye configuración para GitHub Actions. Cuando hagas `push` o `pull request`, las pruebas se ejecutarán automáticamente. Ver `.github/workflows/playwright.yml`

## 📚 Recursos

- [Documentación oficial de Playwright](https://playwright.dev)
- [Localizadores de Playwright](https://playwright.dev/docs/locators)
- [Best practices](https://playwright.dev/docs/best-practices)

## ✨ Puntos Destacados

✅ **27+ pruebas** listas para usar
✅ **Funciones utilitarias** reutilizables
✅ **Bien documentado** con comentarios
✅ **Ejemplos incluidos** para aprender
✅ **CI/CD configured** para GitHub Actions
✅ **Selectores claros** basados en `data-testid`
✅ **Buenas prácticas** implementadas

## 🎓 Siguiente: Ejecuta una Prueba

1. Abre una terminal
2. Asegúrate de que `npm run dev` está corriendo
3. En otra terminal: `npm test`
4. ¡Mira cómo Playwright automatiza tu aplicación!

---

**¡Listo para comenzar! 🚀**

Para más información y documentación detallada, lee **TESTING.md**.
