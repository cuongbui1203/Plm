<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductLine;
use GuzzleHttp\Psr7\Response;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use TheSeer\Tokenizer\Exception;

class ProductLineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function create(Request $response)
    {
        $validator = Validator::make($response->all(),[
            'name'=>'required',
            'info'=>'required',
            'quantity'=>'required',
            'batch'=>'required',
            'idFactory'=>'required'
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
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductLine  $productLine
     * @return \Illuminate\Http\Response
     */
    public function show(ProductLine $productLine)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductLine  $productLine
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductLine $productLine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductLine  $productLine
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductLine $productLine)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductLine  $productLine
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductLine $productLine)
    {
        //
    }
}
