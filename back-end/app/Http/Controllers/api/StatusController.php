<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Status;
use Exception;
use Illuminate\Support\Facades\DB;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //
        try{
            return $this->sendResponse(Status::get(),'lay du lieu thanh cong');
        }catch(Exception $e){
            return $this->sendError('error',$e);
        }
    }
    /**
     * get status title
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try{
            return $this->sendResponse(DB::table('statuses')->where('id','=',$id)->get('title'),'thanh cong');
        }catch(Exception $e){
            return $this->sendError('error',$e);
        }
    }
}