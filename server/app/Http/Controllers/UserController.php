<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->accessToken;
            $jwtToken = $user->createToken('MyApp')->plainTextToken;
            return response()->json(
            ['status' => true,
            'token' => $jwtToken,
            'user' => $user], 200);
        } else {
            return response()->json(['status' => false,
            'error' => 'Unauthorized'], 401);
        }
    }

    public function register(Request $request){

        $request->validate([
            'name'=> 'required|string|min:4|max:16',
            'email'=> 'required|email|min:8|max:32',
            'password'=> 'required|string|min:8|max:16',
        ]);
        if (User::where('email', $request->email)->exists()){
            return response()->json(['message'=> "User with this email already exist!",'status'=>false],405);

        }if (User::where('name', $request->name)->exists()){
            return response()->json(['message'=> "User with this name already exist!",'status'=>false],405);
        }
        $hashedPassword = Hash::make($request->password);
        User::create([
           'name'=>$request->name,
           'email'=>$request->email,
           'password'=>$hashedPassword,
           'budgetLimit'=>0,
           'savingsGoal'=>0,
           'balance'=>0,
        ]);
        return response()->json(['message'=> "User has been succesfully signed up!",'status'=>true],201);
    }
}
