<?php

namespace App\Http\Requests\Department;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DepartmentUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'title_ps' => $this->input('title_ps') ?: $this->input('title_prs'),
        ]);
    }

    public function rules(): array
    {
        $departmentId = (int) $this->route('department')->id;

        return [
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('departments', 'code')->ignore($departmentId),
            ],
            'title_en' => [
                'required',
                'string',
                'max:255',
                Rule::unique('departments', 'title_en')->ignore($departmentId),
            ],
            'title_prs' => [
                'required',
                'string',
                'max:255',
                Rule::unique('departments', 'title_prs')->ignore($departmentId),
            ],
            'title_ps' => ['nullable', 'string', 'max:255'],
            'manager_id' => ['nullable', 'integer', 'exists:users,id'],
            'status' => ['required', Rule::in(['active', 'deactive'])],
        ];
    }
}
