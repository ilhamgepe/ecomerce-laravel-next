<?php

namespace App\Http\Controllers\api\S16;

use App\Http\Controllers\Controller;
use App\Models\Category;
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
        return response()->json([
            'data' => 'Hello World'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function categories()
    {
        $categories = Category::all();
        return response()->json([
            'data' => $categories,
        ]);
    }

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
        $category = json_decode($request->get('category'));

        $uploadedFile = $request->file('postImage');
        $filename = str_replace(' ', '_', $uploadedFile->getClientOriginalName());
        $uploadedFile->storeAs('images/postImage', $filename);

        $imageUrl = Storage::url('images/postImage/' . $filename);

        return Response()->json([
            'data' => $imageUrl
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
