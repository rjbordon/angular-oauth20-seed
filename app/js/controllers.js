'use strict';

/* Controllers */
var controllers = angular.module('myApp.controllers', ['myApp.services']);

controllers.controller('SignInCtrl', ['$scope', 'oauth20APIService', function($scope, oauth20APIService) {
    $scope.signIn = function(){
        oauth20APIService.auth();
    }
}]);

controllers.controller('DashboardCtrl', ['$scope', 'oauth20APIService', 'tokenInfoAPIService', 'userInfoAPIService', function($scope, oauth20APIService, tokenInfoAPIService, userInfoAPIService) {
    var token = oauth20APIService.callback();
    if(token.accessToken !== undefined){
        // validate token to mitigate confused deputy issue
        tokenInfoAPIService.validateAccessToken(token.accessToken,
            function(data){
                // token is ok,
                // getting user information
                // you may want to create here a cookie that represents
                // that the user is logged-in your application
                $scope.user = userInfoAPIService.get({access_token: token.accessToken});
            },
            function(data){
                // an error occurred with the given access token
                // you cannot trust at this point
                // a good alternative could be redirect the user to /index.html
                alert(data.error !== undefined? data.error : 'unexpected error');
            });
    }
}]);

controllers.controller('MyCtrl1', [function(){}]);
controllers.controller('MyCtrl2', [function(){}]);