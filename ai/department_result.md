## Overview
- Build Departments CRUD only using Laravel 12 + Inertia.js (Vue 3 + TS) with Tailwind, shadcn-vue, reka-ui, MySQL, Vite.
- No auth/permissions; focus on clean, scalable, enterprise-ready structure and multilingual presentation.

## Database Rules Summary
- Table: departments — fields: id, code (req, unique), title_en (req, unique), title_prs (req, unique), title_ps (nullable → default to title_prs if empty), manager_id (nullable), status (active|deactive, default active on insert, user can change only on update), created_by/updated_by/deleted_by, timestamps, soft deletes.
- Backend always returns title_en/title_prs/title_ps; never hide translations. Dropdown payloads carry id + all titles.

## Backend Steps (order)
1) Migration/model: ensure columns, unique constraints, soft deletes, status default active, fill title_ps when missing.
2) Requests: store/update Form Requests enforcing required/unique code/title_en/title_prs, nullable title_ps auto-filled, status only allowed on update, validate status enum.
3) Resource Controller: thin CRUD (index/list with filters, store, update, destroy soft delete), future-ready for security/RBAC.
4) Query & filters: server-side search by code/title_en/title_prs/title_ps; pagination + sorting; eager loading if needed for manager placeholder.
5) API Resource (Transformer): return full department object with all translation fields, status, ids, timestamps; no field hiding.
6) Routes: resource routes; ensure inertia responses return datasets for table and dropdowns.

## Frontend Steps (after backend)
1) Language setup: install/use i18n tooling; support language prefs en/prs/ps/en+prs for labels and title display.
2) State/data: central store for departments list, filters, pagination, sorting, dropdown dataset (id + all titles).
3) Pages: Departments index with search card (fields for code/title_en/title_prs/title_ps), Search and Clear actions; Add New and Download/Export (UI only) buttons aligned as header actions.
4) Table: server-driven data table wired to filters/pagination/sorting; columns Code, localized title(s) per user preference, Status, Actions (view/edit/delete); show loading/empty states.
5) Forms: create/update forms with validation messages; auto-fill title_ps from title_prs if left blank; status selectable only on update; Inertia actions with success/error feedback.
6) Dropdowns: use IDs internally; display localized title(s) based on preference; use full dataset from backend without trimming.

## UX/UI Notes
- Professional ERP style: clean, minimal, clear spacing, accessible forms, consistent buttons/icons, no fancy animations.
- Controls: right-aligned header actions; search card visible and straightforward; feedback for loading/empty/validation.

## Out-of-Scope Confirmation
- Authentication, authorization/permissions, audit logs, performance optimization, security hardening; no employees module work now.
