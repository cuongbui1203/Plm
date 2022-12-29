<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Other\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ImageController extends Controller {

    public static function storeImage(Request $request){
        
        $image_path = $request->file('image')->store('public');

        $data = Image::create([
            'img' => $image_path,
            'created_at'=>$this->getTime(),
            'updated_at'=>$this->getTime()
        ]);
        return $data->id;
    }

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
            'created_at'=>$this->getTime(),
            'updated_at'=>$this->getTime()
        ]);

        return $this->sendResponse([$data], 'thanh cong',Response::HTTP_CREATED);
    }

    public function getImage($id){
        $fullPath = Image::where('id', '=', $id)->firstOrFail();
        $arr = explode("/", $fullPath->img);
        $store = $arr[0];
        $path = $arr[1];

        // return response($file, 200);
        // Log::alert($path);
        return response()->download(Storage::disk($store)->path($path));
        // return response()->json($arr);
    }
}