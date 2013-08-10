'use strict';

BookCrossingAppWeb.factory('geolocationService', function ($rootScope, $http, $q) {

        var getCityFromGeopoint = function getCityFromGeopoint(latitude, longitude){

            var deferred = $q.defer();
            var queryFormat;

            if(latitude && longitude)
            {
                queryFormat = "latlng=" + latitude + "," + longitude;
            }
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?'+queryFormat+'&sensor=true';

            $http({
                method: 'GET',
                url: url,
                cache: false
            }).
                success(function(data, status) {

                    if(data.status === "OK")
                    {
                        deferred.resolve(data.results[1].formatted_address);

                    }
                    else
                    {
                        deferred.reject(ErrorConst.CityNotFound)
                    }

                }).
                error(function(data, status) {

                    deferred.reject(false, ErrorConst.GenericError);
                });
            return deferred.promise;
        }

        return {
            getCurrentPosition: function getCurrentPosition(callback) {

                var geoPoint ={

                    latitude: 41.000,
                    longitude: 35.0000
                };
                callback(geoPoint)

            },
            getCityFromGeopoint: getCityFromGeopoint
        };
    });
