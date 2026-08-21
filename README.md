# Caravea Technical Assessment — Clients & Task Management System

## What's inside

- **Clients** — full CRUD. Index shows a data table with a task count per client; the detail page lists that client's tasks and supports inline editing.
- **Tasks** — full CRUD. Each task has a title, optional description, a **status** (`pending` / `in_progress` / `completed`), and an optional **client** to track who this task is for. The detail page supports inline editing.

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


## Why it's built this way

- **Inertia monolith.** Server-side routing and controllers stay in Laravel. React renders the pages and receives data as props. Monolith let's me get straight to coding the features instead of spending time scaffolding and generating boilerplate code to connect backend and frontend (also matches with your company's architecture which is also monolith).
- **Thin controllers, a small service layer.** Controllers handle transport (validation, binding, rendering, redirects). Business logic (reusable or not) lives in `App\Services`, this keeps controllers clean and maintainable.
- **Form Requests for validation.** `StoreTaskRequest` / `UpdateTaskRequest` (and the client equivalents) validate at the boundary before the controller runs. Purpose is to abstract validation logic (especially if it's verbose/long), further making controllers slim.
- **An enum for task status.** `TaskStatusEnum` is the single source of truth for statuses and their labels. This avoids unecessary hardcoded values making the backend overall more maintainable.
- **Deliberate query loading.** Lists eager-load only what a column needs — `with('client')` for the tasks table, `withCount('tasks')` for the clients table (a count subquery, not the rows). Detail pages use `load(...)` to load the necessary data for showing a resource.
- **Shared, reusable frontend components.** Cross-cutting UI (`data-table`, `status-badge`, `confirm-delete-dialog`, `back-button`) lives in `resources/js/components` so pages stay declarative and each module only defines its own table `columns`.

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

## AI usage

- **Tools:** Claude Code (Opus 4.8 medium effort).
- **How I used it:** Basically on all scenarios, scaffolded some basic pages like `app-layout.tsx` and `Index.tsx` to start displaying the UI and data. I mainly used AI to write whole features but I always validate it if it's up to my liking in terms of architecture and implementation. As always, I use AI to debug both frontend (web console errors, broken UI flow etc...) and backend (syntax error, namespace errors because of refactoring, etc...). AI wrote all of the tests for me combined with factories so I can focus on running those tests every other commits to keep up with QA.
- **Roughly how much was AI vs me:** AI generated 60% of the code while the remaining is mine. Most of the code is on the frontend to which AI really helped me in inertia pages (Index, Show, and Create) and shared components (data-table, back-button, status-badge). The components under ui are from mine, I added it via shadcn console commands. I generated most of the backend files (controller, model, migration, seeder, request, etc...) by artisan commands. I then provided some basic code like Client::all() and return redirect with flash success to set the base so AI can reference to my structure/architecture.
- **One thing the AI got wrong that I had to fix:** Even though I already added MCP for Shadcn, it still got the toast component wrong by adding sonner (it was sonner before but the most recent docs as I'm writing this reverted back to Toast component). Same thing with data-table, I had to follow the most recent implementation of tanstack which is v9 and (though AI really helped me big time in making this a shared component). Even though I wrote TaskStatusEnum, AI still hardcoded the status in form requests, tests, services, and options so I fixed it myself by using the Enum I made.
- **How I check AI output before shipping:** I run `composer ci:check` (ESLint, Prettier, `tsc`, Pest) to make the overall formatting of files consistent. I open the diff to see what changes were made, why and how is it different from the previous one, and click through the affected pages locally to test the features implemented.
