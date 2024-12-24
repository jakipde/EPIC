<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeviceforSale extends Model
{    protected $fillable = [
    'brand',        // Brand of the device
    'type',         // Type of device
    'model',        // Model of the device
    'sn',           // Serial number
    'imei_1',      // IMEI 1
    'imei_2',      // IMEI 2
    'price',        // Price of the device
];
}
