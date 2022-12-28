<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Other\Notification;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    /**
     * create thông báo cho các bên
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'idSender'=>'required',
            'idReceiver'=>'required',
            'data'=>'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validator Error', $validator->errors());
        }
        try {
            $sender = DB::table('users')->where('id', '=', $request->idSender)->select('name')->limit(1)->get()[0]->name;
            $receiver = DB::table('work_plates')->where('id', '=', $request->idReceiver)->select('name')->limit(1)->get()[0]->name;
            $notification = Notification::create([
                'idSender'    => $request->idSender,
                'idReceiver'  => $request->idReceiver,
                'sender' => $sender,
                'receiver' => $receiver,
                'data'   => $request->data,
                'accepted'  => 'request'
            ]);
            return $this->sendResponse([$notification->id], 'Create Request Success');
        } catch(Exception $e){
            return $this->sendError('create Request Fails',$e);
        }
    }

    public function showSendNotification($id){
        try {
            $send = DB::table('notifications')->select()->where('idSender', '=', $id);
            return $this->sendResponse([
                $send
            ],'get the notifications I sent successfully');
        } catch (Exception $e){
            return $this->sendError('get Notification fails', $e);
        }
    }
    public function showRecvNotification($id){
        try {
            $recv = DB::table('notifications')->select()->where('idReceiver', '=', $id);
            return $this->sendResponse([
                $recv
            ],'get the notifications I recv successfully');
        } catch (Exception $e){
            return $this->sendError('get Notification fails', $e);
        }
    }

    public function requestNotification($id, Request $request) {
        $validator = Validator::make($request->all(), [
            'data'=>'required|string'
        ]);

        if($validator->fails()){
            return $this->sendError('Validator Error', $validator->errors());
        }

        try{
            $res = 'no success';
            switch($request->data) {
                case 'pending':
                    if (DB::table('notifications')->where('id', '=', $id)->update(['accepted' => 'pending', 'updated_at' => getTime::getTime()])
                    || count(DB::table('notifications')->where('id', '=', $id)->select()->get())
                    ) $res = "success";
                    break;
                case 'reject':
                    if (DB::table('notifications')->where('id', '=', $id)->update(['accepted' => 'reject', 'updated_at' => getTime::getTime()])
                    || count(DB::table('notifications')->where('id', '=', $id)->select()->get())
                    ) $res = "success";
                    break;
                case 'accept':
                    if (DB::table('notifications')->where('id', '=', $id)->update(['accepted' => 'accept', 'updated_at' => getTime::getTime()])
                    || count(DB::table('notifications')->where('id', '=', $id)->select()->get())
                    ) $res = "success";
                    break;
                default:
                    break;
            }
            return 'request ' . $res;
        } catch (Exception $e){
            return $this->sendError('update Error', [$e]);
        }
    }

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
}