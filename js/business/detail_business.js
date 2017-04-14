/**
 * Created by Administrator on 2017/1/4 0004.
 */
var app =angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
    var url=window.location.href;
    if(url.split('?').length==2){
        var back=url.split('?')[1];
        $scope._id = back;

    }
    init();
    var comment_data=new Array()

    function init(){
        if(localStorage.getItem("token") == undefined||localStorage.getItem("token")==null){
            window.localStorage.href = "../login.html"
        }else {
            $http.get(basePath+"api/v1.0/business/"+$scope._id+"?access_token="+localStorage.getItem("token"))
                .success(function(res){
                    if(res.response.success ==1){
                        $scope.data = res.response.data
                        comment_show();

                    }else {
                        dhx_alert(res.response.return_code)
                    }
                })
        }
    }

    function comment_show(){
        $http.get(basePath+"api/v1.0/comment?access_token="+localStorage.getItem('token')+"&comment_type=bussiness&text_id="+$scope._id)
            .success(function(res){
                if(res.response.success==1){
                    comment_data=res.response.data;
                    comment_list = document.getElementById("comment_gridbox")
                    angular.forEach(comment_data,function(data,index,array){
                        var li = document.createElement("dt")
                        li.innerHTML="<span id='com_name' style='font-size: 20px'>"+array[index].add_user_name+"</span>"+"&nbsp;&nbsp;&nbsp;"+"<span id='com_time'>"+array[index].add_time
                            +"</span>"+"<br>"+"<span id='com_text 'style='font-size: 20px;'>"+array[index].text+"</span>"+"<p></p>"+"<hr style='width: 60%'/>";
                        comment_list.appendChild(li)
                    })



                }else{
                    dhx_alert(res.response.return_code)
                }
            })
    }

    $scope.add_comment = function(){
        comment_content = document.getElementById("com_text").value
        $http({
            method:'post',
            url:basePath+"api/v1.0/comment",
            params:{
                "access_token":localStorage.getItem("token"),
                "comment_type":"bussiness",
                "text_id":$scope._id,
                "user_id":localStorage.getItem("mobile"),
                "text":comment_content

            }
        }).success(function(res){
            if(res.response.success=="1"){
                dhx_alert("提交评论成功",function(){
                    window.location.reload()
                })
            }
        })
    }

})