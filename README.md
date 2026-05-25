# Portal Eneryia

Dashboard operativo construido con **Next.js 16**, **Tailwind CSS 4** y la base de **shadcn/ui** en versión JavaScript. Diseño *dark + neon cyan* para gestionar la hoja de ruta de contenido, ads y funnels.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, JavaScript puro)
- [Tailwind CSS 4](https://tailwindcss.com/) con tokens custom (`globals.css`)
- Componentes inspirados en [shadcn/ui](https://ui.shadcn.com/) (Radix + CVA)
- [lucide-react](https://lucide.dev/) para los íconos
- [Recharts](https://recharts.org/) para los gráficos del dashboard
- Autenticación mock con `localStorage`

## Requisitos

- Node.js 20+
- npm 10+

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Cuentas demo

| Email                | Password   | Rol     |
| -------------------- | ---------- | ------- |
| `admin@eneryia.io`   | `admin123` | Founder |
| `demo@eneryia.io`    | `demo123`  | Editor  |

> El login está mockeado: las credenciales válidas se definen en `src/lib/mock-data.js` y la sesión se guarda en `localStorage` bajo la clave `eneryia-auth`.

## Estructura del menú (sidebar derecho)

Refleja la "Hoja de Ruta Brief" del esquema original:

- **Hoja de Ruta** (`/dashboard`)
- **Contenido**
  - Largo
  - Corto
- **Ads**
  - Estáticos
  - Videos
    - Of. Directa
    - Of. Indirecta
- **Funnels**
  - Landings
    - Compra → Landing VSL · Dossier · Largo
    - Optin → Landing VSL · Dossier · Largo
  - VSL Compra
    - Upsell
    - Bumps

## Estructura de carpetas

```
src/
├── app/
│   ├── dashboard/         # Layout protegido + secciones del brief
│   ├── login/             # Página de acceso
│   ├── globals.css        # Tokens de diseño + utilidades neón
│   ├── layout.js          # AuthProvider + html dark
│   └── page.js            # Redirect según sesión
├── components/
│   ├── dashboard/         # Sidebar derecho, topbar, page-header, section-page
│   └── ui/                # Componentes shadcn/ui (button, card, input, badge…)
├── context/
│   └── auth-context.jsx   # Login mock con localStorage
└── lib/
    ├── mock-data.js       # Stats, briefs, actividad y fases del pipeline
    ├── navigation.js      # Definición jerárquica del menú
    └── utils.js           # `cn` helper (clsx + tailwind-merge)
```

## Personalización visual

Los colores del branding viven en `src/app/globals.css` como CSS variables:

- `--primary` / `--neon` → cyan fluorescente `#00e5ff`
- `--background` / `--sidebar` → negros profundos `#050816` / `#060b1f`
- `--chart-*` → paleta cyan → azul → violeta → rosa para datos

Utilidades extra:

- `.neon-text` — texto con resplandor cyan
- `.neon-border` / `.neon-glow` — bordes y sombras neón
- `.glass` — fondo cristal con blur
- `.grid-bg` — grilla futurista
- `.animate-pulse-neon` — pulso de luz para CTAs

## Funcionalidades clave

- **Login mock** con `localStorage` y dos cuentas demo.
- **Sidebar a la derecha** con jerarquía colapsable de hasta 4 niveles.
- **Topbar** con buscador, notificaciones, atajo de "Nuevo brief" y menú de usuario.
- **Dashboard principal** con KPIs, gráficos de área/torta/barras (Recharts), feed de actividad y tabla de briefs.
- **Páginas de sección** reutilizables con KPIs, foco semanal, tabla filtrable y acciones por fila.
- **Página 404** custom con branding neón.
- **Animaciones** del sidebar (collapsible suave) y del logo (pulso neón).

## Próximos pasos sugeridos

- Conectar el `AuthProvider` con un backend real (NextAuth/Auth.js).
- Sustituir los datos mockeados en `src/lib/mock-data.js` por una API.
- Añadir formularios de edición y creación de briefs por cada sección.
- Conectar los gráficos con métricas reales del CRM / Ads.
