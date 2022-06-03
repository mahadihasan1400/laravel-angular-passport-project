<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Validator;

class RegisterController extends Controller
{
    /**
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(Request $request){


        $validation = Validator::make ($request->all(),[
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',

        ]);

        if($validation->fails()){
            return response()->json($validation->errors(),202);

        }else{
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return response(['message' => 'User Successfully Register.'], 200);
        }


    }
}
