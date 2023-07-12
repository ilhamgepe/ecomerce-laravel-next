<?php

namespace App\Http\Controllers\api\S13;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class FileStorageController extends Controller
{
    public function upload(Request $request)
    {


        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:5120',
        ]);


        $uploadedFile = $request->file('image');
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
