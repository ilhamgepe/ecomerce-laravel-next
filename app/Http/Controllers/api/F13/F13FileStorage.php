<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class F13FileStorage extends Controller
{
    public function upload(Request $request)
    {

        // dd($request->file('image'));

        if (!$request->hasFile('image')) {
            return response()->json([
                'nothingFound' => $request
            ], Response::HTTP_BAD_REQUEST);
        }

        $uploadedFile = $request->file('image');
        if ($uploadedFile->getSize() > 50 * 1024 * 1024) {
            return response()->json([
                'message' => 'File is too big'
            ], Response::HTTP_BAD_REQUEST);
        }
        $filename = str_replace(' ', '_', $uploadedFile->getClientOriginalName());
        $uploadedFile->storeAs('images', $filename);

        $imageUrl = Storage::url('images/' . $filename);

        return response()->json([
            'found' => $imageUrl
        ]);
    }



    public function babi()
    {
        return response()->json([
            'message' => 'Hello Anjing'
        ]);
    }
}
