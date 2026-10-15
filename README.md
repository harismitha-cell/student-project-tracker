# Student Project Tracker - Full-Stack SQLite Application

A full-stack student project tracking application built with vanilla HTML, CSS, JavaScript, Express 5, and Node.js embedded SQLite (`node:sqlite`).

---

## Overview

Student Project Tracker enables students to record, manage, and track progress on electronics and engineering project ideas with full CRUD (Create, Read, Update, Delete) capability. Data is persisted to an embedded SQLite database on the server.

### Features
- **Semantic & Accessible Interface**: Semantic HTML5 markup, ARIA live region for status announcements, accessible form labels, and keyboard navigation.
- **Responsive Styling**: Clean, modern layout styled with vanilla CSS, supporting mobile viewports down to 390px.
- **RESTful API**: Express-based backend exposing endpoints with input validation, error handling, and request payload safeguards.
- **Persistent Storage**: Server-side persistence using Node 22+ built-in `node:sqlite` (`DatabaseSync`) with parameterized queries and table constraints.
- **Full User Feedback States**: Visual and accessible feedback for loading, save, delete, validation errors, and button busy states to prevent duplicate submissions.

---

## Architecture Flow

```text
+-------------------------------------------------------------+
| Browser / Client                                            |
|                                                             |
|  [Form / UI Controls] ---> DOM Events (Submit / Edit / Del) |
|           ^                         |                       |
|           | Updates DOM             v                       |
|  [Render Engine] <----- fetch() JSON Promises               |
+-----------------------------|-------------------------------+
                              | HTTP (GET / POST / PUT / DELETE)
                              v
+-------------------------------------------------------------+
| Express Backend (app.js / server.js)                        |
|                                                             |
|  - Static File Middleware                                   |
|  - JSON Body Parser (10kb limit)                            |
|  - Input Validation (1-80 chars, valid status enum)         |
|  - Route Handlers (/api/health, /api/projects)              |
+-----------------------------|-------------------------------+
                              | Parameterized SQL
                              v
+-------------------------------------------------------------+
| Embedded Database (database.js)                             |
|                                                             |
|  - SQLite Database (`data/projects.db`) via `node:sqlite`    |
|  - Prepared Statements (INSERT, SELECT, UPDATE, DELETE)     |
+-------------------------------------------------------------+
```

---

## File Roles

| File | Role |
| :--- | :--- |
| `public/index.html` | Semantic structure, form inputs, status selection, action buttons, and accessible message regions. |
| `public/style.css` | Presentation, responsive grid/flexbox layout, accessible focus rings, and media queries. |
| `public/script.js` | Frontend logic, DOM interaction, async `fetch` store adapter, loading/error states, and busy management. |
| `server.js` | Server initialization, port configuration, and process startup. |
| `app.js` | Express application factory, route definitions, input validation, and HTTP error handling. |
| `database.js` | SQLite data access layer using `node:sqlite`, schema initialization, and prepared queries. |
| `test/crud.test.js` | Automated end-to-end integration test suite verifying health, CRUD, validation, persistence, and static serving. |

---

## API Endpoints

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check | 200 |
| `GET` | `/api/projects` | List all projects (ordered by ID descending) | 200 |
| `POST` | `/api/projects` | Create a new project | 201, 400 |
| `PUT` | `/api/projects/:id` | Update an existing project by ID | 200, 400, 404 |
| `DELETE`| `/api/projects/:id` | Delete a project by ID | 200, 400, 404 |

---

## Getting Started

### Prerequisites
- Node.js `v22.18.0` or higher (tested on Node.js 22/24 with built-in `node:sqlite`)
- PowerShell or command shell

### Installation
In the project directory, restore dependencies:
```powershell
npm.cmd ci
```
*(or `npm.cmd install`)*

### Starting the Server
```powershell
npm.cmd start
```
Open **http://localhost:3000** in your browser.

---

## Testing & Verification

Run the automated integration test suite:
```powershell
npm.cmd test
```

### Test Evidence
```text
> student-project-tracker@1.0.0 test
> node --test test/*.test.js

✔ CRUD, validation, persistence, API errors and static frontend
ℹ tests 1
ℹ suites 0
ℹ pass 1
ℹ fail 0
```

---

## Project Notes & Demo Limitations
- This application is designed as an educational, single-tenant local demo.
- No user authentication or multi-tenant database isolation is implemented.
- Database file (`data/projects.db`) and `node_modules` are ignored by Git via `.gitignore`.
