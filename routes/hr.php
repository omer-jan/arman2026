<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/hr/positions', fn() => Inertia::render('hr/Positions'))->name('hr.positions');
    Route::get('/hr/departments', fn() => Inertia::render('hr/Positions'))->name('hr.departments');
    Route::get('/hr/users', fn() => Inertia::render('hr/Positions'))->name('hr.users');
    Route::get('/hr/payroll', fn() => Inertia::render('hr/Positions'))->name('hr.payroll');
    Route::get('/hr/leaves', fn() => Inertia::render('hr/Positions'))->name('hr.leaves');

    Route::get('/hr/reports/salary', fn() => Inertia::render('hr/reports/LeaveReport'))
        ->name('hr.reports.salary');
    Route::get('/hr/reports/leave', fn() => Inertia::render('hr/reports/LeaveReport'))
        ->name('hr.reports.leave');
});
