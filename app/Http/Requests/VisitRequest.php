<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VisitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            '_visit_id' => 'required|string',
            'session_id' => 'required|string',
            'ip_address' => 'required|ip',
            'user_agent' => 'required|string',
            'page_path' => 'required|string',
        ];
    }
}
