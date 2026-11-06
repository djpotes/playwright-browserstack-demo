# Playwright + BrowserStack Demo

Proyecto demo que ejecuta pruebas end-to-end con **Playwright** (TypeScript) en la nube de **BrowserStack Automate**, usando el `browserstack-node-sdk`. Las pruebas corren contra el sitio de ejemplo [bstackdemo.com](https://bstackdemo.com).

## Estructura

```
.
├── browserstack.yml          # Plataformas, build y opciones de BrowserStack
├── playwright.config.ts      # Configuración de Playwright
├── pages/                    # Page Object Model
│   ├── HomePage.ts
│   └── LoginPage.ts
├── tests/                    # Casos de prueba
│   ├── home.spec.ts
│   └── login.spec.ts
└── .github/workflows/        # Pipeline de GitHub Actions
```

## Paso a paso

### 1. Requisitos
- Node.js 18 o superior
- Cuenta de BrowserStack (sirve el trial). Username y Access Key están en *Settings*.

### 2. Clonar e instalar
```bash
git clone https://github.com/djpotes/<repo>.git
cd <repo>
npm install
npx playwright install   # navegadores para correr local
```

### 3. Configurar credenciales
Mac / Linux:
```bash
export BROWSERSTACK_USERNAME="tu_usuario"
export BROWSERSTACK_ACCESS_KEY="tu_access_key"
```
Windows PowerShell:
```powershell
$env:BROWSERSTACK_USERNAME="tu_usuario"
$env:BROWSERSTACK_ACCESS_KEY="tu_access_key"
```

### 4. Ejecutar
| Comando | Qué hace |
|---|---|
| `npm test` | Corre las pruebas en tu máquina |
| `npm run test:bs` | Corre las pruebas en BrowserStack (Chrome, WebKit y Firefox en paralelo) |
| `npm run report` | Abre el reporte HTML local |

### 5. Ver resultados
Entra a [BrowserStack Automate](https://automate.browserstack.com/dashboard) y abre el build **demo-build**: verás video, logs y capturas por cada navegador.

## Personalizar plataformas
Edita la sección `platforms` de `browserstack.yml`. Ejemplo para un móvil Android:
```yaml
  - deviceName: Samsung Galaxy S23
    osVersion: 13.0
    browserName: chrome
```

## CI con GitHub Actions
1. En el repo ve a *Settings → Secrets and variables → Actions*.
2. Crea los secrets `BROWSERSTACK_USERNAME` y `BROWSERSTACK_ACCESS_KEY`.
3. El workflow corre en cada push a `main` o manualmente desde la pestaña *Actions*.

## Probar localhost
Pon `browserstackLocal: true` en `browserstack.yml` y cambia `baseURL` en `playwright.config.ts` a tu URL local.
