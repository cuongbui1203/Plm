<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CreateID\create_id;
use App\Models\WorkPlates;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Exception;

class WorkPlateController extends Controller
{
    //

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'address'=>'required',
            'roleId'=>'required|numeric'
        ]);
        if($validator->fails()){
            return $this->sendError('Not validate',$validator->errors());
        }
        try{
            $workPlate = new WorkPlates();
            $workPlate->id = create_id::workPlateId();
            $workPlate['updated_at'] = date('Y-m-d H:i:s');
            $workPlate['created_at'] = date('Y-m-d H:i:s');
            $workPlate['name'] = $request->name;
            $workPlate['address'] = $request->address;
            $workPlate['roleId'] = $request->roleId;
            $workPlate->save();
            return $this->sendResponse([$workPlate],"thanh cong",Response::HTTP_CREATED);
        } catch(Exception $e){
            return $this->sendError('error',$e);
        }
    }

    public function index() {
        try{
            $res = DB::table('work_plates')
            ->select()->orderBy('created_at', 'desc')
            ->get();
            return $this->sendResponse($res,"thanh cong lay het workPlates");
        }catch(Exception $e){
            return $this->sendError("error",$e);
        }
    }
}
