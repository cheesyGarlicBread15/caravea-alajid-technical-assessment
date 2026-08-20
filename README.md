# Caravea Technical Assessment — Clients & Task Management System

A small full-stack CRUD app for managing **Clients** and **Tasks**, where a task can either belong to a client or not.

---

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 (PHP 8.3) |
| Frontend | React 19 + TypeScript, via Inertia.js v3 |
| UI | Tailwind CSS v4 + shadcn/ui |
| Routing | Laravel Wayfinder |
| Database | PostgreSQL |

---

## Requirements

- PHP **8.3+**
- Composer
- Node **20+** and npm
- The **`pdo_pgsql`** extension enabled (required for PostgreSQL). Check with:

  ```bash
  php -m
  ```

  If **pdo_pgsql** is not listed, open your `php.ini` and uncomment the line `;extension=pdo_pgsql` (remove the semicolon `;`).

---

## Setup in your computer

```bash
git clone https://github.com/cheesyGarlicBread15/caravea-alajid-technical-assessment.git
cd caravea-alajid-technical-assessment

# installs laravel and react dependencies, copies .env, and generates key
composer setup
```

Set your database credentials in `.env`:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=caravea-technical-assessment
DB_USERNAME=<<YOURCREDENTIALSHERE>>
DB_PASSWORD=<<YOURCREDENTIALSHERE>>
```

Then run migration, seeder, and start the app:

```bash
# create tables and seed demo clients + tasks
php artisan migrate:fresh --seed

# run the app (Laravel server + React Vite)
composer dev
```

Then open the localhost URL (default: `http://127.0.0.1:8000` or `http://localhost:8000`).

---

## What's inside

- **Clients** — full CRUD. Index shows a data table with a task count per client; the detail page lists that client's tasks and supports inline editing.
- **Tasks** — full CRUD. Each task has a title, optional description, a **status** (`pending` / `in_progress` / `completed`, backed by a PHP enum), and an optional **client**. The detail page supports inline editing.
- **UX niceties** — shadcn data tables with clickable rows, confirm-before-delete dialogs, flash-message toasts, a searchable client combobox, and a status `Select`.

---

## Why it's built this way

- **Inertia monolith, not a REST API + separate SPA.** Server-side routing and controllers stay in Laravel; React renders the pages and receives data as props via `Inertia::render(...)`. One codebase, one deploy, no API versioning or client-side data-fetching layer to maintain — matching Caravea's architecture.
- **Thin controllers, a small service layer.** Controllers handle transport (validation, binding, rendering, redirects). Reusable read logic (client/status option lists) lives in `App\Services`, so it isn't duplicated across `create` and `show`.
- **Form Requests for validation.** `StoreTaskRequest` / `UpdateTaskRequest` (and the client equivalents) validate at the boundary before the controller runs, keeping rules out of the controller body.
- **An enum for task status.** `TaskStatusEnum` is the single source of truth for statuses and their labels — used by the backend option list and mirrored in the typed frontend.
- **Deliberate query loading.** Lists eager-load only what a column needs — `with('client')` for the tasks table, `withCount('tasks')` for the clients table (a count subquery, not the rows). Detail pages use `load(...)` because route-model binding has already fetched the model. A secondary `latest('id')` ordering keeps lists stable when seeded rows share a timestamp.
- **Shared, reusable frontend components.** Cross-cutting UI (`data-table`, `status-badge`, `confirm-delete-dialog`, `back-button`, the flash toast) lives in `resources/js/components` so pages stay declarative and each module only defines its own table `columns`.

---

## Project structure (highlights)

```
app/
  Http/Controllers/   ClientController, TaskController (resource controllers)
  Http/Requests/      Store/Update Form Requests
  Services/           ClientService, TaskService (reusable read logic)
  Enums/Task/         TaskStatusEnum
  Models/             Client, Task
database/
  migrations/  factories/  seeders/
resources/js/
  pages/clients/  pages/tasks/   Inertia page components (+ per-page table columns)
  components/                     shared UI (data-table, status-badge, toast, etc.)
  layouts/app-layout.tsx          sidebar shell + flash -> toast bridge
```

---

## Testing & quality

```bash
composer test        # config clear + eslint + tsc + pest
composer ci:check    # the above plus prettier + lint checks (what CI runs)
```

Individual tools:

```bash
php artisan test          # Pest
vendor/bin/pint           # format PHP
npm run lint              # ESLint (autofix)
npm run types:check       # tsc --noEmit
```

---

## AI usage

> The assessment asks for this explicitly. The notes below are accurate to how this project was built — **review and rewrite them in your own words before submitting.**

- **Tools:** Claude Code (Claude Opus).
- **How I used it:** scaffolding the Inertia pages and controllers, refactoring toward the service / Form-Request structure, wiring up the shadcn components (data table, dialogs, toast, select/combobox), and debugging TypeScript/lint issues. I drove the design decisions and reviewed every change.
- **Roughly how much was AI vs me:** _(fill in your honest estimate, e.g. "~X% AI-generated, refined and directed by me")._
- **One thing the AI got wrong that I had to fix:** _(pick the real one you want to talk about — e.g. it first reached for Sonner + `next-themes` for the toast when the project already had a base-ui `toast.tsx`; or the base-ui `Button` needed `nativeButton={false}` when rendered as a link; or list ordering jumped after an edit because all seeded rows shared a `created_at`, which I fixed with a `latest('id')` tiebreaker)._
- **How I check AI output before shipping:** run `composer ci:check` (ESLint, Prettier, `tsc`, Pest), read the diff, and click through the affected pages locally.
