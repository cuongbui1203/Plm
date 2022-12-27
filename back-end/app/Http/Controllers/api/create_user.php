<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Other\Image;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use app\Http\Controllers\Api\getTime;
use App\Http\Controllers\CreateID\create_id;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;
use LogicException;

class create_user extends Controller
{
    /**
     * Create new user
     *
     * @param array $data
     * @return \App\Models\User
     * \User
     */
    private function create(array $data)
    {
        return User::create([
            'id'=>create_id::createIdUser($data['roleId']),
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>$data['password'],
            'workPlateId'=>$data['workPlateId'],
            'roleId'=>$data['roleId']
        ]);
        # code...
    }
    /**
     * register api
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        # code...
        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'email'=>'required|email',
            'password' => 'confirmed|min:6',
            'workPlateId' =>'required',
            'roleId'=> 'required|numeric',
            'image'=>'image|mimes:jpg,png,jpeg,gif,svg'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.',$validator->errors(),500);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        if($request->file('image') != null){
            $image_path = $request->file('image')->store('public');
            $image = Image::create([
                'img' => $image_path
            ]);
            $input['imageId'] = $image->id;
        } else {
            $input['imageId'] = null;

        }
        try{
            $user = $this->create($input);
            $success['name'] =  $user->name;
            return $this->sendResponse($success,"Register Account Successfully");
        }catch(Exception $e){
            return $this->sendError("Register Fail",$e,500);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request) {
        $id = explode('|', $request->bearerToken())[0];
        DB::table('personal_access_tokens')
                ->where('id', '=', $id)
                ->update([
                    'last_used_at'=>date('Y-m-d H:i:s'),
                    'updated_at'=>date('Y-m-d H:i:s')
                ]);
        $user = $request->user();
        // $path = `${$user->imageId}`;
        // $user->imgPath = $path;
        $user->imgPath = '/images/get/'.$user->imageId;
        return $this->sendResponse([$user], "ok");
    }

    public function login(Request $request){
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $id = explode('|', $success['token'])[0];
            // $user->currentAccessToken();
            // $success['name'] =  $user->name;
            $user->imgPath = '/images/get/'.$user->imageId;
            $success['user'] = $user;
            DB::table('personal_access_tokens')->where('id','=',$id)
            ->update([
                'created_at'=>date('Y-m-d H:i:s'),
                'updated_at'=>date('Y-m-d H:i:s'),
                'expires_at'=>Carbon::now('Asia/Phnom_Penh')->addDay()->format('Y-m-d H:i:s')
            ]);
            


            return $this->sendResponse($success, 'User login successfully.');
        }
        else{
            return $this->sendError('Unauthorize.', ['error'=>'Unauthorize']);
        }
    }


    public function logout(Request $request)
    {
        # code...
        // Get bearer token from the request
        $accessToken = $request->bearerToken();
        // Get access token from database
        $token = PersonalAccessToken::findToken($accessToken);


        // Revoke token
        if($token == null){
            return $this->sendError("Invalid Token",[]);
        }
        $token->delete();
        Auth::logout();
        return $this->sendResponse(['ok'], 'Logout success');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        //
        $user = new User();
        $user->name = $request->name;
        $user->email= $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json($user);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        //
        try{
            $user = Auth::user();
            // $user->workPlateId;
            return $this->sendResponse($user,"thanh cong");
        } catch(Exception $e){
            return $this->sendError("error",$e);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id) {
        $user = User::find($id);
        // switch($request->type){
        //     case 'img':
        //         $user->name = $request->name;
        //         break;
        //     case '':
        //         break;
        // }
        $user->name = $request->name;
        //$user->updated_at = Carbon::now()->format('Y-m-d H:i:s');
        $user->updated_at = getTime::getTime();
        $user->save();
        return $this->sendResponse([], 'thanh cong');
    }


    public function updateCurrentUser(Request $request,$id){
        $user = User::find($id);
        switch($request->type){
            case 'name':
                $user->name = $request->name;
                break;
            case '':
                break;
        }
        // $user->updated_at = Carbon::now()->format('Y-m-d H:i:s');
        $user->save();
        return $this->sendResponse([], 'thanh cong');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        //
            $res = DB::table('users')->where('id','=',$id)->delete();
            return $this->sendResponse([$res],'thanh cong');
    }

    public function getAllRole() {
        return $this->sendResponse(Role::get(), "thanh cong");
    }
    public function getRoleById($id) {
        return $this->sendResponse(Role::where('id','=',$id)->get(), "thanh cong");
    }

    public function search(Request $request){
        $validator = Validator::make($request->all(), [
            'type' => 'require',
        ]);
        if($validator->fails()){
            return $this->sendError('validator Error',$validator->errors());
        }
        try {
            $res = DB::table('users');

            switch ($request->type) {
                case 'name':
                    $res = $res->where('name', 'LIKE', '%' . $request->name . '%');
                    break;
                case 'role':
                    $res = $res->where('roleId', '=' . $request->roleId);
                    break;
                case 'workPlate':
                    $res = $res->where('workPlateId', '=', $request->workPlateId);
                    break;
                default:
                    $this->sendError('Invalid search type', []);
            }
            if ($request->orderBy) {
                if ($request->direction)
                    $request->direction = 'asc';
                $res = $res->orderBy($request->orderBy, $request->direction);
            }
            $res->select()->get();
            return $this->sendResponse($res,'thanh cong');
        }catch(Exception $e){
            return $this->sendError('error',[$e]);
        }
    }
    
    public function getAllUsers(){
        try {
            $res = DB::table('users')
                ->join('roles', 'users.roleId', '=', 'roles.id')
                ->join('work_plates', 'users.workPlateId', '=', 'work_plates.id')
                ->select(
                    'users.id',
                    'users.name',
                    'email',
                    'imageId',
                    DB::raw('work_plates.name as workPlate'),
                    'users.created_at',
                    'users.updated_at',
                    'roles.title'
                )->get();
            foreach ($res as $e) {
                $e->imgPath = '/image/get/' . $e->imageId;
            }
            return $this->sendResponse($res, 'thanh cong');
        }catch (Exception $e){
            return $this->sendError('error',$e);
        }
    }

    public function getOrderByColum() {
        return $this->sendResponse(['id','name','email','workPlateId','roleId','created_at','updated_at'],'thanh cong');
    }
}