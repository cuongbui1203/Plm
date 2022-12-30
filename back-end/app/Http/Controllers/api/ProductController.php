<?php

namespace App\Http\Controllers\Api;

use app\Http\Controllers\Api\getTime;
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
                'infoCustomer',
                'products.updated_at',
                    'products.visit',
                    DB::raw('canAddRequest as can'),
                    DB::raw('statuses.id as statusId'),
                    DB::raw('statuses.title as status'),
                    DB::raw('images.id as imgId')
                )
                ->get();
            foreach($res as $e){
                $e->imgPath = '/image/get/' . $e->imgId;
            }
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
                    'products.visit',
                'infoCustomer',
                'products.updated_at',
                    DB::raw('canAddRequest as can'),
                    DB::raw('statuses.id as statusId'),
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
            'workPlateId' =>'required'
            // 'batch'=>'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator->errors());
        }
        $idStatus = $request->idStatus;
        // $id = Product::createId($request->idProductLine,$request->num);
        // $id = 1233;
        $res = [];
        try{
            for($i = 0;$i < (int)$request->num;$i++){
                $product = new Product();
                $product->productId = create_id::createIdProduct();
                $product->name = $request->name;
                $product->idStatus = 1;
                $product->visit = $request->workPlateId;
                $product->idProductLine=$request->idProductLine;
                $product->history = $request->idProductLine;
                $product->created_at = $this->getTime();
                $product->updated_at = $this->getTime();
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


    public function update($id, Request $request) {
        $validator =  Validator::make($request->all(),[
            'idProductLine'=>'required',
            'name'=>'required',
            'num'=>'required|numeric',
            'workPlateId'=>'required'
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
                'infoCustomer',
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

    public function search(Request $request) {
        $validator =  Validator::make($request->all(),[
            'type'=>'required',
            // 'name'=>'',
            // 'num'=>'required|numeric',

            //'batch'=>'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator->errors());
        }
        try{
            //search theo colum
            $res = DB::table('products');
            switch($request->type){
                case 'name':
                    $res = $res->where('name','like','%'.$request->name.'%');
                    break;
                case 'productLine':
                    $res = $res->where('idProductLine','=',$request->productLineId);
                    break;
                case 'status':
                    $res = $res->where('idStatus','=',$request->idStatus);
                    break;
                default:
                    return $this->sendError('Invalid type Search',[]);
                }
                if($request->orderBy!=null){
                    if(!$request->direction)$request->direction = 'ASC';
                    $res = $res->orderBy($request->orderBy,$request->direction);
                }
                $res = $res->select()->get();
                return $this->sendResponse($res,'thanh cong');
        }catch(Exception $e){
            return $this->sendError('not Found', $e);
        }
    }

    public function getOrderByColum() {
        return $this->sendResponse(['productId','name','idProductLine','idStatus','created_at','updated_at'],'thanh cong');
    }

    public function deleteId($id){
        $res = DB::table('products')->where('productId', '=', $id)->delete();
        if($res!= 0)
        return $this->sendResponse(["thanh cong"],"xoa thanh cong");
        else
            return $this->sendError('that bai',[]);
    }

    public function bans(Request $request, $id){
        DB::table('products')->where('productId', '=', $id)
            ->update([
                'updated_at' => $this->getTime(),
                'history'=>"",
                'idStatus' => 3,
                'infoCustomer' => $request->info
            ]);
        return $this->sendResponse([],'thanh cong');
    }
}