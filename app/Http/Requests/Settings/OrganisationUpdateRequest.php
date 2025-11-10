<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrganisationUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();

        if (!$user || !$user->last_organisation_id) {
            return false;
        }

        // Only allow if user is directly in the organisation (not customer users)
        return $user->organisations()->where('organisations.id', $user->last_organisation_id)->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,jpg,png,svg', 'max:2048'], // 2MB max
            'billing_email' => ['required', 'email', 'max:255'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'logo.image' => 'The logo must be an image file.',
            'logo.mimes' => 'The logo must be a file of type: jpeg, jpg, png, svg.',
            'logo.max' => 'The logo must not be larger than 2MB.',
        ];
    }
}
