<?php

namespace App\Services;

use App\Models\Config;

/**
 *
 */
class XeroRefreshToken
{
    /**
     * @var string
     */
    private string $token;

    /**
     *
     */
    public function __construct()
    {
        $this->token = \App\Models\Config::where('path', 'xero/refresh_token')->first()->value ?? '';
    }

    /**
     * @return string
     */
    public function get()
    {
        return $this->token;
    }

    /**
     * @return mixed|void|null
     */
    public function update()
    {
        if ($this->get() !== '') {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://identity.xero.com/connect/token');
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Basic XXXXXXXXXXXXXXXXXXXXXXX',
                'Content-Type: application/x-www-form-urlencoded; charset=utf-8',
            ]);

            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt(
                $ch,
                CURLOPT_POSTFIELDS,
                http_build_query([
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $this->token,
                ])
            );

            $response = curl_exec($ch);

            if (!$response) {
                die('Error: "' . curl_error($ch) . '" - Code: ' . curl_errno($ch));
            }

            // Parse the tokens from the payload.
            $json = json_decode($response, true);

            // Access token.
            $tokenAccess = Config::firstOrNew([
                'path' => 'xero/access_token'
            ]);
            $tokenAccess->value = $json['access_token'];
            $tokenAccess->save();

            // Refresh token.
            $tokenRefresh = Config::firstOrNew([
                'path' => 'xero/refresh_token'
            ]);
            $tokenRefresh->value = $json['refresh_token'];
            $tokenRefresh->save();

            $this->token = $json['refresh_token'];

            return $json['access_token'];
        }

        return '';
    }
}