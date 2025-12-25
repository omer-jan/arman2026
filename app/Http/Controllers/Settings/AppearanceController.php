<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppearanceController extends Controller
{
    /**
     * Show the appearance settings page.
     */
    public function edit()
    {
        return Inertia::render('settings/Appearance');
    }

    /**
     * Update the authenticated user's appearance preferences.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'primary_color' => ['required', 'string', 'in:neutral,stone,zinc,slate,indigo,cyan,emerald,rose,violet,yellow,red,lime,green,blue,purple,pink,orange'],
            'theme_mode' => ['required', 'string', 'in:light,dark,system'],
        ]);

        $user->forceFill([
            'primary_color' => $validated['primary_color'],
            'theme_mode' => $validated['theme_mode'],
        ])->save();

        // Optionally reflect mode via cookie for middleware compatibility
        cookie()->queue(cookie('appearance', $validated['theme_mode'], 60 * 24 * 365));

        return back()->with('status', 'appearance-updated');
    }
}
