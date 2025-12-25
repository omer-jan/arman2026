HR Module – Departments & Positions (CRUD Only)

You are a senior enterprise full-stack engineer and UX/UI designer.
You are building an HR Module for Arman Ice Cream Production Company.

Focus ONLY on Departments and Positions.
No employees, no security, no permissions in this phase.

🧱 Tech Stack

Backend: Laravel 12

Frontend: Inertia.js + Vue 3 + TypeScript

Styling: Tailwind CSS + shadcn-vue + reka-ui

Build Tool: Vite

Database: MySQL

Architecture: Clean, scalable, enterprise-ready

Security: ❌ Not a focus for now

🗄️ Database Structure (FINAL & STRICT)
✅ Departments Table
departments
- id
- code                (required, unique)
- title_en            (required, unique)
- title_prs           (required, unique)
- title_ps            (nullable → if empty, assign title_prs automatically)
- manager_id          (nullable, future use)
- status              (active | deactive, default = active)
- created_by
- created_at
- updated_by
- updated_at
- deleted_at          (soft delete)
- deleted_by


Rules:

code is mandatory and globally unique (e.g. IT, HR)

title_ps must be auto-filled from title_prs if user leaves it empty

status is active by default on insert (not provided by user)

User can change status only during update

✅ Positions Table
positions
- id
- department_id
- code                (required, unique per department)
- title_en            (required, unique)
- title_prs           (required, unique)
- title_ps            (nullable → if empty, assign title_prs automatically)
- expected_employees  (nullable)
- availability_status (nullable)
- status              (active | deactive, default = active)
- created_by
- created_at
- updated_by
- updated_at
- deleted_at          (soft delete)
- deleted_by


Rules:

Position code uniqueness rule:

UNIQUE(department_id, code)


title_ps auto-assign logic same as departments

status default = active on insert

🌍 Multilingual Strategy (VERY IMPORTANT)
Backend Rules

Backend must always return all translations:

title_en

title_prs

title_ps

Never hide or filter translation fields in API responses.

Frontend Rules

Frontend decides which title(s) to display based on user preference.

User may choose:

en

prs

ps

en + prs

If user selects en + prs, both titles must be shown everywhere.

This applies to:

Tables

Dropdowns

Detail views

Search results

⬇️ Dropdown Handling (STRICT)

Dropdowns for Departments and Positions must:

Use ID internally

Display localized title(s) based on user preference

Receive full dataset from backend:

id, title_en, title_prs, title_ps


This is acceptable and professional for internal enterprise systems.
Do NOT restrict or optimize dropdown payloads at this stage.

🔧 Functional Scope (Phase 1 – CRUD Only)
1️⃣ Department Module

Create department

Update department

Soft delete department

List departments

Search by:

code

title_en

title_prs

title_ps

2️⃣ Position Module

Create position

Update position

Soft delete position

List positions

Filter/search by:

department

code

title_en

title_prs

title_ps

🧠 UX / UI Rules (Professional ERP Style)
Index Page (Departments & Positions)
🔍 Search & Filter Card

Each page must include:

Search fields

Search button

Clear search button

➕ Action Buttons

Add New button

Download / Export button (UI only, no logic)

Place buttons in a professional, intuitive location
(right-aligned or header actions)

📋 Data Table

Use server-side Vue data table

Features:

Pagination

Sorting

Searching (controlled from search card)

Columns:

Code

Localized title(s)

Department (for positions)

Status

Actions:

View details

Edit

Delete

🧱 Backend Design Rules

Use:

Resource Controllers

Form Request validation

API Resources (Transformers)

Controllers must be thin

Code must be ready for:

Future security

Role-based access

Large datasets

🧑‍🎨 UI Expectations

Clean

Minimal

Professional (ERP-style)

No fancy animations

Clear spacing

Accessible form layout

Consistent buttons and icons

Frontend Translation Setup

Install required frontend translation packages

Language codes:

en = English

prs = Persian (Dari)

ps = Pashto

UI labels change based on selected language

Ignore LTR / RTL handling for now

🔄 Data Flow

Backend returns full department / position objects

Frontend:

Stores data centrally

Handles title display logic

Handles filtering & searching

CRUD via Inertia actions

UI feedback:

Loading states

Empty states

Validation messages

🚫 Out of Scope (For Now)

Authentication

Authorization

Permissions

Audit logs

Performance optimization

Security hardening

✅ Final Goal

Deliver a clean, professional, enterprise-ready CRUD system for:

Departments

Positions

With:

Best UX / UI

Correct multilingual handling

Clean Laravel + Vue architecture

Easy future expansion to Employees module