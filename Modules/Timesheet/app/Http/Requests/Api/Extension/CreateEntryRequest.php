<?php

namespace Modules\Timesheet\Http\Requests\Api\Extension;

use Illuminate\Foundation\Http\FormRequest;

class CreateEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'service_id' => ['required', 'uuid', 'exists:timesheet_services,id'],
            'duration_hours' => ['required', 'numeric', 'min:0.01', 'max:24'],
            'date' => ['required', 'date', 'before_or_equal:today'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'service_id.required' => 'Please select a service.',
            'service_id.exists' => 'The selected service is invalid.',
            'duration_hours.required' => 'Please enter a duration.',
            'duration_hours.min' => 'Duration must be at least 0.01 hours (36 seconds).',
            'duration_hours.max' => 'Duration cannot exceed 24 hours.',
            'date.required' => 'Please select a date.',
            'date.before_or_equal' => 'Date cannot be in the future.',
        ];
    }
}