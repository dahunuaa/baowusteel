/**
 * Created by Administrator on 2017/1/2.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    $scope.guide_type = {
        type01 : {value: "bijixiaojie",text: "笔记小结"},
        type02 : {value: "yonghuxinxi", text: "用户信息"},
        type03 : {value: "chanpinxinxi", text: "产品信息"},
        type04 : {value: "hangyexinxi", text: "行业信息"},
        type05 : {value: "gongsixinwen", text: "公司新闻"}
    };

    $scope.inforguide = {};

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
        if ($scope.inforguide.title==""||$scope.inforguide.title==undefined||$scope.inforguide.title==null){
            dhx_alert("请填写标题！")
        }else if($scope.inforguide.type.text==""||$scope.inforguide.type.text==undefined||$scope.inforguide.type.text==null){
            dhx_alert("请选择分类！")
        }else if($scope.inforguide.text==""||$scope.inforguide.text==undefined||$scope.inforguide.text==null){
            dhx_alert("请填写正文！")
        }else{
            var  file = document.getElementById("file_upload").files[0];
            var formData = new FormData($("#uploadForm")[0]);
            formData.append("access_token",localStorage.getItem("token"))
            if(file!=""&&file!=undefined){
                $.ajax({
                    type:'post',
                    url:basePath+"api/v1.0/file/upload",
                    data:formData,
                    async: false,
                    contentType:false,
                    processData:false,
                    dataType:"json",
                    success:function(res){
                        window.filepath = res.response.data.file_path
                        window.filename = res.response.data.file_name
                    },
                    error:function(data){
                        plus.nativeUI.toast("上传失败！");
                    }
                })
            }
            $http({
                method:'post',
                url:basePath+"api/v1.0/inforguide",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "guide_title":$scope.inforguide.title,
                    "guide_type":$scope.inforguide.type.text,
                    "guide_text":$scope.inforguide.text,
                    "filename":window.filename,
                    "filepath":window.filepath,
                    "images_list":JSON.stringify($scope.images)
                }
            }).success(function(res){
                if(res.response.success==1){
                    dhx_alert("新建信息指南成功!",function(){
                        window.location.href="infor_guide_list.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }
    $scope.back=function(){
        window.location.href="infor_guide_list.html"
    }
});
