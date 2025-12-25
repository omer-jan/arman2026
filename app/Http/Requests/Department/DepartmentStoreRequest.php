<?php

namespace App\Http\Requests\Department;

use Illuminate\Foundation\Http\FormRequest;

class DepartmentStoreRequest extends FormRequest
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
        return [
            'code' => ['required', 'string', 'max:50', 'unique:departments,code'],
            'title_en' => ['required', 'string', 'max:255', 'unique:departments,title_en'],
            'title_prs' => ['required', 'string', 'max:255', 'unique:departments,title_prs'],
            'title_ps' => ['nullable', 'string', 'max:255'],
            'manager_id' => ['nullable', 'integer', 'exists:users,id'],
            'status' => ['prohibited'],
        ];
    }
}
