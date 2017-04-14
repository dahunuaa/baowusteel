var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    init();

    function init(){
        if(localStorage.getItem("token") == undefined || localStorage.getItem("token") == null){
        }else{
            var url=window.location.href;
            if(url.split('?').length==2){
                var back=url.split('?')[1];
                $scope._id = back;
            }

            $http.get(basePath+"api/v1.0/business/"+$scope._id+"?"+"&access_token="+localStorage.getItem("token"))
                .success(function(res){
                    if(res.response.success == 1){
                        $scope.data = res.response.data;
                        $scope.src_bus_staff = res.response.data.business_staff;
                        $scope.src_bus_num = res.response.data.business_num;
                        $scope.src_bus_reason = res.response.data.business_reason;
                        $scope.src_bus_place = res.response.data.business_place;
                        $scope.src_start_time = res.response.data.begin_time;
                        $scope.src_end_time = res.response.data.end_time;
                        $scope.src_remark = res.response.data.remark;

                    }else{
                        dhx_alert(res.response.return_code)
                    }
                })
        }
    }
//返回
    $scope.back = function(){
        window.location.href = "self_business.html"
    };

    $scope.src_start_time=document.getElementById("start_time").value;
    $scope.src_end_time=document.getElementById("end_time").value;

//确认修改
    $scope.do_edit = function(){
        var star_time = document.getElementById("start_time").value;
        var end_time = document.getElementById("end_time").value;
        if ($scope.src_bus_staff==""||$scope.src_bus_staff==undefined||$scope.src_bus_staff==null){
            dhx_alert("请填写出差人员！")
        }else if($scope.src_bus_num==""||$scope.src_bus_num==undefined||$scope.src_bus_num==null){
            dhx_alert("请填写出差总人数！")
        }else if($scope.src_bus_place==""||$scope.src_bus_place==undefined||$scope.src_bus_place==null){
            dhx_alert("请填写出差地！")
        }else if($scope.src_bus_reason==""||$scope.src_bus_reason==undefined||$scope.src_bus_reason==null){
            dhx_alert("请填写出差缘由！")
        }else if(star_time==""||star_time==undefined||star_time==null){
            dhx_alert("请选择出差开始时间！")
        }else if(end_time==""||end_time==undefined||end_time==null){
            dhx_alert("请选择出差结束时间！")
        }else if(star_time>end_time){
            dhx_alert("结束时间不得早于结束时间！")
        }else{
            $http({
                method:'put',
                url:basePath+"api/v1.0/business/"+$scope._id,
                params:{"access_token":localStorage.getItem("token"),
                    "business_staff":$scope.src_bus_staff,
                    "business_num":$scope.src_bus_num,
                    "business_reason":$scope.src_bus_reason,
                    "business_place":$scope.src_bus_place,
                    "begin_time":document.getElementById("start_time").value,
                    "end_time":document.getElementById("end_time").value,
                    "remark":$scope.src_remark}
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("修改成功",function(){
                        window.location.href = "self_business.html"
                    })

                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }

    };


    myCalendar = new dhtmlXCalendarObject(["start_time","end_time"]);//时间插件绑定
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
    myCalendar.loadUserLanguage('chinese');//定义语言

});

