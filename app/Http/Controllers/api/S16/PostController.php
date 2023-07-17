<?php

namespace App\Http\Controllers\api\S16;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Carbon\Carbon;
use ErrorException;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post = Post::with('categories')->latest()->paginate(1);

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
            'category' => [
                'required',
                'json',
                function ($attribute, $value, $fail) {
                    $decodedValue = json_decode($value, true);
                    if (!is_array($decodedValue)) {
                        $fail($attribute . ' must be an array.');
                    } elseif (count($decodedValue) > 3) {
                        $fail($attribute . ' must not have more than 3.');
                    }
                }
            ],
        ]);
        $categories = json_decode($request->get('category'));

        $post = Post::create([
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            // kita isi memek dulu, baru kita replace dengan gamabr yg sebenarnya
            'image' => 'memek',
        ]);


        foreach ($categories as $category) {
            $categoryModel = Category::firstOrCreate(['name' => $category]);
            $post->categories()->attach($categoryModel);
        }
        // image handler
        $uploadedFile = $request->file('postImage');
        $filename = str_replace(' ', '_', $uploadedFile->getClientOriginalName());
        $uploadedFile->storeAs('images/postImage', $post->id . '_' .  $filename);

        $imageUrl = Storage::url('images/postImage/' . $post->id . '_' . $filename);
        $post->image = $imageUrl;
        $post->save();




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
        // Log::info('endpoint show post di akses : ' . Carbon::now());
        try {
            $post = Post::with('categories')->findOrFail($id);
        } catch (ModelNotFoundException $error) {
            return Response(["error" => "Post with id {$id} not found"], Response::HTTP_NOT_FOUND);
        }
        return Response()->json([
            'data' => $post
        ]);
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
        $request->validate([
            'title' => ['required', 'max:200', 'min:1'],
            'description' => ['required', 'min:10'],
            'postImage' => ['image', 'mimes:png,jpg,jpeg', 'max:5120'],
            'category' => [
                'required',
                'json',
                function ($attribute, $value, $fail) {
                    $decodedValue = json_decode($value, true);
                    if (!is_array($decodedValue)) {
                        $fail($attribute . ' must be an array.');
                    } elseif (count($decodedValue) > 3) {
                        $fail($attribute . ' must not have more than 3.');
                    }
                }
            ],
        ]);


        try {
            $post = Post::findOrFail($id);
            $post->title = $request->get('title');
            $post->description = $request->get('description');
            if ($request->hasFile('postImage')) {
                // hapus file nya dulu
                $fileUrl = $post->image;
                $filenameOld = basename($fileUrl);
                Storage::delete('/images/postImage/' . $filenameOld);

                // baru kita ganti
                $file = $request->file('postImage');
                $filename = str_replace(' ', '_', $file->getClientOriginalName());
                $file->storeAs('images/postImage',  $post->id . '_' . $filename);
                $post->image = Storage::url('images/postImage/' . $post->id . '_' . $filename);
            }
            $post->save();

            $categories = json_decode($request->get('category'));
            foreach ($categories as $category) {
                Category::firstOrCreate(['name' => $category]);
            }

            // hapus categy yang sebelumnya dan ganti dengan yang baru
            $post->categories()->detach();
            foreach ($categories as $category) {
                $categoryModel = Category::firstOrCreate(['name' => $category]);
                $post->categories()->attach($categoryModel);
            }
            return Response([
                'post' => Post::with('categories')->find($id)
            ]);
        } catch (ModelNotFoundException $error) {
            return Response(["error" => "Post with id {$id} not found"], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->delete();
            return Response([], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $error) {
            return Response(["error" => "Post with id {$id} not found"], Response::HTTP_NOT_FOUND);
        }
    }

    public function trashed()
    {
        $posts = Post::onlyTrashed()->latest()->paginate(1);
        return Response([
            'data' => $posts
        ], Response::HTTP_OK);
    }
    public function showTrashed($id)
    {
        try {
            $post = Post::with('categories')->onlyTrashed()->findOrFail($id);
            return Response([
                'data' => $post
            ], Response::HTTP_OK);
        } catch (ModelNotFoundException $th) {
            return Response([
                'error' => "Post with id {$id} not found",
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function restore(string $id)
    {
        try {
            $post = Post::onlyTrashed()->findOrFail($id)->restore();
            return Response([
                'data' => "Post with id {$id} restored"
            ], Response::HTTP_OK);
        } catch (ModelNotFoundException $th) {
            return Response([
                'error' => "Post with id {$id} not found",
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
