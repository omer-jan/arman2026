<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class LanguageController extends Controller
{
    public function switch(Request $request)
    {
        $request->validate([
            'locale' => 'required|in:en,prs,ps',
        ]);

        $locale = $request->locale;

        // 1. Save in session (for all users)
        session(['locale' => $locale]);

        // 2. Save in database (if logged in)
        if (Auth::check()) {
            Auth::user()->update(['locale' => $locale]);
        }
        return back(); // Inertia-friendly
    }
}
