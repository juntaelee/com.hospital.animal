cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-locationservices/www/Coordinates.js",
        "id": "cordova-plugin-locationservices.Coordinates",
        "clobbers": [
            "Coordinates",
            "cordova.plugins.locationServices.Coordinates",
            "plugin.locationServices.Coordinates"
        ]
    },
    {
        "file": "plugins/cordova-plugin-locationservices/www/PositionError.js",
        "id": "cordova-plugin-locationservices.PositionError",
        "clobbers": [
            "PositionError",
            "cordova.plugins.locationServices.PositionError",
            "plugin.locationServices.PositionError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-locationservices/www/Position.js",
        "id": "cordova-plugin-locationservices.Position",
        "clobbers": [
            "Position",
            "cordova.plugins.locationServices.PositionError",
            "plugin.locationServices.PositionError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-locationservices/www/LocationServices.js",
        "id": "cordova-plugin-locationservices.LocationServices",
        "clobbers": [
            "LocationServices",
            "cordova.plugins.locationServices.geolocation",
            "plugin.locationServices.geolocation"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova.plugins.diagnostic/www/android/diagnostic.js",
        "id": "cordova.plugins.diagnostic.Diagnostic",
        "clobbers": [
            "cordova.plugins.diagnostic"
        ]
    },
    {
        "file": "plugins/io.litehelpers.cordova.sqlite/www/SQLitePlugin.js",
        "id": "io.litehelpers.cordova.sqlite.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/www/Toast.js",
        "id": "nl.x-services.plugins.toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/test/tests.js",
        "id": "nl.x-services.plugins.toast.tests"
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-admobpro/www/AdMob.js",
        "id": "cordova-plugin-admobpro.AdMob",
        "clobbers": [
            "window.AdMob"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-device": "1.0.1",
    "cordova-plugin-locationservices": "1.1.0",
    "cordova-plugin-whitelist": "1.0.0",
    "cordova.plugins.diagnostic": "1.1.0",
    "io.litehelpers.cordova.sqlite": "0.7.10",
    "nl.x-services.plugins.toast": "2.0.4",
    "cordova-plugin-splashscreen": "2.1.0",
    "cordova-plugin-admobpro": "2.8.3",
    "cordova-plugin-extension": "1.1.4"
}
// BOTTOM OF METADATA
});