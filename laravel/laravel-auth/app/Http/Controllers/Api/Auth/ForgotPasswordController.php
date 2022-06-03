<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Validator;

class ForgotPasswordController extends Controller
{
    public function forgot(Request $request){
       /*
        $this->validate($request,[
            'email' => 'required|email'
        ]);
            */
        $validation = Validator::make ($request->all(),[
            'email' => 'required|email'
        ]);

        if($validation->fails()){
            return response()->json($validation->errors(),202);

        }

        $email = $request->email;

        if(User::where('email', $email)->doesntExist()){
            return response(['message'=>'Email Does not exists.'], 200);
        }
        $token = Str::random(10);

        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => now()->addHours(6)
        ]);

        // Send Mail
        Mail::send('mail.password_reset', ['token'=>$token], function ($message) use($email){
            $message->to($email);
            $message->subject('Reset Your Password');
        });

        return response(['message' => 'Check your email.'], 200);
    }

    public function reset(Request $request){


        $validation = Validator::make ($request->all(),[
            'token' => 'required|string',
            'password' => 'required|string|confirmed',
        ]);

        if($validation->fails()){
            return response()->json($validation->errors(),202);

        }


        $token = $request->token;
        $passwordRest = DB::table('password_resets')->where('token', $token)->first();

        // Verify
        if(!$passwordRest){
            return response(['message' => 'Token Not Found.'], 200);
        }

        // Validate exipire time
        if(!$passwordRest->created_at >= now()){
            return response(['message' => 'Token has expired.'], 200);
        }

        $user = User::where('email', $passwordRest->email)->first();

        if(!$user){
            return response(['message' => 'User does not exists.'], 200);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_resets')->where('token', $token)->delete();;

        return response(['message'=>'Password Successfully Updated.'], 200);
    }
}
