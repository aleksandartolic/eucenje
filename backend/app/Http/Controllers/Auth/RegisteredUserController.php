<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'min:8', 'max:24'],
            'username' => ['required', 'string', 'max:20', 'unique:users'],
            'role' => ['required', 'integer', 'min:1', 'max:3'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'api_token' => Str::random(60),
            'role' => $request->role,
        ]);

        return response()->json(['success' => true, 'user' => $user]);
    }

    public function getUser(Request $request)
    {
        try {
            $user = User::findOrFail($request->uid);
            return response()->json(['success' => true, 'user' => $user]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'user' => 'Unable to get user.']);
        }
    }
}
