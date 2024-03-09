<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\Mail;
use Illuminate\Support\Facades\Mail as FacadesMail;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $recipientEmail = env('MAIL_FROM_ADDRESS', 'fallback@domena.pl');

        $title = $request->input('title');
        $message = $request->input('message');
        $sender = $request->input('sender');

        if(!$this->validateData($message,$title,$sender)){
            return response()->json(['success'=>false, 'message' => 'failed to authenticate data']);
        }

        try {
            FacadesMail::to($recipientEmail)->send(new Mail($title,$message,$sender));

            return response()->json(['success' => true, 'message' => 'E-mail sent successfully','tresc'=>$message]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to send e-mail', 'error' => $e->getMessage()]);
        }
    }

    public function validateData($message, $title, $sender) {
        $user = User::where('email', $sender)->first();

        if (strlen($message) < 16 || strlen($message) > 255) {
            return 'Message length condition not met';
        }

        if (strlen($title) < 4 || strlen($title) > 255) {
            return 'Subject length condition not met';
        }

        if (!$user) {
            return 'User not found';
        }

        return true;
    }
}
