/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    $scope.business = {};
    $scope.to_back = function(){
        window.location.href="business_list.html";
        // window.location.reload();
    };
    myCalendar = new dhtmlXCalendarObject(["business_start_time","business_endtime"]);//时间插件绑定
    dhtmlXCalendarObject.prototype.langData["chinese"] = {
        dateformat: "%Y-%m-%d",
        enableTime: true,
        monthesFNames: [
            "一月", "二月", "三月", "四月", "五月", "六月", "七月",
            "八月", "九月", "十月", "十一月", "十二月"
        ],
        monthesSNames: [
            "一月", "二月", "三月", "四月", "五月", "六月", "七月",
            "八月", "九月", "十月", "十一月", "十二月"
        ],
        daysFNames: [
            "周一", "周二", "周三", "周四", "周五", "周六", "周日"
        ],
        daysSNames: ["一", "二", "三", "四", "五", "六", "日"],
        weekstart: 7,
        weekname: "周"
    };
    myCalendar.loadUserLanguage('chinese')

    $scope.submit = function(){
        var star_time = document.getElementById("business_start_time").value
        var end_time = document.getElementById("business_endtime").value
        if ($scope.business.staff==""||$scope.business.staff==undefined||$scope.business.staff==null){
            dhx_alert("请填写出差人员！")
        }else if($scope.business.num==""||$scope.business.num==undefined||$scope.business.num==null){
            dhx_alert("请填写出差总人数！")
        }else if($scope.business.place==""||$scope.business.place==undefined||$scope.business.place==null){
            dhx_alert("请填写出差地！")
        }else if($scope.business.reason==""||$scope.business.reason==undefined||$scope.business.reason==null){
            dhx_alert("请填写出差缘由！")
        }else if(star_time==""||star_time==undefined||star_time==null){
            dhx_alert("请选择出差开始时间！")
        }else if(end_time==""||end_time==undefined||end_time==null){
            dhx_alert("请选择出差结束时间！")
        }else if(star_time>end_time){
            dhx_alert("结束时间不得早于结束时间！")
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/business",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "business_staff":$scope.business.staff,
                    "business_num":$scope.business.num,
                    "business_place":$scope.business.place,
                    "business_reason":$scope.business.reason,
                    "begin_time":star_time,
                    "end_time":end_time,
                    "remark":$scope.business.remark
                }
            }).success(function(res){
                if(res.response.success==1){
                    dhx_alert("新建出差任务成功!",function(){
                        window.location.href="business_list.html"
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
