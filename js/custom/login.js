/**
 * Created by Administrator on 2016/12/30 0030.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
    init()
    function init() {
        $scope.user = {}
    }

    $scope.to_login = function () {
        if ($scope.user.name == undefined || $scope.user.name == "") {
            dhx_alert("请输入账号")
        }
        else if($scope.user.password == undefined || $scope.user.password==""){
            dhx_alert("请输入密码")
        }else {
            $http({
                method:'post',
                url:basePath+"api/v1.0/user/login",
                params:{
                    "mobile":$scope.user.name,
                    "password":$scope.user.password
                }
            }).success(function(res){
                if(res.response.success ==1){
                    setCookie("token",res.response.data.token);
                    localStorage.setItem("login_name",res.response.data.login_name);
                    localStorage.setItem("name",res.response.data.name);
                    localStorage.setItem("token",res.response.data.token);
                    localStorage.setItem("scope",res.response.data.scope);
                    localStorage.setItem("mobile",res.response.data.mobile);
                    setCookie("user_id",res.response.data._id);
                    window.location.href = "index.html"
                }else{
                    dhx_alert(res.response.return_code )
                }
            })
        }

    }
});