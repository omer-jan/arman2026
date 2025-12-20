# Appearance refactor progress (Dec 20, 2025)

## Current state observed
- Appearance settings page at resources/js/pages/settings/Appearance.vue uses local `useAppearance` composable; stores preferences only in localStorage/cookies; no DB persistence.
- `useAppearance.ts` manages primary palettes and applies tokens directly (including sidebar tokens) on the document root; uses localStorage defaults; still contains `debugger` statements.
- Base theme tokens are defined in resources/css/app.css; primary is currently also used for sidebar/layout tokens in dark mode; surfaces and accent tokens are mixed.
- Settings route for appearance currently returns Inertia view inline; no controller or persistence; middleware only shares `appearance` cookie.

## Gaps to address
- Need DB-backed user appearance prefs (at minimum `primary_color`, `theme_mode`), with defaults and model casts.
- Need Inertia-shared appearance props from backend; controller to edit/update preferences.
- Need a single apply-theme function that consumes server-provided prefs and applies CSS variables (surface vs accent separated); remove layout usage of primary.
- Need shadcn-vue token architecture: stable base surface tokens and accent-only primary tokens (solid/foreground/soft/ring); no primary backgrounds for layout (topbar/sidebar/cards/page bg).
- Need automatic contrast protection for buttons/nav/sidebar text in light/dark; avoid color-only signals.
- Appearance UI should persist via Inertia form, with safe swatch grid + live preview and immediate apply.

## Plan next moves
1) Add migration to `users` table for `primary_color` (string, default 'slate') and `theme_mode` (enum light/dark/system, default 'system'); consider nullable for fallback to defaults.
2) Update `User` model: fillable/casts/accessor for appearance prefs with defaults.
3) Create `Settings/AppearanceController` with `edit` (return page with prefs) and `update` (validate + persist); wire routes/settings.php to controller.
4) Update `HandleInertiaRequests` to share appearance prefs from authenticated user (fallback to defaults/system) for hydration.
5) Refactor `useAppearance`: accept initial prefs from Inertia, centralize `applyTheme` that sets CSS vars; remove `debugger`; ensure primary tokens do not set sidebar/layout backgrounds; keep surface tokens stable.
6) Update CSS variable layers in resources/css/app.css to separate base semantic tokens from primary accent tokens (solid/foreground/soft/ring); ensure sidebar/topbar/cards use surface tokens only; add hover/soft tokens.
7) Update Appearance.vue to use server values, submit via Inertia form, show swatch grid with safe palettes, and live-apply via composable.
8) Add contrast guard helper to ensure readable text on buttons/nav/sidebar (use `--primary-foreground` on accent surfaces; keep surface text on surfaces).
9) Audit layout components (AppLayout, sidebar) to replace any `bg-primary`/`text-primary-foreground` usage on structural surfaces with surface tokens.
10) Re-run initializeTheme to hydrate from shared props; ensure system changes re-apply preferences.

## Notes
- Keep shadcn rule: primary is accent only; layout surfaces use background/foreground/muted/border tokens.
- Swatch list should stay within shadcn palettes (slate/stone/zinc/indigo/etc.)
