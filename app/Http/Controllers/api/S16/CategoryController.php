<?php

namespace App\Http\Controllers\api\S16;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json([
            'data' => $categories,
        ]);
    }
}
