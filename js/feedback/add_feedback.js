/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    $scope.feedback = {};

    $scope.submit = function(){
        var feedback_content = document.getElementById("feedback_content").value
        var feedback_contact = document.getElementById("feedback_contact").value
        if ($scope.feedback.content==""||$scope.feedback.content==undefined||$scope.feedback.content==null){
            dhx_alert("请填写意见和反馈！")
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/feedback",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "feedback_content":$scope.feedback.content,
                    "contact":$scope.feedback.contact,
                }
            }).success(function(res){
                if(res.response.success==1){
                    dhx_alert("意见反馈成功!",function(){
                        window.location.reload()
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }

    $scope.back=function(){
        window.location.href="business_list.html"
    }
});
