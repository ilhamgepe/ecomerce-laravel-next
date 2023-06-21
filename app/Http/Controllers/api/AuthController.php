<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\auth\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $body =  $request->safe();
        if (Auth::attempt(['email' => $body->email, 'password' => $body->password])) {
            $user = User::where('email', $body->email)->firstOrFail();
            $token = $user->createToken($user->email . "_first Party")->plainTextToken;
            return response()->json([
                'token' => $token,
                'user' => $user
            ], Response::HTTP_OK);
        }
        return response()->json([
            'message' => 'Unauthorized'
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function register(RegisterRequest $request)
    {
        $body =  $request->safe();
        $user = User::create([
            'name' => $body->name,
            'email' => $body->email,
            'password' => Hash::make($body->password),
        ]);
        $token = $user->createToken($user->email . "_first Party")->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'lu kenapa logout kontol'
        ], Response::HTTP_OK);
    }
}
