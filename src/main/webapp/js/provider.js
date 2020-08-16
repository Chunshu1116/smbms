var provider={
    //查找所有供应商信息
    getProviderList:function () {
        $.get('/provider/list',function (data) {
            if(data.success){
                var proList=data.data.providers;
                provider.showProList(proList);
            }else {
                $("#table_proList tbody").html("");
            }
        })
    },
    //根据providerList集合显示供应商列表
    showProList:function (proList) {
        var text="";
        $("#table_proList tbody").html(text);
        for(var i in proList){
            var date = new Date(proList[i].creationDate);
            var createTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            text="<tr>\n" +
                "                <td>"+proList[i].proCode+"</td>\n" +
                "                <td>"+proList[i].proName+"</td>\n" +
                "                <td>"+proList[i].proContact+"</td>\n" +
                "                <td>"+proList[i].proPhone+"</td>\n" +
                "                <td>"+proList[i].proFax+"</td>\n" +
                "                <td>"+createTime+"</td>\n" +
                "                <td>\n" +
                "                    <a onclick=\"provider.goToProViewPage()\"><img src=\"img/read.png\" alt=\"查看\" title=\"查看\"/></a>\n" +
                "                    <a onclick=\"provider.goToProUpdatePage()\"><img src=\"img/xiugai.png\" alt=\"修改\" title=\"修改\"/></a>\n" +
                "                    <a onclick=\"provider.showRemovePro()\"><img src=\"img/schu.png\" alt=\"删除\" title=\"删除\"/></a>\n" +
                "                </td>\n" +
                "            </tr>";
            $("#table_proList tbody").append(text);
        }
    },
    //根据供应商名称进行模糊查询
    getProviderListByProName:function () {
        var proName = $("#search_providerName").val();
        if(proName===""||proName===undefined){
            window.location="providerList.html";
        }
        $.get('/provider/list/proName/'+proName,function (data) {
            if(data.success){
                var proList=data.data.providers;
                provider.showProList(proList);
            }else {
                $("#table_proList tbody").html("");
            }
        })
    },
    getCookieByName:function (cookieName) {
        var strCookie=document.cookie;
        var arrCookie=strCookie.split("; ");
        for(var i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split("=");
            if(arr[0]===cookieName){
                return arr[1];
            }
        }
    },
    addProvider:function () {
        var loginUserId=provider.getCookieByName("userId");
        console.log("loginUserId-----------："+loginUserId);
        // var val = $("#providerId").val();
        var provider_add={
            // proCode:$("#providerId").val(),
            proName:$("#providerName").val(),
            proContact:$("#people").val(),
            proPhone:$("#phone").val(),
            proAddress:$("#address").val(),
            proFax:$("#fax").val(),
            proDesc:$("#describe").val()
        };
        var provider_add_json=JSON.stringify(provider_add);
        $.ajax({
            type:'POST',
            url:'/provider/add/'+loginUserId,
            data:provider_add_json,
            contentType: "application/json",
            success:function (data) {
                if(data.success){
                    window.alert(data.message);
                    window.location="providerList.html";
                }else {
                    window.alert(data.message);
                }
            }
        });
    },
    goToProViewPage:function () {
        $("#table_proList tbody tr").click(function () {
            var proCode_view = $(this).children().eq(0).html();
            var date=new Date();
            date.setTime(date.getTime()+5*60*1000);
            document.cookie="viewingProCode="+proCode_view+"; expires="+date.toUTCString();
        });
        window.location="providerView.html";
    },
    printProInfoToForm:function () {
        var proCode_view=provider.getCookieByName("viewingProCode");
        // console.log("proCode_view---------");
        // console.log(proCode_view);
        $.get('/provider/info/code/'+proCode_view,function (data) {
            var viewingPro=data.data.provider;
            // console.log("viewingPro------------");
            // console.log(viewingPro);
            var text="";
            text=
                // "<p><strong>供应商编码：</strong><span>"+viewingPro.proCode+"</span></p>\n" +
                "            <p><strong>供应商名称：</strong><span>"+viewingPro.proName+"</span></p>\n" +
                "            <p><strong>联系人：</strong><span>"+viewingPro.proContact+"</span></p>\n" +
                "            <p><strong>联系电话：</strong><span>"+viewingPro.proPhone+"</span></p>\n" +
                "            <p><strong>传真：</strong><span>"+viewingPro.proFax+"</span></p>\n" +
                "            <p><strong>描述：</strong><span>"+viewingPro.proDesc+"</span></p>\n" +
                "\n" +
                "            <a href=\"providerList.html\">返回</a>";
            $("#info_viewingPro").html(text);
        });
    },
    goToProUpdatePage:function () {
        $("#table_proList tbody tr").click(function () {
            var proCode_update = $(this).children().eq(0).html();
            var date=new Date();
            date.setTime(date.getTime()+5*60*1000);
            document.cookie="updateProCode="+proCode_update+"; expires="+date.toUTCString();
        });
        window.location="providerUpdate.html";
    },
    printOriProInfoToForm:function () {
        var proCode_update=provider.getCookieByName("updateProCode");
        console.log("proCode_update-------");
        console.log(proCode_update);
        $.get('/provider/info/code/'+proCode_update,function (data) {
            if(data.success){
                var pro=data.data.provider;
                var date=new Date();
                date.setTime(date.getTime()+5*60*1000);
                document.cookie="updateProId="+pro.id+"; expires="+date.toUTCString();
                $("#providerId").val(pro.proCode);
                $("#providerName").val(pro.proName);
                $("#people").val(pro.proContact);
                $("#phone").val(pro.proPhone);
                $("#address").val(pro.proAddress);
                $("#fax").val(pro.proFax);
                $("#describe").val(pro.proDesc);
            }
        });
    },
    modifyPro:function () {
        var userId = provider.getCookieByName("userId");
        var proId = provider.getCookieByName("updateProId");
        // console.log("userId:"+userId);
        // console.log("proId:"+proId);
        var provider_update={
            id:proId,
            proCode:$("#providerId").val(),
            proName:$("#providerName").val(),
            proContact:$("#people").val(),
            proPhone:$("#phone").val(),
            proAddress:$("#address").val(),
            proFax:$("#fax").val(),
            proDesc:$("#describe").val()
        };
        var provider_update_json=JSON.stringify(provider_update);
        $.ajax({
            type:'PUT',
            url:'/provider/modify/'+userId,
            data:provider_update_json,
            contentType: "application/json",
            success:function (data) {
                if(data.success){
                    window.alert(data.message);
                    window.location="providerList.html";
                }else {
                    window.alert(data.message);
                }
            }
        });
    },
    showRemovePro:function () {
        $("#table_proList tbody tr").click(function () {
            var deleteProCode=$(this).children().eq(0).html();
            // console.log("2222222222222"+deleteProCode);
            $.get('/provider/info/code/'+deleteProCode,function (data) {
                if(data.success){
                    var pro=data.data.provider;
                    // console.log("333333333333333333"+pro.id);
                    var date=new Date();
                    date.setTime(date.getTime()+5*60*1000);
                    document.cookie="deleteProId="+pro.id+"; expires="+date.toUTCString();
                }
            });
        });
        $("#removeProv").show();
    },
    removePro:function () {
        var deleteProId = provider.getCookieByName("deleteProId");
        // console.log("111111deleteProId:"+deleteProId);
        $.ajax({
            type:'DELETE',
            url:'/provider/remove/'+deleteProId,
            success:function () {
                provider.hideRemovePro();
                window.location="providerList.html";
            }
        })
    },
    hideRemovePro:function () {
        $("#removeProv").hide();
    }
};