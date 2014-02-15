'use strict';

/* Services */

var services = angular.module('myApp.services', ['myApp.configurations', 'ngResource']);

services.factory('oauth20APIService', ['IDP', '$window', function(IDP, $window){
    return {
        auth: function(){
            var state = new Date().getTime();
            $window.location.href = IDP.authzEndpoint
                + '?client_id=' + IDP.application.apiKey
                + '&response_type=' + IDP.application.responseType
                + '&scope=' + IDP.application.scopes.join(' ')
                + '&redirect_uri=' + IDP.application.redirectUri
                + '&state=' + state;
        },
        callback: function(){
            var oauth20Token = {};
            var matchesSuccess = $window.location.href.match(/state=(.*)&access_token=(.*)&token_type=(.*)&expires_in=(.*)/);
            var matchesError = $window.location.href.match(/error=(.*)&state=(.*)/);
            if(matchesSuccess != null){
                oauth20Token.state = matchesSuccess[1];
                oauth20Token.accessToken = matchesSuccess[2];
                oauth20Token.tokenType = matchesSuccess[3];
                oauth20Token.expiresIn = matchesSuccess[4];
            } else if(matchesError != null){
                oauth20Token.error = matchesError[1];
                oauth20Token.state = matchesError[2];
            }

            return oauth20Token;
        }

    };
}]);

services.factory('tokenInfoAPIService', ['IDP', '$http', function(IDP, $http){
    return {
        validateAccessToken: function(accessToken, successCallback, errorCallback){
            $http({
                method: 'GET',
                url: IDP.tokenInfoEndpoint + '?access_token=' + accessToken
            })
                .success(function(data, status){
                    // validate audience
                    if(data.audience !== undefined
                        && data.audience === IDP.application.apiKey){
                        successCallback(data);
                    } else {
                        errorCallback({error: 'invalid_audience'});
                    }
                }).error(function(data, status){
                    errorCallback(data);
                });
        }
    };
}
]);

services.factory('userInfoAPIService', ['IDP', '$resource', function(IDP, $resource){
    return  $resource(IDP.userInfoEndpoint);
}
]);

services.value('version', '0.1');