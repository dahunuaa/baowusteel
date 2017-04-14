/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    $scope.gather_areas = {
        area01 : {value: "dongbei",text: "东北",selected: "1"},
        area02 : {value: "xinan", text: "西南"},
        area03 : {value: "zhonghaiyou", text: "中海油"},
        area04 : {value: "huabei", text: "华北"},
        area05 : {value: "huazhong", text: "华中"},
        area06 : {value: "huadong",text: "华东"},
        area07 : {value: "xinjiang", text: "新疆"}
    };

    $scope.inforgather = {};

    var img1='';
    var img2='';
    var img3='';

    $scope.m1='';
    $scope.m2='';
    $scope.m3='';
    $scope.images=[$scope.m1,$scope.m2,$scope.m3]

    //上传图片
    $(".uploaddiv").click(function(){
        selectimgindex = $(".uploaddiv").index(this);
        $(".uploadimg")[selectimgindex].click();
    });

    $(".uploadimg").change(function(){
        console.log(this.files[0]);
        var myfile = this.files[0];
        $(".uploaddiv").each(function(index){
            if(index==selectimgindex){
                $(this).find('img').attr("src",getURL(myfile));
                return false;
            }
        });

        if( myfile.size > 5*1024*1024 ){  //用size属性判断文件大小不能超过5M
            dhx_alert( "你上传的文件太大了！" )
        }else {
            var reader = new FileReader();
            reader.readAsDataURL(myfile);
            reader.onload = function (e) {
                var res = this.result;

                res = res.split(',')[1];
                console.log(res.split(','));
                if (selectimgindex == 0) {
                    img1 = res;
                    $scope.m1 =img1;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3];
                } else if (selectimgindex == 1) {
                    img2 = res;
                    $scope.m2 =img2;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3];
                } else if(selectimgindex == 2){
                    img3 = res;
                    $scope.m3 =img3;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3];
                }
            }
        }
    });

    //get img url
    function getURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }


    $scope.submit = function(){
        if ($scope.inforgather.title==""||$scope.inforgather.title==undefined||$scope.inforgather.title==null){
            dhx_alert("请填写标题！")
        }else if($scope.inforgather.address==""||$scope.inforgather.address==undefined||$scope.inforgather.address==null){
            dhx_alert("请填写地址！")
        }else if($scope.inforgather.area.text==""||$scope.inforgather.area.text==undefined||$scope.inforgather.area.text==null){
            dhx_alert("请选择油田区块！")
        }else if($scope.inforgather.oilfield==""||$scope.inforgather.oilfield==undefined||$scope.inforgather.oilfield==null){
            dhx_alert("请填写油田！")
        }else if($scope.inforgather.text==""||$scope.inforgather.text==undefined||$scope.inforgather.text==null){
            dhx_alert("请填写正文！")
        }else{
            // dhx_alert(JSON.stringify($scope.images))
            $http({
                method:'post',
                url:basePath+"api/v1.0/inforgather",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "gather_title":$scope.inforgather.title,
                    "gather_address":$scope.inforgather.address,
                    "gather_area":$scope.inforgather.area.text,
                    "gather_oilfield":$scope.inforgather.oilfield,
                    "gather_text":$scope.inforgather.text,
                    "images_list":JSON.stringify($scope.images)
                }
            }).success(function(res){
                if(res.response.success==1){
                    dhx_alert("新建情报搜集成功!",function(){
                        window.location.href="inforgather_list.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }
    $scope.back=function(){
        window.location.href="inforgather_list.html"
    }
});
