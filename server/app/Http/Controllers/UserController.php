<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            'token' => $jwtToken], 200);
        } else {
            return response()->json(['status' => false,
            'error' => 'Unauthorized'], 401);
        }
    }
}
