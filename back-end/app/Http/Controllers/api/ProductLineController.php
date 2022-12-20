<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product\ProductLine;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Nette\Utils\Image;
use TheSeer\Tokenizer\Exception;

class ProductLineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // return $this->sendResponse('test',"test");
        try{
            $allProductLine = DB::table('productLines')
                                ->join('images','productLines.imgId','=','images.id')
                                ->select('productLines.*',DB::raw('images.id as imgId'))
                                ->get();
        return $this->sendResponse($allProductLine,/*"lay list{count($allProductLine)} cac dong san pham"*/count($allProductLine));
        }catch(Exception $e){
            return $this->sendError('Error',$e);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'info'=>'required',
            'bath'=>'required',
            'idFactory'=>'required',
            'img'=>'image|mimes:jpg,png,jpeg,gif,svg'
        ]);
        if($validator->fails()){
            return $this->sendError('Not validate',$validator->errors());
        }
        try{
            $productLine = new ProductLine();
            $productLine->productLineId = ProductLine::createId($request->idFactory,"123");
            if($request->file('image') != null){
                $image_path = $request->file('image')->store('public');
                $image = Image::create([
                    'img' => $image_path
                ]);
                $productLine['imageId'] = $image->id;
            } else {
                $productLine['imageId'] = null;
    
            }
            $productLine->save();
            return $this->sendResponse($productLine,"thanh cong",Response::HTTP_CREATED);
        } catch(Exception $e){
            return $this->sendError('error',$e);
        }
    }
    /**
     * get productLine by id
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getId(string $id)
    {
        # code...
        try{
            return $this->sendResponse(DB::table('productLines')->where('productLineId','=',$id)->get(),
                                        "thanh cong");
        }catch(Exception $e){
            return $this->sendError('error',$e);
        }
    }
}