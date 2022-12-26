<?php

namespace App\Http\Controllers;

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
            'sender'=>'required',
            'receiver'=>'required',
            'message'=>'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validator Error', $validator->errors());
        }
        try {
            $notification = Notification::create([
                'sender'    => $request->sender,
                'receiver'  => $request->receiver,
                'message'   => $request->message,
                'accepted'  => 'require'
            ]);
            return $this->sendResponse([$notification->id], 'Create Request Success');
        } catch(Exception $e){
            return $this->sendError('create Request Fails',$e);
        }
    }

    public function showSendNotification($id){
        try {
            $send = DB::table('notifications')->select()->where('sender', '=', $id);
            return $this->sendResponse([
                $send
            ],'get the notifications I sent successfully');
        } catch (Exception $e){
            return $this->sendError('get Notification fails', $e);
        }
    }
    public function showRecvNotification($id){
        try {
            $recv = DB::table('notifications')->select()->where('receiver', '=', $id);
            return $this->sendResponse([
                $recv
            ],'get the notifications I recv successfully');
        } catch (Exception $e){
            return $this->sendError('get Notification fails', $e);
        }
    }


    /**
     * chấp nhận yêu cầu
     * @param Request $request
     * @param int $id 
     * @return void
     */
    public function acceptNotification(Request $request) {
        try{
            DB::table('notifications')->where('id', '=', $request->id)->where('sender','=',$request->sender)->update([
                'accepted' => 'accept'
            ]);
            $kg = DB::table('notifications')->select()->where('id','=',$request->id);
            $this->sendResponse([$kg], 'Success', Response::HTTP_ACCEPTED);
        } catch (Exception $e){
            $this->sendError('update Error', [$e]);
        }
    }
}