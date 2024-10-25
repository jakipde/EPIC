<?php

namespace App\Services;

use Exception;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;

class UserJwtService
{
    const ALGO = 'HS256';
    const EXPIRED = 120; // minutes
    const KEYPREFIX = 'ABCSquad_';

    // Generate token on login
    public static function generateJwtToken()
    {
        $created_at = now()->format('Y_m_d_H_i_s');
        Session::put('user_login_at', $created_at);

        $key = self::KEYPREFIX . auth()->id() . $created_at;
        $value = JWT::encode(
            [
                'user_id' => auth()->id(),
                'created_at' => $created_at,
                'exp' => now()->addMinutes(self::EXPIRED)->timestamp,
            ],
            config('app.key'),
            self::ALGO
        );

        Cache::put($key, $value, now()->addMinutes(self::EXPIRED / 2));

        return $value;
    }

    // Validate token in API middleware
    public static function validateToken($token)
    {
        $token = str_replace(self::KEYPREFIX, '', $token);

        try {
            $payload = JWT::decode($token, new Key(config('app.key'), self::ALGO));
            auth()->loginUsingId($payload->user_id);
        } catch (ExpiredException $e) {
            Log::warning('Expired Token', ['token' => $token]);
            abort(403, 'Expired Token, please relogin');
        } catch (Exception $e) {
            Log::error('Invalid Token', ['error' => $e->getMessage()]);
            abort(403, 'Invalid token');
        }
    }

    // Retrieve the active token
    public static function getActiveToken()
    {
        $login_at = Session::get('user_login_at');
        $key = self::KEYPREFIX . auth()->id() . $login_at;

        $existToken = Cache::get($key, '');

        // Renew token if session is valid but cache is expired
        if (empty($existToken) && !empty($login_at)) {
            return self::generateJwtToken();
        }

        return $existToken;
    }
}
