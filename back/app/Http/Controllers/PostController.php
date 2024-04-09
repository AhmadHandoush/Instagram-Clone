<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct()
    {
     $this->middleware('isUser');

    }
   public function add_post(Request $req){
    $req->validate([
        'caption' => 'required|string|max:255',
    ]);
    $post =new Post();
    $post->caption=$req->caption;
    $post->user_id = Auth::id();
    $post->save();
    return response()->json(['message' => 'Post created successfully'], 201);


   }
}
