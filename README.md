# QR Code Menu Platform

This repository centralizes the services for a QR code powered restaurant menu. It includes:

- **Backend API (`backend-qrcode-menu/`)** – a NestJS service that stores menu data in PostgreSQL via Prisma or alternatively in MongoDB, and exposes REST endpoints for companies, categories, products, and ingredients.
- **Customer Frontend (`frontend-qrcode-menu/`)** – a Next.js 15 application that renders the restaurant menu customers see when scanning the QR code.
- **Management Dashboard (`dashboard-qrcode-menu/`)** – a Vite + React interface used internally to curate categories and products.

![System overview](restaurant_menu_system.png)

## Repository structure

| Folder | Description |
| --- | --- |
| `backend-qrcode-menu/` | NestJS project with Prisma and optional MongoDB repositories, including Docker compose definitions for local databases. |
| `frontend-qrcode-menu/` | Next.js application that fetches menu data from the backend REST API and renders a mobile-friendly menu. |
| `dashboard-qrcode-menu/` | Vite/React dashboard that integrates with the backend API to manage menu data. |
| `restaurant_menu_system.png` | Architecture diagram for the overall system. |

## Prerequisites

- Node.js 20+
- npm, Yarn, or pnpm (each project provides scripts for all major package managers)
- Docker Desktop (to start PostgreSQL and MongoDB locally via Compose)

> **Tip:** The frontend and dashboard both assume the backend is reachable at `http://localhost:3399`. Adjust their API clients if you run the server on a different host or port.

## Backend API (`backend-qrcode-menu`)

The backend is a NestJS 11 service that can persist data through Prisma/PostgreSQL or via MongoDB repositories depending on configuration. It exposes CRUD endpoints for categories, companies, products (including slug lookups and batch creation), and ingredients. 【F:backend-qrcode-menu/src/presenters/controllers/category/category.controller.ts†L1-L58】【F:backend-qrcode-menu/src/presenters/controllers/product/product.controller.ts†L1-L56】

### Environment variables

Create a `.env` file in `backend-qrcode-menu/` with at least:

```env
SERVER_PORT=3399
DATABASE_URL="postgresql://root:123456@localhost:5482/menu_online"
DATABASE_PROVIDER=prisma # or set to mongo to switch repositories
MONGODB_URI="mongodb://localhost:27017/qrcode_menu?directConnection=true"
```

- `SERVER_PORT` must match the port expected by the frontend/dashboard.
- `DATABASE_PROVIDER` toggles between Prisma (PostgreSQL) and MongoDB repositories. 【F:backend-qrcode-menu/src/infra/modules/database.module.ts†L1-L86】【F:backend-qrcode-menu/src/infra/modules/app.module.ts†L13-L37】
- `DATABASE_URL` follows the Prisma connection string format. 【F:backend-qrcode-menu/src/infra/database/prisma/schema.prisma†L1-L44】

### Installing dependencies

```bash
cd backend-qrcode-menu
yarn install # or npm install / pnpm install
```

### Starting databases (optional but recommended)

```bash
docker compose -f docker-compose.yaml up -d
```

The bundled Compose file starts PostgreSQL on `5482` and MongoDB on `27017`. Shut them down with `docker compose -f docker-compose.yaml down` when you are done. 【F:backend-qrcode-menu/docker-compose.yaml†L1-L30】

### Running the API

```bash
yarn start:dev # hot-reload development server
```

Once running you can hit endpoints such as:

- `GET /categories` to list categories
- `GET /products` to list all products
- `GET /products/slug/:slug` to retrieve product details by slug

## Customer Frontend (`frontend-qrcode-menu`)

The customer-facing application is built with Next.js 15 using React Server Components. It fetches categories and products from the backend to render a mobile-friendly menu UI. 【F:frontend-qrcode-menu/src/app/page.tsx†L1-L16】【F:frontend-qrcode-menu/src/components/PageMenu.tsx†L1-L77】

### Configuration

Update the backend base URL if needed:

- Server component data fetching in `src/app/page.tsx`
- Product detail pages in `src/app/[restaurant]/[slug]/page.tsx`
- Axios instance in `src/api/index.ts`

All default to `http://localhost:3399`. 【F:frontend-qrcode-menu/src/app/page.tsx†L6-L16】【F:frontend-qrcode-menu/src/app/[restaurant]/[slug]/page.tsx†L1-L27】【F:frontend-qrcode-menu/src/api/index.ts†L1-L8】

### Install and run

```bash
cd frontend-qrcode-menu
yarn install
yarn dev
```

Navigate to `http://localhost:3000` and the app will proxy API calls to the backend configured above.

## Management Dashboard (`dashboard-qrcode-menu`)

The dashboard is a Vite + React 19 project that currently ships with example tables powered by TanStack Table and Tailwind UI components. It is set up to call the backend API through a shared Axios client. 【F:dashboard-qrcode-menu/src/pages/dashboard/index.tsx†L1-L39】【F:dashboard-qrcode-menu/src/components/table-categories.tsx†L1-L120】【F:dashboard-qrcode-menu/src/api/index.ts†L1-L6】

### Configuration

If you change the backend host, update `src/api/index.ts` accordingly. 【F:dashboard-qrcode-menu/src/api/index.ts†L1-L6】

### Install and run

```bash
cd dashboard-qrcode-menu
yarn install
yarn dev
```

Vite serves the dashboard at `http://localhost:5173` by default.

## Development workflow

1. Start the backend (and databases) first so that the frontend and dashboard can fetch data.
2. Launch the frontend to validate the customer experience.
3. Open the dashboard to manage categories/products and verify data flow.

Each project offers linting and build scripts via the respective package managers (`yarn lint`, `yarn build`, etc.). Consult the project-level `package.json` files for the full command set.

## Troubleshooting

- **API not reachable:** Confirm the backend is running on the port expected by the frontend/dashboard and that CORS allows your origin. 【F:backend-qrcode-menu/src/main.ts†L1-L17】
- **Database connection errors:** Ensure Docker containers are running and the `DATABASE_URL`/`MONGODB_URI` values point to the correct host/port.

## License

The projects currently do not declare an open-source license; treat the code as proprietary unless otherwise specified. 【F:backend-qrcode-menu/package.json†L1-L44】
