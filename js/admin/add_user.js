/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    $scope.user_type={
        area01:{value:"normal",text:"普通用户",selected:1},
        area02:{value:"backend",text:"后台用户"}
    }
    $scope.user = {};
    $scope.to_back = function(){
        window.location.href="users_list.html";
        // window.location.reload();
    };

    $scope.submit = function(){
        if ($scope.user.job_no==""||$scope.user.job_no==undefined||$scope.user.job_no==null){
            dhx_alert("请填写人员工号！")
        }else if($scope.user.name==""||$scope.user.name==undefined||$scope.user.name==null){
            dhx_alert("请填写人员姓名！")
        }else if($scope.user.psw==""||$scope.user.psw==undefined||$scope.user.psw==null){
            dhx_alert("请填写初始密码！")
        }else if($scope.user.type==""||$scope.user.type==undefined||$scope.user.type==null){
            dhx_alert("请选择人员类型！")
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/user/register",
                params:{
                    "job_no":$scope.user.job_no,
                    "password":$scope.user.psw,
                    "name":$scope.user.name,
                    "scope":$scope.user.type.value,
                    "mobile":$scope.user.job_no,
                }
            }).success(function(res){
                if(res.response.success==1){
                    dhx_alert("新增人员成功!",function(){
                        window.location.reload()
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }

    $scope.back=function(){
        window.location.href="users_list.html"
    }
});
