<?php

namespace App\Services;

use App\Models\Config;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Carbon;

/**
 *
 */
class InvoiceService
{

    /**
     * @var string[]
     */
    public static $account_codes = [
        102 => 'Sales - eCommerce',
        105 => 'Sales - Development ADHOC',
        108 => 'Sales - Design/UX ADHOC',
        109 => 'Sales - Support & Maintenance',
        110 => 'Sales - Design/UX',
        120 => 'Sales - Marketing'
    ];

    /**
     * @var string[]
     */
    public static $teams = [
        'b4ebfc6e-7616-45b1-a5e8-b1ebf283df48' => 'Pod 2 Support',
        'ee58db1d-07e9-4db1-a2ad-fc6967dd544a' => 'Pod 1 Support',
        'b45b0e10-2742-4ebf-9576-4f23b31f5e77' => 'Pod 1 Marketing',
        '24600092-ebcf-4c88-8507-edd8cc40d256' => 'Projects'
    ];

    /**
     * @var string[]
     */
    public static $item_codes = [
        'Hours' => 'Hours',
        'Services' => 'Services',
        'Products' => 'Products'
    ];

    /**
     * @return string[]
     */
    public function getAccountCodes()
    {
        return self::$account_codes;
    }

    /**
     * @return string[]
     */
    public function getItemCodes()
    {
        return self::$item_codes;
    }

    /**
     * @return string[]
     */
    public function getTeams()
    {
        return self::$teams;
    }

    /**
     * Create an invoice and return its Xero ID.
     *
     * @param string $contact_id
     * @param Carbon $due
     * @param array $line_items
     *
     * @return string
     *
     * @throws GuzzleException
     */
    public function create(string $contact_id, Carbon $due, array $line_items, $reference = ''): string
    {
        $token = (Config::where('path', '=', 'xero/access_token')->firstOrFail()->value);

        $client = new Client();

        $invoice = [
            'Invoices' => [
                [
                    'Contact' => [
                        'ContactID' => $contact_id
                    ],
                    'DueDateString' => $due->format('Y-m-d').'T23:59:59',
                    'Type' => 'ACCREC',
                    'LineAmountTypes' => 'Exclusive',
                    'Status' => 'AUTHORISED',
                    'LineItems' => $line_items
                ]
            ]
        ];

        // If we have a reference, stitch it in.
        if ($reference !== '') {
            $invoice['Invoices'][0]['Reference'] = $reference;
        }

        $request = new Request(
            "POST",
            "https://api.xero.com/api.xro/2.0/Invoices",
            [
                "Authorization" => 'Bearer ' . $token,
                "Content-Type" => "application/json",
                "Xero-Tenant-Id" => env('XERO_TENANT_ID'),
            ],
            json_encode($invoice)
        );

        try {
            $response = $client->send($request);
            $body = json_decode($response->getBody(true)->getContents(), true);

            if (array_key_exists('Id', $body) && array_key_exists('Status', $body)) {
                if ($body['Status'] == 'OK') {
                    return $body['Invoices'][0]['InvoiceID'];
                }
            }

            return '';
        } catch (RequestException $exception) {
            return '';
        }

        return '';
    }

    public function email($invoice_id) {

        $token = (Config::where('path', '=', 'xero/access_token')->firstOrFail()->value);

        $client = new Client();

        $request = new Request(
            "POST",
            "https://api.xero.com/api.xro/2.0/Invoices/".$invoice_id."/Email",
            [
                "Authorization" => 'Bearer ' . $token,
                "Content-Type" => "application/json",
                "Xero-Tenant-Id" => env('XERO_TENANT_ID'),
            ],
            ''
        );

        $response = $client->send($request);

        if ($response->getStatusCode() === 204) {
            return true;
        } else {
            dd($response->getBody()->getContents());
        }

        return false;
    }
}