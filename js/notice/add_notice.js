/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    $scope.notice = {};
    $scope.to_back = function(){
        window.location.href="notice_list.html";
    };

    $scope.submit = function(){
        if ($scope.notice.title==""||$scope.notice.title==undefined||$scope.notice.title==null){
            dhx_alert("请填写公告标题！")
        }else if($scope.notice.context==""||$scope.notice.context==undefined||$scope.notice.context==null){
            dhx_alert("请填写公告内容！")
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/notice",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "notice_title":$scope.notice.title,
                    "notice_text":$scope.notice.context,

                }
            }).success(function(res){
                if(res.response.success==1){
                    dhx_alert("新建通知公告成功!",function(){
                        window.location.href="notice_list.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }


});
