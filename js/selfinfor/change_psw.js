/**
 * Created by Administrator on 2017/3/24.
 */
var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
    $scope.self = {};
    $scope.submit = function () {
        if ($scope.self.oldpsw == "" || $scope.self.oldpsw == undefined || $scope.self.oldpsw == null) {
            dhx_alert("请输入原密码");
        } else if ($scope.self.newpsw == "" || $scope.self.newpsw == undefined || $scope.self.newpsw == null) {
            dhx_alert("请输入新密码");
        } else if ($scope.self.confirmpsw == "" || $scope.self.confirmpsw == undefined || $scope.self.confirmpsw == null) {
            dhx_alert("请输入确认密码");
        } else if ($scope.self.confirmpsw != $scope.self.newpsw || $scope.self.confirmpsw != $scope.self.newpsw || $scope.self.confirmpsw != $scope.self.newpsw) {
            dhx_alert("两次新密码输入不相同");
        }else{
            $http({
                method:'put',
                url:basePath+"api/v1.0/user/psw/change",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "mobile":localStorage.getItem("mobile"),
                    "oldpsw":$scope.self.oldpsw,
                    "newpsw":$scope.self.newpsw,
                }
            }).success(function(res){
                if(res.response.success==1){
                    dhx_alert("修改密码成功!")
                    document.getElementById("oldpsw").value="";
                    document.getElementById("newpsw").value="";
                    document.getElementById("confirmpsw").value="";
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }

})

