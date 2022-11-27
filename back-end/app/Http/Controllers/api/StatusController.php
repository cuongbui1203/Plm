<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use Exception;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\DB;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
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

    public function show($id)
    {
        try{
            return $this->sendResponse(DB::table('statuses')->where('id','=',$id)->get('title'),'thanh cong');
        }catch(Exception $e){
            return $this->sendError('error',$e);
        }
    }

}
