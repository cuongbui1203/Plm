<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    //

    public function index(){
        try{
            return $this->sendResponse(Product::get(),"thanh cong lay het san pham");
        }catch(Exception $e){
            return $this->sendError("error",$e);
        }
    }
    public function getId($id){
        try{
            $p = Product::where('productId','=',$id)->get();
            // if($p)
            return $this->sendResponse($p,"thanh cong lay het san pham");
            // else {
            //     return "null";
            // }
        }catch(Exception $e){
            return $this->sendError("error",$e);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // $n = $request->num;

        $validator =  Validator::make($request->all(),[
            'idProductLine'=>'required',
            'name'=>'required',
            'num'=>'required',
            'idStatus'=>'required',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator->errors());
        }
        $name = $request->name;

        $idStatus = $request->idStatus;
        $id = Product::createId($request->idProductLine,$request->num);
        // $id = 1233;
        try{
            $product = new Product();
            $product->productId = $id;
            $product->name = $name;
            $product->idStatus = $idStatus;
            $product->idProductLine=1;
            $product->history = "";
            $product->save();
            return $this->sendResponse($product,"thanh cong");
        } catch(Exception $e){
            return $this->sendError("error",$e);
        }
    }

}