<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($user_id)
    {
        $user = User::find($user_id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $monthlySum = $user->records()
        ->selectRaw('DATE_FORMAT(updated_at, "%Y-%m") as month, SUM(money_spent) as total_sum')
        ->where('type','expense')
        ->where('user_id',$user_id)
        ->groupBy('month')
        ->orderBy('month')
        ->get();
        $categorizedExpenses = $this->sumExpensesByCategory($user_id);

        return ['user'=> $user,'records'=>$user->records,'linearChartData' =>$monthlySum, 'pieChartData' => $categorizedExpenses];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$userID)
    {
        $userId = User::find($userID);

        $validatedData = $request->validate([
            'type' => 'required|in:receipt,expense',
            'category' => 'required|string',
            'money_spent' => 'required|numeric',
            'currency' => 'required|string',
            'date' => 'required|string',
            'description' => 'string'
        ]);
        $validatedData['user_id'] = $userId;

        $record = Record::create($validatedData);

        return response()->json(['message' => 'Record created successfully', 'record' => $record], 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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
            'money_spent' => 'numeric',
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
    public function destroy($id, $userID)
    {
        $record = Record::find($id);
        $user = User::find($userID);
        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }
        if ($record->$user != $userID){
            return response()->json(['message'=> 'You cannot remove records that are not yours.'],419);
        }
        $record->delete();
        return response()->json(['message' => 'Record deleted successfully'], 200);
    }

    public function sumExpensesByCategory($userId)
    {
        $results = Record::where('type', 'expense')
            ->where('user_id', $userId)
            ->select('category', DB::raw('SUM(money_spent) as totalSpent'))
            ->groupBy('category')
            ->get();

        return $results;
    }

}
