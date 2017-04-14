var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    var get_url  ="api/v1.0/inforgather?";//get数据接口
    var del_url  ="api/v1.0/inforgather";//删除接口
    var edit_url ="edit_inforgather.html?";
    var detail_url ="../infor_gather/detail_infor_gather.html?";//点击详情跳转地址



    var myGrid;// 声明表格
    var myCalendar;//声明时间插件
    $scope.selected = [];//定义一个数组（用于批量删除）
    init();//初始化

    var get_data = new Array();


    function init(){
        if(localStorage.getItem("token") == undefined ||localStorage.getItem("token") == null){
            window.location.href = "../../../../mui workspace/miniui/login.html"
        }else{
            //建页
            myGrid = new dhtmlXGridObject('gridbox');
            myGrid.setImagePath("../dhtmlxSuite/sources/dhtmlxGrid/codebase/imgs/");//表格图标路径
            myGrid.setHeader("编辑人,标题,地址,油田区块,油田,添加时间,最后编辑时间,修改,删除,详情");//设置表头
            myGrid.attachHeader("<input class='search' style='width: 100px' type='text' id='parame_a'>," +
                "<input class='search' style='width: 100px' type='text' id='parame_b'>," +
                "<input class='search' style='width: 100px' type='text' id='parame_c'>," +
                "<input class='search' style='width: 120px' type='text' id='parame_d'>," +
                "<input class='search' style='width: 40px' type='text' id='parame_e'>," +
                "&nbsp;" +
                "&nbsp;" +
                "&nbsp;" +
                "&nbsp;"+
                "&nbsp;");
            myGrid.setInitWidths("130,200,200,100,200,160,160,65,65,65");//设置表格初始宽度
            myGrid.setColAlign("left,left,left,left,left,left,left,left,left,left");//数据显示位置
            myGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");//数据呈现类型
            //myGrid.setColSorting("price,str,int,price,date,int");//设置各列排序类型
            myGrid.enableAutoWidth(true);
            myGrid.init();

            myGridjiazai(1);//加载数据
        }
    }

    function myGridjiazai(p){
        if($scope.so_edit_name == undefined){
            $scope.so_edit_name = ""
        }if($scope.so_address == undefined){
            $scope.so_address = ""
        }if($scope.so_oilfield == undefined) {
            $scope.so_oilfield = ""
        }
        $http.get(basePath+get_url+"access_token="+localStorage.getItem("token")+
            "&add_user_name^="+$scope.so_edit_name+
            "&gather_title^="+$scope.so_title+
            "&gather_address^="+$scope.so_address+
            "&gather_area^="+$scope.so_area+
            "&gather_oilfield^="+$scope.so_oilfield+
            "&page_size=15"+
            "&page="+p)
            .success(function(res){
                if(res.response.success == 1){
                    myGrid.clearAll();
                    $scope.pager = res.response.pager;
                    $scope.location_data = res.response.data;
                    $scope.max_page = res.response.pager.max_page;
                    $scope.enable = res.response.pager.enable;

                    var kk = document.getElementById("kk_page");

                    if($scope.enable == true){
                        kk.style.display = 'block';
                    }else{
                        kk.style.display = 'none'
                    }
                    //添加数据
                    get_data = $scope.location_data;

                    var str;
                    for(var i=0; i < get_data.length;i++){

                        str = get_data[i]._id;
                        get_data[i].index = i+1;
                        //var yanse = ;
                        //if(get_data[i].status == 1){
                        //    get_data[i].status = "生效"
                        //}else{
                        //    get_data[i].status = "无效"
                        //}
                        myGrid.addRow(str,[
                            get_data[i].add_user_name,
                            get_data[i].gather_title,
                            get_data[i].gather_address,
                            get_data[i].gather_area,
                            get_data[i].gather_oilfield,
                            get_data[i].add_time,
                            get_data[i].last_updated_time,
                            "<div style='margin-top: 1px;padding: 0;;font-size: 20px' class='icon-ios-compose' id='edit'></div>",
                            "<div style='margin-top: 1px;padding: 0;;font-size: 20px' class='icon-ios-trash' id='delete'></div>",
                            "<div style='margin-top: 1px;padding: 0;;font-size: 20px' class='icon-ios-eye' id='detail'></div>",
                        ],i);
                    }

                    //分页  init
                    var totalPage =  $scope.max_page;
                    var totalRecords = $scope.max_page*20;
                    var pageNo = 1;


                    //生成分页
                    //有些参数是可选的，比如lang，若不传有默认值
                    kkpager.generPageHtml({
                        pno : pageNo,
                        //总页码
                        total : totalPage,
                        //总数据条数
                        totalRecords : totalRecords,
                        //链接前部
                        hrefFormer : 'pager_test',
                        //链接尾部
                        hrefLatter : '.html',
                        //getLink : function(n){
                        //	return this.hrefFormer + this.hrefLatter + "?pno="+n;
                        //}
                        mode : 'click',//默认值是link，可选link或者click
                        click : function(n){
                            this.selectPage(n);
                            myGridjiazai2(n);
                            return false;
                        }
                    });

                }else{
                    dhx_alert(res.response.return_code);
                }
            })
    }

    //刷新分页数据
    function page_change(p){
        if($scope.enable == true){
            kkpager.total = $scope.max_page;
            kkpager.pno = p
        }else{
            $scope.$apply();
        }



    }

    function myGridjiazai2(p){
        if($scope.so_edit_name == undefined){
            $scope.so_edit_name = ""
        }if($scope.so_address == undefined){
            $scope.so_address = ""
        }if($scope.so_oilfield == undefined) {
            $scope.so_oilfield = ""
        }
        $http.get(basePath+get_url+"access_token="+localStorage.getItem("token")+
            "&add_user_name^="+$scope.so_edit_name+
            "&gather_address^="+$scope.so_address+
            "&gather_oilfield^="+$scope.so_oilfield+
            "&page_size=15"+
            "&page="+p)
            .success(function(res){
                if(res.response.success == 1){
                    myGrid.clearAll();
                    $scope.pager = res.response.pager;
                    $scope.location_data = res.response.data;
                    $scope.max_page = res.response.pager.max_page;
                    $scope.enable = res.response.pager.enable;

                    var kk = document.getElementById("kk_page");

                    if($scope.enable == true){
                        kk.style.display = 'block';
                    }else{
                        kk.style.display = 'none'
                    }
                    //添加数据
                    get_data = $scope.location_data;

                    var str;
                    for(var i=0; i < get_data.length;i++){

                        str = get_data[i]._id;
                        get_data[i].index = i+1;
                        //var yanse = ;
                        //if(get_data[i].status == 1){
                        //    get_data[i].status = "生效"
                        //}else{
                        //    get_data[i].status = "无效"
                        //}
                        myGrid.addRow(str,[
                            get_data[i].add_user_name,
                            get_data[i].gather_title,
                            get_data[i].gather_address,
                            get_data[i].gather_area,
                            get_data[i].gather_oilfield,
                            get_data[i].add_time,
                            get_data[i].last_updated_time,
                            "<div style='margin-top: 1px;padding: 0;;font-size: 20px' class='icon-ios-compose' id='edit'></div>",
                            "<div style='margin-top: 1px;padding: 0;;font-size: 20px' class='icon-ios-trash' id='delete'></div>"
                        ],i);


                    }
                }else{
                    dhx_alert(res.response.return_code);
                }
            })
    }


    //点击查看详情
    $("table").on('click','#edit',function(){//$scope.this_row_id为当前行的_id
        if($scope.this_row_id==undefined){
            dhx_alert("未选中记录！")
        }else {
            window.location.href=edit_url+$scope.this_row_id//页面间传值直接在window.location.href后面加上就行
        }
    });
    $("table").on('click','#delete',function(){
        if($scope.this_row_id==undefined){
            dhx_alert("未选中记录！")
        }else {
            dhtmlx.confirm({
                type:"confirm",
                ok:"确定",
                cancel:"取消",
                text: "确认删除选中数据？",
                callback: function(result){
                    if(result == true){
                        $http.delete(basePath+del_url+"/"+$scope.this_row_id+"?"+"&access_token="+localStorage.getItem("token"))
                            .success(function(res){
                                    if(res.response.success == 1){
                                        dhx_alert("删除成功",function(){
                                            myGrid.clearAll();
                                            myGridjiazai(1);
                                            page_change(1);
                                            $scope.this_row_id = undefined
                                        });
                                    }else{
                                        dhx_alert(res.response.return_code)
                                    }
                                }
                            )
                    }else{
                    }
                }
            });
        }
    });

    //点击查看详情
    $("table").on('click','#detail',function(){//$scope.this_row_id为当前行的_id
        if($scope.this_row_id==undefined){
            dhx_alert("未选中记录！")
        }else {
            window.location.href=detail_url+$scope.this_row_id//页面间传值直接在window.location.href后面加上就行
        }
    });

    //选中任何row列表
    myGrid._doClick=function(ev){
        var selMethod = 0;
        var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target, "TD");
        $scope.this_row_id = el.parentNode.idd;


        if (!el || !el.parentNode || !el.parentNode.idd) return;
        var fl = true;

        //markers start
        if (this.markedCells){
            var markMethod = 0;

            if (ev.shiftKey||ev.metaKey){
                markMethod=1;
            }

            if (ev.ctrlKey){
                markMethod=2;
            }
            this.doMark(el, markMethod);
            return true;
        }
        if (this.selMultiRows != false){
            if (ev.shiftKey && this.row != null && this.selectedRows.length){
                selMethod=1;
            }

            if (ev.ctrlKey||ev.metaKey){
                selMethod=2;
            }
        }
        return this.doClick(el, fl, selMethod, false)
    };

    //查
    $("input:text").bind("input propertychange",function(){

        $scope.so_edit_name=document.getElementById("parame_a").value;
        $scope.so_title=document.getElementById("parame_b").value;
        $scope.so_address=document.getElementById("parame_c").value;
        $scope.so_area=document.getElementById("parame_d").value;
        $scope.so_oilfield=document.getElementById("parame_e").value;

        myGrid.clearAll();
        myGridjiazai(1);
        page_change(1);

    });


});