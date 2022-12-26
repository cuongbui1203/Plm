<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CreateID\create_id;
use App\Models\Product\Product;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    //

    public function index(){
        try{
            $res = DB::table('products')
                ->join('productLines', 'products.idProductLine', '=', 'productLines.productLineId')
                ->join('images','productLines.imgId','=','images.id')
                ->join('statuses','products.idStatus','=','statuses.id')
                ->select(
                    'products.productId',
                    'products.name',
                    DB::raw('productLines.productLineId as productLineId'),
                    DB::raw('productLines.name as productLine'),
                    DB::raw('productLines.info as info'),
                    'products.history',
                    'products.created_at',
                    'products.updated_at',
                    DB::raw('statuses.title as status'),
                    DB::raw('images.id as imgId')
                )
                ->get();
            return $this->sendResponse($res,"thanh cong lay het san pham");
        }catch(Exception $e){
            return $this->sendError("error",$e);
        }
    }
    public function getId($id){
        try{
            $p = Product::where('productId', '=', $id)
                ->join('productLines', 'products.idProductLine', '=', 'productLines.productLineId')
                ->join('images', 'productLines.imgId', '=', 'images.id')
                ->join('statuses', 'products.idStatus', '=', 'statuses.id')
                ->select(
                    'products.productId',
                    'products.name',
                    DB::raw('productLines.name as productLine'),
                    DB::raw('productLines.info as info'),
                    'products.history',
                    'products.created_at',
                    'products.updated_at',
                    DB::raw('statuses.title as status'),
                    DB::raw('images.id as imgId')
                )
                ->get();
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request){
        // $n = $request->num;

        $validator =  Validator::make($request->all(),[
            'idProductLine'=>'required',
            'name'=>'required',
            'num'=>'required|numeric',
            // 'batch'=>'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator->errors());
        }
        // if()
        $name = $request->name;

        $idStatus = $request->idStatus;
        // $id = Product::createId($request->idProductLine,$request->num);
        // $id = 1233;
        $res = [];
        try{
            for($i = 0;$i < (int)$request->num;$i++){
                $product = new Product();
                $product->productId = create_id::createIdProduct();
                $product->name = $name;
                $product->idStatus = 1;
                $product->idProductLine=$request->idProductLine;
                $product->history = $request->idProductLine;
              //  $product->created_at = date('Y-m-d H:i:s');
                $product->save();
                array_push($res,$product);
            }
            $arr = (Object)DB::table('productLines')->where('productLineId','=',$request->idProductLine)
                                                    ->select('quantity','updated_at')
                                                    ->get()[0];
            // $quantity = $quantity->quantity;
            $arr->quantity += (int)$request->num;
            $arr->updated_at = Carbon::now()->format('Y-m-d H:m:s');
            DB::table('productLines')->where('ProductLineId','=',$request->idProductLine)
                                     ->update([
                                        'quantity'=>$arr->quantity,
                                        'updated_at'=>$arr->updated_at
                                    ]);
            return $this->sendResponse($res,"Create products successfully");
        } catch(Exception $e){
            return $this->sendError("Create failed",$e);
        }
    }

    public function sendToShop(Request $request){
        $validate = Validator::make($request->all(), [
            'idShop' => 'required'
        ]);
    }
    public function update($id, Request $request)
    {
        $validator =  Validator::make($request->all(),[
            'idProductLine'=>'required',
            'name'=>'required',
            'num'=>'required|numeric',
            //'batch'=>'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator->errors());
        }

        try {
            $product = Product::where('productId', '=', $id)
            ->join('productLines', 'products.idProductLine', '=', 'productLines.productLineId')
            ->join('images', 'productLines.imgId', '=', 'images.id')
            ->join('statuses', 'products.idStatus', '=', 'statuses.id')
            ->select(
                'products.productId',
                'products.name',
                DB::raw('productLines.name as productLine'),
                'products.history',
                'products.created_at',
                'products.updated_at',
                DB::raw('statuses.title as status'),
                DB::raw('images.id as imgId')
            )
            ->get();
            $product->name = $request->name;
            $product->idStatus = $request->idStatus;
            $product->idProductLine=$request->idProductLine;
            $product->history += $request->workPlateId;
            $product->save();
        } catch (Exception $e) {
            return $this->sendError('Validation Error', $e);
        }
    } // update()
}