<?php

namespace App\Http\Controllers;

use App\Http\Requests\Department\DepartmentStoreRequest;
use App\Http\Requests\Department\DepartmentUpdateRequest;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = collect($request->only(['code', 'title_en', 'title_prs', 'title_ps', 'status', 'sort', 'direction']))
            ->map(fn ($value) => is_string($value) ? trim($value) : $value)
            ->toArray();

        $sort = in_array($filters['sort'] ?? '', ['code', 'title_en', 'title_prs', 'title_ps', 'status', 'created_at'], true)
            ? $filters['sort']
            : 'created_at';

        $direction = in_array(strtolower($filters['direction'] ?? ''), ['asc', 'desc'], true)
            ? strtolower($filters['direction'])
            : 'desc';

        $filters['sort'] = $sort;
        $filters['direction'] = $direction;

        $departments = Department::query()
            ->when($filters['code'] ?? null, fn ($query, $value) => $query->where('code', 'like', "%{$value}%"))
            ->when($filters['title_en'] ?? null, fn ($query, $value) => $query->where('title_en', 'like', "%{$value}%"))
            ->when($filters['title_prs'] ?? null, fn ($query, $value) => $query->where('title_prs', 'like', "%{$value}%"))
            ->when($filters['title_ps'] ?? null, fn ($query, $value) => $query->where('title_ps', 'like', "%{$value}%"))
            ->when($filters['status'] ?? null, fn ($query, $value) => $query->where('status', $value))
            ->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('departments/Index', [
            'filters' => $filters,
            'departments' => DepartmentResource::collection($departments),
            'departmentOptions' => Department::orderBy('title_en')
                ->get(['id', 'title_en', 'title_prs', 'title_ps', 'code', 'status'])
                ->map(function (Department $department): array {
                    return [
                        'id' => $department->id,
                        'code' => $department->code,
                        'title_en' => $department->title_en,
                        'title_prs' => $department->title_prs,
                        'title_ps' => $department->title_ps,
                        'status' => $department->status,
                    ];
                }),
        ]);
    }

    public function store(DepartmentStoreRequest $request): RedirectResponse
    {
        Department::create($request->validated());

        return redirect()
            ->route('departments.index')
            ->with('success', 'Department created successfully.');
    }

    public function update(DepartmentUpdateRequest $request, Department $department): RedirectResponse
    {
        $department->update($request->validated());

        return redirect()
            ->route('departments.index')
            ->with('success', 'Department updated successfully.');
    }

    public function destroy(Department $department): RedirectResponse
    {
        $department->delete();

        return redirect()
            ->route('departments.index')
            ->with('success', 'Department deleted successfully.');
    }
}
