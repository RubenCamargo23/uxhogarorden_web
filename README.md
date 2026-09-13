# HogarOrden Web

Proyecto base generado con [Angular CLI](https://angular.dev/tools/cli) v22 (standalone, SSR habilitado).

## Requisitos

- Node.js 20+ (recomendado 22 LTS o superior)
- npm 10+

## Instalación

```bash
npm install
```

## Comandos

| Comando | Descripción |
|---|---|
| `npm start` | Levanta el servidor de desarrollo en `http://localhost:4200` con recarga automática |
| `npm run build` | Compila el proyecto (cliente + servidor SSR) en `dist/hogarorden-web` |
| `npm run watch` | Compila en modo desarrollo con watch (sin servir) |
| `npm test` | Ejecuta las pruebas unitarias con Vitest |
| `npm run serve:ssr:hogarorden-web` | Sirve la build de producción con SSR (requiere `npm run build` antes) |

## Generar código

```bash
npx ng generate component nombre-componente
```

Ver todos los esquemas disponibles:

```bash
npx ng generate --help
```
