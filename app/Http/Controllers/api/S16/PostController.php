<?php

namespace App\Http\Controllers\api\S16;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post = Post::with('categories')->paginate(10);

        return response()->json([
            'data' => $post
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        $request->validate([
            'title' => ['required', 'max:200', 'min:1'],
            'description' => ['required', 'min:10'],
            'postImage' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:5120'],
            'category' => ['required']
        ]);
        $categories = json_decode($request->get('category'));

        $uploadedFile = $request->file('postImage');
        $filename = str_replace(' ', '_', $uploadedFile->getClientOriginalName());
        $uploadedFile->storeAs('images/postImage', $filename);

        $imageUrl = Storage::url('images/postImage/' . $filename);

        $post = Post::create([
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'image' => $imageUrl,
        ]);


        foreach ($categories as $category) {
            $categoryModel = Category::firstOrCreate(['name' => $category]);
            $post->categories()->attach($categoryModel);
        }



        $postWithCategory = Post::with('categories')->find($post->id);

        return Response()->json([
            'data' => $postWithCategory
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
