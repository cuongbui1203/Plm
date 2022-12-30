<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CreateID\create_id;
use App\Models\User;
use App\Models\WorkPlates;
use Carbon\Carbon;
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
            'roleId'=>'required|numeric',
        ]);
        if($validator->fails()){
            return $this->sendError('Not validate',$validator->errors());
        }
        try{
            $workPlate = new WorkPlates();
            $workPlate->id = create_id::workPlateId();
            $workPlate['updated_at'] = $this->getTime();
            $workPlate['created_at'] = $this->getTime();
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
            ->join('roles','work_plates.roleId','=','roles.id')
            // ->join('users','users.workPlateId','=','work_plates.id')
            ->select(
                'work_plates.id',
                'work_plates.name',
                'work_plates.address',
                'work_plates.created_at',
                'work_plates.updated_at',
                DB::raw('roles.title as loai'),
                'roleId'
                // DB::raw('count(users.id) as employees')
            )->orderBy('work_plates.created_at', 'desc')
            ->get();
            foreach($res as $e){
                $e->employees = User::where('workPlateId', '=', $e->id)->select(DB::raw('count(id) as employees'))->get()[0]->employees;
            }
            return $this->sendResponse($res,"thanh cong lay het workPlates");
        }catch(Exception $e){
            return $this->sendError("error",$e);
        }
    }
    public function getWorkPlateById($id){
        try{
            $res = DB::table('work_plates')
            ->join('roles','work_plates.roleId','=','roles.id')
            ->where('work_plates.id','=',$id)
            // ->join('users','users.workPlateId','=','work_plates.id')
            ->select(
                'work_plates.id',
                'work_plates.name',
                'work_plates.address',
                'work_plates.created_at',
                'work_plates.updated_at',
                DB::raw('roles.title as loai'),
                // DB::raw('count(users.id) as employees')
                'roleId'

            )->orderBy('work_plates.created_at', 'desc')
            ->get();
            foreach($res as $e){
                $e->employees = User::where('workPlateId', '=', $e->id)->select(DB::raw('count(id) as employees'))->get()[0]->employees;
            }
            return $this->sendResponse($res,"thanh cong lay het workPlates");
        }catch(Exception $e){
            return $this->sendError('error',$e);
        }
    }
    public function getByIdRole($id){
        try{
            $res = DB::table('work_plates')
            ->join('roles','work_plates.roleId','=','roles.id')
            ->where('roleId','=',$id)
            ->select(
                'work_plates.id',
                'work_plates.name',
                'work_plates.address',
                'work_plates.created_at',
                'work_plates.updated_at',
                DB::raw('roles.title as loai')
            )->orderBy('work_plates.created_at', 'desc')
            ->get();
            return $this->sendResponse($res,"thanh cong lay het workPlates");
        }catch(Exception $e){
            return $this->sendError("error",$e);
        }
    }

    public function update($id, Request $request) {
        $validator = Validator::make($request->all(),[
            'name'=>'string',
            'address'=>'string',
            'roleId'=>'numeric',
            'type' => 'required|string'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator->errors(),500);
        }
        try {
            switch($request -> type) {
                case 'name': DB::table('work_plates')->where('id', '=', $id)->update(['name'=>$request->name]); break;
                case 'address': DB::table('work_plates')->where('id', '=', $id)->update(['address'=>$request->address]); break;
                // case 'roleId': DB::table('work_plates')->where('id', '=', $id)->update(['roleId'=>$request->roleId]); break;
                default: break;
            }
            DB::table('work_plates')->where('id', '=', $id)->update(['updated_at'=>Carbon::now('Asia/Phnom_Penh')->format('Y-m-d H:i:s')]);
            return $this->sendResponse(DB::table('productLines')->where('productLineId','=',$id)->get(),"thanh cong");
        } catch(Exception $e) {
            return $this->sendError('error',$e);
        }
    } //update
    
    public function deleteId($id){
        // try {
            DB::table('users')->where('workPlateId', '=', $id)->delete();
            DB::table('work_plates')->where('id', '=', $id)->delete();
            return $this->sendResponse([],'than cong');
        // }catch(Exception $e){
        //     return $this->sendError('error',$e);
        // }
    }
}