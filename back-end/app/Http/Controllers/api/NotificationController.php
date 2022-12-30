<?php

namespace App\Http\Controllers\Api;

use app\Http\Controllers\Api\getTime;
use App\Http\Controllers\Controller;
use App\Http\Controllers\CreateID\create_id;
use App\Models\Other\Notification;
use App\Models\Product\Product;
use App\Models\Product\ProductLine;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller {



    /**
     * create thông báo cho các bên
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'idSender'=>'required',
            'idReceiver'=>'required',
            'data'=>'required',
            'loai'=>'required|numeric'
        ]);

        if($validator->fails()){
            return $this->sendError('Validator Error', $validator->errors());
        }
        try {
            $sender = $request->nameSender;
            $receiver = $request->nameReceiver;
            $addId= create_id::createIdProduct();
            $notification = Notification::create([
                'idSender'    => $request->idSender,
                'idReceiver'  => $request->idReceiver,
                'sender' => $sender,
                'receiver' => $receiver,
                'data'   => $request->data,
                'accepted'  => 'pending',
                'addId'  => $addId,
            ]);
            $err = [];
            if($request->loai != 1){
                $data = json_decode($request->data)->data;
                // return $data[0];
                foreach($data as $e){
                    // return $e->id;
                    try{
                        $name = ProductLine::where('productLineId', '=', $e->id)->select('name')->get();
                        if(count($name) != 0){
                            // return $name;
                            $r2 = DB::table('products')->where('idProductLine', '=', $e->id)
                                ->where('canAddRequest','=','1')
                                ->select(DB::raw('count(productId) as num'))
                                ->get()[0]->num;
                            if($e->sl > $r2){
                                $err[] = 'Số lượng sản phẩm khả dụng có dòng sản phẩm ' . $name . ' không đủ. Số lượng tối đa ' . $r2;
                            }else{
                                $arrProduct = DB::table('products')
                                                ->where('idProductLine', '=', $e->id)
                                                ->where('canAddRequest','=','1')
                                                ->limit($e->sl)
                                                ->select(DB::raw('products.productId as id'))
                                                ->get();
                                $arrProduct;
                                foreach($arrProduct as $p){
                                    DB::table('products')
                                        ->where('productId','=',$p->id)
                                        ->update([
                                            'canAddRequest'=>$addId,
                                            'updated_at'=>$this->getTime()
                                        ]);
                                }
                            }
                        }else{
                            DB::table('products')->where('productId', '=', $e->id)
                            ->where('canAddRequest', '=', '1')
                            ->update([
                                'canAddRequest' => $addId,
                                'updated_at' => $this->getTime()
                            ]);
                        }
                        
                    }catch(Exception $ex){
                        return $ex;
                    }
                }
            }
            // return $this->sendResponse($err,'test');
            if(count($err)==0)
            return $this->sendResponse([$notification->id], 'Create Request Success');
            else return $this->sendError('create Request Fails',$err);
        } catch(Exception $e){
            return $this->sendError('create Request Fails',$e);
        }
    }


    public function show($id){
        try{
            $res = Notification::where('id', '=', $id)->select()->get();
            return $this->sendResponse([$res],'Get request Success');
        } catch(Exception $e){
            return $this->sendError('get Request Fails',$e);
        }
    }



    /**
     * Handle Request
     * @param string $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|string
     */
    public function requestNotification($id, Request $request) {
        $validator = Validator::make($request->all(), [
            'data'=>'required',
            'status'=>'required|numeric'
        ]);

        if($validator->fails()){
            return $this->sendError('Validator Error', $validator->errors());
        }

        try{
            $res = "";
            $query = DB::table('notifications')->where('id', '=', $id);
            $tg = $query->select('addId','idReceiver')->get()[0];
            $addId = $tg->addId;
            $idStore = $tg->idReceiver;
            // return $request->data;
            switch($request->data) {
                case 'pending':
                    if ($query->update(['accepted' => 'pending', 'updated_at' => $this->getTime()])
                    || count($query->select()->get())
                    ) $res = 'pending';
                    break;
                    case 'reject':
                        if ($query->update(['accepted' => 'reject', 'updated_at' => $this->getTime()])
                        || count($query->select()->get())
                        ) $res = 'reject';
                        DB::table('products')->where('canAddRequest', '=', $addId)
                        ->update([
                            // 'idStatus' => $request->status,
                            'canAddRequest'=>'1',
                                'updated_at' => $this->getTime()
                            ]);
                    break;
                case 'accept':
                    if ($query->update(['accepted' => 'accept', 'updated_at' => $this->getTime()])
                    || count($query->select()->get())
                    ) {$res = 'accept';
                    DB::table('products')->where('canAddRequest', '=', $addId)
                        ->update([
                            'idStatus' => $request->status,
                            'visit'=> $idStore,
                            'canAddRequest'=>'1',
                            'updated_at' => $this->getTime()
                        ]);}

                    break;
                default:
                    break;
            }

            // if($res == 'accept'){
            // }else if($res == 'reject'){
            // }

            return $this->sendResponse([],'thanh cong');
        } catch (Exception $e){
            return $this->sendError('update Error', [$e]);
        }
    }
    /**
     * Get All Request of user
     * @param string $id id user
     * @return \Illuminate\Http\JsonResponse|string
     */
    public function getAllNotification($id) {
        try {
            $tb1 = DB::table('notifications') -> where('idSender', '=', $id)
                ->get();
        $workPlateId = DB::table('users')->where('id', '=', $id)->limit(1)->get('workPlateId')[0]->workPlateId;
            $tb2 = DB::table('notifications')
                ->where('IdReceiver', '=', $workPlateId)
                ->select('notifications.*')
                ->get();
            $res = [$tb1, $tb2];

            if (count($res) == 0)
                return 'fails';
            return $this->sendResponse($res, 'thanh cong');
        }catch (Exception $e){
            return $this->sendError('error',$e);
        }
    }

    public function destroy($id){
        if(Notification::where('id', '=', $id)->delete() != 0)
            return $this->sendResponse([],'thanh cong');
        else
            return $this->sendError('that bai',[]);
    }

}