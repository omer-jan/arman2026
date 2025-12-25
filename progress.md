# Appearance refactor progress (Dec 20, 2025)

## What I implemented
- DB-backed preferences: Added migration `2025_12_20_000000_add_appearance_preferences_to_users_table.php` with `primary_color` (default 'slate') and `theme_mode` (default 'system').
- Model update: Included `primary_color` and `theme_mode` in `App/Models/User.php` fillable.
- Backend routes + controller: Added `Settings/AppearanceController` with `edit` + `update`; wired GET/PATCH routes in `routes/settings.php`.
- Inertia shared props: `HandleInertiaRequests@share` now provides `appearance: { mode, primaryColor }` sourced from the authenticated user (fallbacks applied).
- Centralized client application: Extended `useAppearance.ts` with `applyServerPreferences()` to apply server values (and persist to localStorage) and added `primarySoft` token.
- CSS tokens: Exposed `--color-primary-soft: var(--primary-soft)` in `resources/css/app.css` while keeping base semantic tokens stable for layout.
- App bootstrap: In `resources/js/app.ts`, server preferences are applied before mount to avoid flash, then `initializeTheme()` maintains system sync.
- UI persistence: In `resources/js/pages/settings/Appearance.vue`, added an Inertia `useForm` and watchers that PATCH the server when `primaryColor` or `appearance` change, while still updating immediately via the composable.

## Alignment with shadcn-vue rules
- Primary used strictly as an accent (`--primary`, `--primary-foreground`, `--primary-soft`, `--ring`).
- Layout surfaces (topbar, sidebar, cards, page background) continue to use base surface tokens (`--background`, `--foreground`, `--muted`, `--border`).
- Contrast safety: Foreground tokens are chosen per palette; base surfaces maintain readable text in both light/dark modes.

## Remaining tasks
1) Review all layout components to ensure no `bg-primary` on structural surfaces; replace with surface tokens where needed.
2) Add optional debounce to PATCH requests for reduced chatter under rapid changes.
3) Provide small preview area in Appearance settings that showcases soft/solid/ring usage.
4) Remove any lingering `debugger` statements in `useAppearance.ts` and ensure no accidental primary usage on layout backgrounds.
5) Consider adding a lightweight contrast utility for dynamic user-defined colors (if we expand beyond curated swatches).

## How to continue
- Start by auditing `resources/js/layouts` and sidebar/topbar components for surface token usage.
- If you want a save button instead of auto-save, switch the watchers to update the form state and add a single `form.patch(update().url)` on submit.
