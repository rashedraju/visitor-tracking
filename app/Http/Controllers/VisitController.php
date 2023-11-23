<?php

namespace App\Http\Controllers;

use App\Http\Requests\VisitRequest;
use App\Models\Visitor;
use App\Models\Visits;

class VisitController extends Controller
{
    public function store(VisitRequest $request)
    {
        $data = $request->validated();
        $visitor = Visitor::where('_visit_id', $data['_visit_id'])->first();


        if($visitor){
            $data['visitor_id'] = $visitor->id;
            unset($data['_visit_id']);

            Visits::create($data);
        }
    }
}
