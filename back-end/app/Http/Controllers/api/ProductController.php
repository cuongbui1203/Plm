<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\Cast\Object_;

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
                $product->productId = Product::createId($request->idProductLine,$i);
                $product->name = $name;
                $product->idStatus = 1;
                $product->idProductLine=$request->idProductLine;
                $product->history = $request->idProductLine;
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
}