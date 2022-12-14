<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CreateID\create_id;
use App\Models\Other\Image as OtherImage;
use App\Models\Product\ProductLine;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
            $allProductLine = DB::table('productLines')
                                ->join('images','productLines.imgId','=','images.id')
                                ->select('productLines.*',DB::raw('images.id as imgId'))
                                ->get();
            foreach($allProductLine as $e){
                $e->imgPath = '/image/get/' . $e->imgId;
            }
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
            'img'=>'image|mimes:jpg,png,jpeg,gif,svg'
        ]);
        if($validator->fails()){
            return $this->sendError('Not validate',$validator->errors());
        }
        try{
            $productLine = new ProductLine();
            $productLine->productLineId = create_id::createIdProduct();
            if($request->file('image') != null){
                $image_path = $request->file('image')->store('public');
                $image = OtherImage::create([
                    'img' => $image_path
                ]);
                $productLine['imgId'] = $image->id;
            }
            $productLine['info'] = $request->info;
            $productLine['updated_at'] = $this->getTime();
            $productLine['created_at'] =$this->getTime();
            $productLine->name = $request->name;
            $productLine->save();
            return $this->sendResponse([$productLine],"thanh cong",Response::HTTP_CREATED);
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

    public function update($id, Request $request) {
        $validator = Validator::make($request->all(),[
            'name'=>'string',
            'info'=>'string',
            'imgId' => 'numeric',
            'type' => 'required|string',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator->errors(),500);
        }
        try {
            switch($request -> type) {
                case 'name': DB::table('productLines')->where('productLineId', '=', $id)->update(['name'=>$request->name]); break;
                case 'info': DB::table('productLines')->where('productLineId', '=', $id)->update(['info'=>$request->info]); break;
                case 'imgId': DB::table('productLines')->where('productLineId', '=', $id)->update(['imgId'=>$request->imgId]); break;
                default: break;
            }
            DB::table('productLines')->where('productLineId', '=', $id)->update(['updated_at'=>Carbon::now('Asia/Phnom_Penh')->format('Y-m-d H:i:s')]);
            return $this->sendResponse(DB::table('productLines')->where('productLineId','=',$id)->get(),"thanh cong");
        } catch(Exception $e) {
            return $this->sendError('error',$e);
        }
    } // update()

    public function search(Request $request){
        $validator =  Validator::make($request->all(),[
            'type'=>'required',
            'name'=>'required',
            // 'num'=>'required|numeric',
            
            //'batch'=>'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator->errors());
        }
        try{
            //search theo colum
            $res = DB::table('productLines');
            switch($request->type){
                case 'name':
                    $res = $res->where('name','like','%'.$request->name.'%');
                    break;
                default:
                    return $this->sendError('Invalid type Search',[]);
                }
                if($request->orderBy!=null){
                    if(!$request->direction) $request->direction = 'ASC';
                    $res = $res->orderBy($request->orderBy,$request->direction);
                }
                $res = $res->select()->get();
                return $this->sendResponse($res,'thanh cong');
        }catch(Exception $e){
            return $this->sendError('not Found', $e);
        }
    }
    public function getOrderByColum() {
        return $this->sendResponse(['productLineId','name','quantity','created_at','updated_at'],'thanh cong');
    }

    public function deleteId($id){
        DB::table('products')->where('idProductLine', '=', $id)->delete();
        DB::table('productLines')->where('productLineId', '=', $id)->delete();
        return $this->sendResponse([],'thanh cong');
    }

    public function getProductByStatus($idProductLine,$idStatus){
        try{
            $res = ProductLine::where('productLines.productLineId', '=', strval($idProductLine))
                ->join('products', 'products.idProductLine', '=', 'productLineId')
                ->where('products.idStatus', '=', $idStatus)
                ->select(
                    'productlines.*',
                    DB::raw('count(products.productId) as quantityOfProduct')
                )->get();
            return $this->sendResponse($res,'thanh cong');
        } catch(Exception $e){
            return $this->sendError('error',$e);
        } 
    }
}