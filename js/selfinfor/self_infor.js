/**
 * Created by Administrator on 2017/1/3 0003.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
    init();

    function init(){
        $http.get(basePath+"api/v1.0/user/"+getCookie("user_id")+"?access_token="+localStorage.getItem("token"))
            .success(function(res){
                if(res.response.success==1){
                    $scope.user_name=res.response.data.name;
                    $scope.user_jobno=res.response.data.job_no;
                    $scope.user_mobile=res.response.data.tel;
                    $scope.user_sex=res.response.data.sex;
                    $scope.user_depart=res.response.data.depart;
                    $scope.user_position=res.response.data.position;
                    $scope.user_marital=res.response.data.marital;
                    $scope.user_birthplace=res.response.data.birthplace;
                    $scope.user_birthday=res.response.data.birthday;
                    if(localStorage.getItem("scope")=="admin"){
                        $scope.user_scope ="管理员"
                    }else if(localStorage.getItem("scope")=="normal"){
                        $scope.user_scope ="普通用户"
                    }else if(localStorage.getItem("scope")=="backend"){
                        $scope.user_scope ="后端用户"
                    }
                }
            })

    }
});