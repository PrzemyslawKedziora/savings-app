<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
use App\Models\User;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Record::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userId = 5; //temp
    
        $validatedData = $request->validate([
            'type' => 'required|in:receipt,expense',
            'category' => 'required|string',
            'moneySpentInPLN' => 'required|numeric',
            'description' => 'string'
        ]);
        $validatedData['userID'] = $userId;
    
        $record = Record::create($validatedData);
    
        return response()->json(['message' => 'Record created successfully', 'record' => $record], 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($userID)
    {
        $user = User::find($userID);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $records = $user->records;
        if ($records->isEmpty()) {
            return response()->json(['message' => 'No records found for the user'], 404);
        }
        return response()->json(['records' => $records], 200);
    }

    public function showDetails($id)
    {
        $record = Record::find($id);
        if ($record->isEmpty()) {
            return response()->json(['message' => 'Record not found'], 404);
        }
        return response()->json(['record' => $record], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $record = Record::find($id);
        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }
        $validatedData = $request->validate([
            'type' => 'in:receipt,expense',
            'category' => 'string',
            'moneySpentInPLN' => 'numeric',
            'description' => 'nullable|string',
        ]);
        $record->update($validatedData);
        return response()->json(['message' => 'Record updated successfully', 'record' => $record], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $record = Record::find($id);
        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }
        $record->delete();
        return response()->json(['message' => 'Record deleted successfully'], 200);
    }
}
