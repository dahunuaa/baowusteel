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

            $http.get(basePath+"api/v1.0/inforguide/"+$scope._id+"?"+"&access_token="+localStorage.getItem("token"))
                .success(function(res){
                    if(res.response.success == 1){
                        $scope.data = res.response.data;
                        $scope.src_guide_title = res.response.data.guide_title;
                        $scope.src_guide_type = res.response.data.guide_type;
                        $scope.src_guide_text = res.response.data.guide_text;
                        $scope.img1 = res.response.data.images[0];
                        $scope.img2 = res.response.data.images[1];
                        $scope.img3 = res.response.data.images[2];

                    }else{
                        dhx_alert(res.response.return_code)
                    }
                })
        }
    }

    $scope.guide_type = {
        type01 : {value: "bijixiaojie",text: "笔记小结"},
        type02 : {value: "yonghuxinxi", text: "用户信息"},
        type03 : {value: "chanpinxinxi", text: "产品信息"},
        type04 : {value: "hangyexinxi", text: "行业信息"},
        type05 : {value: "gongsixinwen", text: "公司新闻"}
    };


    $scope.inforguide = {};

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
        window.location.href = "self_inforguide.html"
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

        if ($scope.src_guide_title==""||$scope.src_guide_title==undefined||$scope.src_guide_title==null){
            dhx_alert("请填写标题！")
        }else if($scope.src_guide_type.text==""||$scope.src_guide_type.text==undefined||$scope.src_guide_type.text==null){
            dhx_alert("请选择类别！")
        }else if($scope.src_guide_text==""||$scope.src_guide_text==undefined||$scope.src_guide_text==null){
            dhx_alert("请填写正文！")
        }else {
            $scope.images = [$scope.m1,$scope.m2,$scope.m3];

            $http({
                method:'put',
                url:basePath+"api/v1.0/inforguide/"+$scope._id,
                params:{
                    "access_token":localStorage.getItem("token"),
                    "guide_title":$scope.src_guide_title,
                    "guide_type":$scope.src_guide_type.text,
                    "guide_text":$scope.src_guide_text,
                    "images_list":JSON.stringify($scope.images)}
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("修改成功",function(){
                        window.location.href = "self_inforguide.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }


    };

});

