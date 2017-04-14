var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    init();
    var img1='';
    var img2='';
    var img3='';

    $scope.m1='';
    $scope.m2='';
    $scope.m3='';
    $scope.images=[$scope.m1,$scope.m2,$scope.m3];

    function init(){
        if(localStorage.getItem("token") == undefined || localStorage.getItem("token") == null){
        }else{
            var url=window.location.href;
            if(url.split('?').length==2){
                var back=url.split('?')[1];
                $scope._id = back;
            }

            $http.get(basePath+"api/v1.0/inforgather/"+$scope._id+"?"+"&access_token="+localStorage.getItem("token"))
                .success(function(res){
                    if(res.response.success == 1){
                        $scope.data = res.response.data;
                        $scope.src_gather_title = res.response.data.gather_title;
                        $scope.src_gather_address = res.response.data.gather_address;
                        $scope.src_gather_area = res.response.data.gather_area;
                        $scope.src_gather_oilfield = res.response.data.gather_oilfield;
                        $scope.src_gather_text = res.response.data.gather_text;
                        $scope.img1 = res.response.data.images[0];
                        $scope.img2 = res.response.data.images[1];
                        $scope.img3 = res.response.data.images[2];

                    }else{
                        dhx_alert(res.response.return_code)
                    }
                })
        }
    }

    $scope.gather_areas = {
        area01 : {value: "dongbei",text: "东北"},
        area02 : {value: "xinan", text: "西南"},
        area03 : {value: "zhonghaiyou", text: "中海油"},
        area04 : {value: "huabei", text: "华北"},
        area05 : {value: "huazhong", text: "华中"},
        area06 : {value: "huadong",text: "华东"},
        area07 : {value: "xinjiang", selected: "1", text: "新疆"}
    };

    $scope.inforgather = {};

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

//返回
    $scope.back = function(){
        window.location.href = "self_inforgather.html"
    };


//确认修改
    $scope.do_edit = function(){
        if($scope.m1 == ""){
            $scope.m1 = $scope.img1
        } if($scope.m2 == ""){
            $scope.m2 = $scope.img2
        } if($scope.m3 == ""){
            $scope.m3 = $scope.img3
        }

        if ($scope.src_gather_title==""||$scope.src_gather_title==undefined||$scope.src_gather_title==null){
            dhx_alert("请填写标题！")
        }else if($scope.src_gather_address==""||$scope.src_gather_address==undefined||$scope.src_gather_address==null){
            dhx_alert("请填写地址！")
        }else if($scope.src_gather_area.text==""||$scope.src_gather_area.text==undefined||$scope.src_gather_area.text==null){
            dhx_alert("请选择油田区块！")
        }else if($scope.src_gather_oilfield==""||$scope.src_gather_oilfield==undefined||$scope.src_gather_oilfield==null){
            dhx_alert("请填写油田！")
        }else if($scope.src_gather_text==""||$scope.src_gather_text==undefined||$scope.src_gather_text==null){
            dhx_alert("请填写正文！")
        }else {
            $scope.images = [$scope.m1,$scope.m2,$scope.m3];

            $http({
                method:'put',
                url:basePath+"api/v1.0/inforgather/"+$scope._id,
                params:{
                    "access_token":localStorage.getItem("token"),
                    "gather_title":$scope.src_gather_title,
                    "gather_address":$scope.src_gather_address,
                    "gather_area":$scope.src_gather_area.text,
                    "gather_oilfield":$scope.src_gather_oilfield,
                    "gather_text":$scope.src_gather_text,
                    "images_list":JSON.stringify($scope.images)}
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("修改成功",function(){
                        window.location.href = "self_inforgather.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }


    };

});

