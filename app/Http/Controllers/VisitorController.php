<?php

namespace App\Http\Controllers;

use App\Http\Requests\VisitorRequest;
use App\Models\Visitor;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    public function store(VisitorRequest $request){
        $data = $request->validated();
        Visitor::create($data);
    }
}
