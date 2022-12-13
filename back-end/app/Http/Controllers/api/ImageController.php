<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ImageController extends Controller
{
    //
    public function store(Request $request){
            
        $validator =  Validator::make($request->all(),[
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg',
        ]);
        
        if($validator->fails()){
            $this->sendError('error Validator',$validator->errors());
        }

        $image_path = $request->file('image')->store('public');

        $data = Image::create([
            'img' => $image_path,
        ]);

        return $this->sendResponse([$data], 'thanh cong',Response::HTTP_CREATED);
    }

    public function getImage($path){
        // return response($file, 200);
        return response()->download(Storage::disk('public')->path($path));
    }
}