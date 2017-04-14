/**
 * Created by Administrator on 2016/12/30 0030.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl', function($scope,$http){
    var url =window.location.href;
    if(url.split('?').length==2){

    }else {
        init();
        var myTabbar;

        var mySidebar_1;
        var mySidebar_2;
        var mySidebar_3;
        var mySidebar_4;
        var mySidebar_5;
        var mySidebar_6;
        var mySidebar_7;
        var mySidebar_8;


        function init() {
            $scope.name = localStorage.getItem("name");
            if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
                window.location.href = "../../../../mui workspace/miniui/login.html"
            } else {
                create();
            }

            function create() {
                //声明导航栏
                if(localStorage.getItem("scope")=="admin"){
                    myTabbar = new dhtmlXTabBar({
                        parent: "tabbarObj",
                        tabs: [
                            {id: "placeholder", text: '', active:1 ,width: 160},
                            {id: "business", text: '出差信息',active:1 , width: 160},
                            {id: "infor_gather", text: "情报搜集", width: 160},
                            {id: "infor_guide", text: "信息指南",width: 160},
                            {id: "selfinfor", text: "个人中心", width: 160},
                            {id: "about_us", text: "关于我们",width: 160},
                            {id: "feedback", text: "意见反馈", width: 160},
                            {id: "notice", text: "通知公告", width: 160},
                            {id: "report_download", text: "报表下载", width: 160},
                            {id: "admin", text: "用户管理", width: 160}
                        ]
                    });
                    var mySidebar_9;

                    mySidebar_9 = myTabbar.tabs("admin").attachSidebar({
                        width: 200,
                        icons_path: "icons/icons_material/",
                        json: "admin/admin.json",
                        onload: function () {
                            mySidebar_9.cells("users_list").attachURL("admin/users_list.html");
                        }
                    });
                    mySidebar_9.attachEvent("onSelect",function(id){
                        if(id =="add_user"){
                            mySidebar_9.cells("add_user").attachURL("admin/add_user.html");
                        }
                    });
                }else{
                    myTabbar = new dhtmlXTabBar({
                        parent: "tabbarObj",
                        tabs: [
                            {id: "placeholder", text: '', active:1 ,width: 160},
                            {id: "business", text: '出差信息',active:1 , width: 160},
                            {id: "infor_gather", text: "情报搜集", width: 160},
                            {id: "infor_guide", text: "信息指南",width: 160},
                            {id: "selfinfor", text: "个人中心", width: 160},
                            {id: "about_us", text: "关于我们",width: 160},
                            {id: "feedback", text: "意见反馈", width: 160},
                            {id: "notice", text: "通知公告", width: 160},
                            {id: "report_download", text: "报表下载", width: 160},
                        ]
                    });
                }

                //导航栏的分区

                mySidebar_8 = myTabbar.tabs("placeholder").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "business/business.json",
                    onload: function () {
                        mySidebar_8.cells("business_list").attachURL("business/business_list.html");
                    }
                });

                mySidebar_1 = myTabbar.tabs("business").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "business/business.json",
                    onload: function () {
                        mySidebar_1.cells("business_list").attachURL("business/business_list.html");
                    }
                });
                mySidebar_1.attachEvent("onSelect",function(id){
                    if(id=="add_business"){
                        mySidebar_1.cells("add_business").attachURL("business/add_business.html");
                    }
                })


                mySidebar_2 = myTabbar.tabs("infor_gather").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "infor_gather/infor_gather.json",
                    onload: function () {
                        mySidebar_2.cells("infor_gather_list").attachURL("infor_gather/inforgather_list.html");
                    }
                });
                mySidebar_2.attachEvent("onSelect",function(id){
                    if(id =="add_infor_gather" ){
                        mySidebar_2.cells("add_infor_gather").attachURL("infor_gather/add_infor_gather.html");
                    }else if(id =="dongbei"){
                        localStorage.setItem("area_name","东北");
                        mySidebar_2.cells("dongbei").attachURL("infor_gather/given_area.html");
                    }else if(id =="xinan"){
                        localStorage.setItem("area_name","西南");
                        mySidebar_2.cells("xinan").attachURL("infor_gather/given_area.html");
                    }else if(id =="zhonghaiyou"){
                        localStorage.setItem("area_name","中海油");
                        mySidebar_2.cells("zhonghaiyou").attachURL("infor_gather/given_area.html");
                    }else if(id =="huabei"){
                        localStorage.setItem("area_name","华北");
                        mySidebar_2.cells("huabei").attachURL("infor_gather/given_area.html");
                    }else if(id =="huazhong"){
                        localStorage.setItem("area_name","华中");
                        mySidebar_2.cells("huazhong").attachURL("infor_gather/given_area.html");
                    }else if(id =="huadong"){
                        localStorage.setItem("area_name","华东");
                        mySidebar_2.cells("huadong").attachURL("infor_gather/given_area.html");
                    }else if(id =="xinjiang"){
                        localStorage.setItem("area_name","新疆");
                        mySidebar_2.cells("xinjiang").attachURL("infor_gather/given_area.html");
                    }else if(id =="xibei"){
                        localStorage.setItem("area_name","西北");
                        mySidebar_2.cells("xibei").attachURL("infor_gather/given_area.html");
                    }else if(id=="like"){
                        mySidebar_2.cells("like").attachURL("infor_gather/like.html");
                    }
                });


                mySidebar_3 = myTabbar.tabs("infor_guide").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "infor_guide/infor_guide.json",
                    onload: function () {
                        mySidebar_3.cells("infor_guide_list").attachURL("infor_guide/infor_guide_list.html");
                    }
                });
                mySidebar_3.attachEvent("onSelect",function(id){
                    if(id=="add_infor_guide"){
                        mySidebar_3.cells("add_infor_guide").attachURL("infor_guide/add_infor_guide.html");
                    }else if(id=="like"){
                        mySidebar_3.cells("like").attachURL("infor_guide/like.html");
                    }
                })

                mySidebar_4 = myTabbar.tabs("selfinfor").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "selfinfor/self_infor.json",
                    onload: function () {
                        mySidebar_4.cells("self_business").attachURL("selfinfor/self_business.html");
                    }
                });
                mySidebar_4.attachEvent("onSelect",function(id){
                    if(id =="self_infor"){
                        mySidebar_4.cells("self_infor").attachURL("selfinfor/self_infor.html");
                    }else if (id =="self_business"){
                        mySidebar_4.cells("self_business").attachURL("selfinfor/self_business.html");
                    }else if (id =="self_inforgather"){
                        mySidebar_4.cells("self_inforgather").attachURL("selfinfor/self_inforgather.html");
                    }else if (id =="self_inforguide"){
                        mySidebar_4.cells("self_inforguide").attachURL("selfinfor/self_inforguide.html");
                    }else if (id =="self_notice"){
                        mySidebar_4.cells("self_notice").attachURL("selfinfor/self_notice.html");
                    }else if (id =="changepsw"){
                        mySidebar_4.cells("changepsw").attachURL("selfinfor/changepsw.html");
                    }
                });

                mySidebar_5 = myTabbar.tabs("about_us").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "about_us/about_us.json",
                    onload: function () {
                        mySidebar_5.cells("about_us").attachURL("http://www.baowugroup.com/contents/5110/94916.html");
                    }
                });
                mySidebar_6 = myTabbar.tabs("feedback").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "feedback/feedback.json",
                    onload: function () {
                        mySidebar_6.cells("add_feedback").attachURL("feedback/add_feedback.html");
                    }
                });
                mySidebar_7 = myTabbar.tabs("notice").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "notice/notice.json",
                    onload: function () {
                        mySidebar_7.cells("notice_list").attachURL("notice/notice_list.html");
                    }
                });
                mySidebar_7.attachEvent("onSelect",function(id){
                    if(id =="add_notice"){
                        mySidebar_7.cells("add_notice").attachURL("notice/add_notice.html");
                    }
                });
                mySidebar_8 = myTabbar.tabs("report_download").attachSidebar({
                    width: 200,
                    icons_path: "icons/icons_material/",
                    json: "report/report.json",
                    onload: function () {
                        mySidebar_8.cells("report_download").attachURL("report/report_download.html");
                    }
                });

            }
        }
    }
    $scope.login_out = function(){
        setCookie("token","");
        window.location.href="login.html"
    }

})