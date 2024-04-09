<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function get_user($id){
        // $user=User::findOrFail($id);
        $user = User::where('id', $id)->first();
        return response()->json($user);


    }
}
