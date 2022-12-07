<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductLine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
            $allProductLine = DB::table('productLines')->get();
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
    public function create(Request $response)
    {
        $validator = Validator::make($response->all(),[
            'name'=>'required',
            'info'=>'required',
            'bath'=>'required',
            'idFactory'=>'required',
            
        ]);
        if($validator->fails()){
            return $this->sendError('Not validate',$validator->errors());
        }
        try{
            $productLine = new ProductLine();
            $productLine->productLineId = ProductLine::createId($response->idFactory,"123");
            $productLine->save();
            return $this->sendResponse($productLine,"thanh cong");
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