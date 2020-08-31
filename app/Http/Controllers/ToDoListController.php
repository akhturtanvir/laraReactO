<?php

namespace App\Http\Controllers;

use App\Model\ToDoListModel;
use Illuminate\Http\Request;

class ToDoListController extends Controller
{

    public function index()
    {
        return response()->json(ToDoListModel::get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $response = ToDoListModel::create($input);

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\ToDoListModel  $toDoListModel
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(ToDoListModel::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\ToDoListModel  $toDoListModel
     * @return \Illuminate\Http\Response
     */
    public function edit(ToDoListModel $toDoListModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\ToDoListModel  $toDoListModel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $input = $request->all();
        
        $data = ToDoListModel::find($id);
        $response = $data->update($input);

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\ToDoListModel  $toDoListModel
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {   
        $data = ToDoListModel::find($id);

        $data->is_active = 'y';
        $response = $data->save();

        return response()->json($response);
    }
}
