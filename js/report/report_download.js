/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    $scope.report_model = {
        area00 : {value: "business",text: "出差列表",selected:1},
        area01 : {value: "inforgather", text: "情报搜集表"},
        area02 : {value: "inforguide", text: "信息指南"},
    };
    var time_type="all"

    $("#time_desc").click(function(){
        $("#all").attr("checked",false)
        document.getElementById("choose_time_desc").style.display=""
        time_type="time_desc"
    })
    $("#all").click(function(){
        $("#time_desc").attr("checked",false)
        document.getElementById("choose_time_desc").style.display="none"
        time_type="all"
    })

    myCalendar = new dhtmlXCalendarObject(["report_start_time","report_end_time"]);//时间插件绑定
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

    $scope.report = {};
    var _time_start=""
    var _end_time=""
    $scope.submit = function(){
        if(localStorage.getItem("scope")!="admin"){
            dhx_alert("您无权限下载报表！")
        }else{
            if ($scope.report.model==""||$scope.report.model==undefined||$scope.report.model==null){
                dhx_alert("请选择导出表！")
            }else if(time_type=="time_desc"){
                var star_time = document.getElementById("report_start_time").value
                var end_time = document.getElementById("report_end_time").value
                if(star_time==""||star_time==undefined||star_time==null){
                    dhx_alert("请选择开始时间")
                }else if(end_time==""||end_time==undefined||end_time==null){
                    dhx_alert("请选择结束时间")
                }else{
                    _time_start = star_time+" "+"00:00:00";
                    _end_time = end_time+" "+"23:59:59";
                }
            }
            window.location.href=basePath+"api/v1.0/report/pc/"+$scope.report.model.value+"?access_token="+localStorage.getItem("token")+
                "&time_desc="+time_type+
                "&start_time="+_time_start+
                "&end_time="+_end_time
        }
    }

});
