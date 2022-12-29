<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

class Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * success response method.
     *
     * @return \Illuminate\Http\JsonResponse 
     */
    public function sendResponse($result, $message, $httpCode = 200)
    {
    	$response = [
            'success' => true,
            'size'    => count($result),
            'data'    => $result,
            'message' => $message,
        ];


        return response()->json($response, $httpCode);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError($error, $errorMessages = [], $code = 404)
    {
    	$response = [
            'success' => false,
            'message' => $error,
        ];


        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }


        return response()->json($response, $code);
    }

    protected function getTime(){
        return Carbon::now()->timezone('Asia/Phnom_Penh')->format('Y-m-d H:i:s');
    }
}