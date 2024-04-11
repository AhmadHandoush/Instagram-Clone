<?php

namespace App\Http\Controllers;

use App\Models\User;
use Faker\Core\File;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function get_user($id){
        // $user=User::findOrFail($id);
        $user = User::where('id', $id)->first();
        return response()->json($user);


    }
    public function update_user(Request $request, $id){
        $user=User::findOrFail($id);
        if ($request->hasFile('profile_image')) {
            $file = $request->file('profile_image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('/profile_pictures/'), $filename);
        }
        if (File::exists(public_path('/profile_picutes') . $user->picture)) {
            File::delete((public_path('/profile_picutes') . $user->picture));
        }
        $request->validate([
            'name' => 'string|max:255',

        ]);

        $user->update($request->all());
        return response()->json($user);

    }
}
