var bill={
    getBillList:function () {
        $.get('/bill/list',function (data) {
            if(data.success){
                var billList=data.data.bills;
                // console.log(billList);
                bill.showBillList(billList);
            }else {
                $("#table_billList tbody").html("");
            }
        })
    },
    showBillList:function (billList) {
        var text="";
        $("#table_billList tbody").html(text);
        for(var i in billList){
            var date = new Date(billList[i].creationDate);
            var createTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            text="<tr>\n" +
                "                    <td>"+billList[i].billCode+"</td>\n" +
                "                    <td>"+billList[i].productName+"</td>\n" +
                "                    <td>"+billList[i].proCode+"</td>\n" +
                "                    <td>"+billList[i].totalPrice+"</td>\n" +
                "                    <td>"+billList[i].isPayment+"</td>\n" +
                "                    <td>"+createTime+"</td>\n" +
                "                    <td>\n" +
                "                        <a  onclick=\"bill.goToBillViewPage()\"><img src=\"img/read.png\" alt=\"查看\" title=\"查看\"/></a>\n" +
                "                        <a  onclick=\"bill.goToBillUpdatePage()\"><img src=\"img/xiugai.png\" alt=\"修改\" title=\"修改\"/></a>\n" +
                "                        <a  onclick=\"bill.showRemoveBill()\" class=\"removeBill\"><img src=\"img/schu.png\" alt=\"删除\" title=\"删除\"/></a>\n" +
                "                    </td>\n" +
                "                </tr>";
            $("#table_billList tbody").append(text);
        }
    },
    getProviderInfoList:function(){
        $.get('/provider/proInfo',function (data) {
            if(data.success){
                var providerInfos=data.data.providerInfos;
                console.log(providerInfos);
                var text="";
                for(var i in providerInfos){
                    text=text+"<option value=\""+providerInfos[i].proCode+"\">"+providerInfos[i].proName+"</option>";
                }
                console.log(text);
                $("#select_provider").html(text);
                //$("#select_provider option:selected").val()   --选中的值
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
    setCookieByName:function (cookieName,value,time) {
        var date=new Date();
        date.setTime(date.getTime()+time*60*1000);
        document.cookie=cookieName+"="+value+"; expires="+date.toUTCString();
    },
    addBill:function () {
        var loginUserId=bill.getCookieByName("userId");
        console.log("isPayment------"+$(":radio:checked").val());
        console.log("proCode--------"+$("#select_provider option:selected").val());
        var bill_add={
            proCode:$("#select_provider option:selected").val(),
            productName:$("#billName").val(),
            productUnit:$("#billCom").val(),
            productCount:$("#billNum").val(),
            totalPrice:$("#money").val(),
            isPayment:$(":radio:checked").val()
        };
        console.log("bill_add--------");
        console.log(bill_add);
        var bill_add_json=JSON.stringify(bill_add);
        $.ajax({
            type:'POST',
            url:'/bill/add/'+loginUserId,
            data:bill_add_json,
            contentType: "application/json",
            success:function (data) {
                if(data.success){
                    window.alert(data.message);
                    window.location="billList.html";
                }else {
                    window.alert(data.message);
                }
            }
        });
    },
    goToBillViewPage:function(){
        $("#table_billList tbody tr").click(function () {
            var billCode_view=$(this).children().eq(0).html();
            bill.setCookieByName("viewingBillCode",billCode_view,5);
        });
        // console.log("11111111111111");
        window.location="billView.html";
    },
    printBillInfoToForm:function(){
        var billCode_view = bill.getCookieByName("viewingBillCode");
        console.log("billCode_view-----"+billCode_view);
        $.get('/bill/billInfo/'+billCode_view,function (data) {
            var billInfo_view =data.data.billInfo;
            var text="";
            console.log("billInfo_view-----------");
            console.log(billInfo_view);
            text="<p><strong>订单编号：</strong><span>"+billInfo_view.billCode+"</span></p>\n" +
                "            <p><strong>商品名称：</strong><span>"+billInfo_view.productName+"</span></p>\n" +
                "            <p><strong>商品单位：</strong><span>"+billInfo_view.productUnit+"</span></p>\n" +
                "            <p><strong>商品数量：</strong><span>"+billInfo_view.productCount+"</span></p>\n" +
                "            <p><strong>总金额：</strong><span>"+billInfo_view.totalPrice+"</span></p>\n" +
                "            <p><strong>供应商：</strong><span>"+billInfo_view.proName+"</span></p>\n" +
                "            <p><strong>是否付款：</strong><span>"+billInfo_view.isPayment+"</span></p>\n" +
                "\n" +
                "            <a href=\"billList.html\">返回</a>";
            $("#info_viewingBill").html(text);
        })
    },
    goToBillUpdatePage:function () {
        $("#table_billList tbody tr").click(function () {
            var billCode_view=$(this).children().eq(0).html();
            bill.setCookieByName("modifyingBillCode",billCode_view,5);
        });
        // console.log("11111111111111");
        window.location="billUpdate.html";
    },
    printOriBillInfoToForm:function () {
        var billCode_modify = bill.getCookieByName("modifyingBillCode");
        $.get('/bill/billInfo/'+billCode_modify,function (data) {
            var billInfo_modify =data.data.billInfo;
            $("#productName").val(billInfo_modify.productName);
            $("#productUnit").val(billInfo_modify.productUnit);
            $("#productCount").val(billInfo_modify.productCount);
            $("#totalPrice").val(billInfo_modify.totalPrice);
            $(":radio:checked").val(billInfo_modify.isPayment);

            bill.getProviderInfoList();
            $("#select_provider option:selected").val(billInfo_modify.proCode);
        })
    },
    modifyBill:function () {
        var billCode_modify = bill.getCookieByName("modifyingBillCode");
        var billInfo_modify={
            // proName:$("#productName").val(),
            billCode:billCode_modify,
            proCode:$("#select_provider option:selected").val(),
            productName:$("#productName").val(),
            productUnit:$("#productUnit").val(),
            productCount:$("#productCount").val(),
            totalPrice:$("#totalPrice").val(),
            isPayment:$(":radio:checked").val()
        }
        var loginUserId=bill.getCookieByName("userId");
        var billInfo_modify_json=JSON.stringify(billInfo_modify);
        console.log(billInfo_modify_json);
        $.ajax({
            type:'PUT',
            url:'/bill/modify/'+loginUserId,
            data:billInfo_modify_json,
            contentType: "application/json",
            success:function (data) {
                console.log("11111111111111");
                console.log(data);
                if(data.success){
                    window.alert(data.message);
                    window.location="billList.html";
                }else {
                    window.alert(data.message);
                }
            }
        });
    },
    showRemoveBill:function () {
        $("#table_billList tbody tr").click(function () {
            var billCode_delete=$(this).children().eq(0).html();
            bill.setCookieByName("deleteBillCode",billCode_delete,5);
        });
        $("#removeBill").show();
    },
    removeBill:function () {
        var deleteBillCode = bill.getCookieByName("deleteBillCode");
        $.ajax({
            type:'DELETE',
            url:'/bill/remove/'+deleteBillCode,
            success:function () {
                bill.hideRemovePro();
                window.location="billList.html";
            }
        })
    },
    hideRemovePro:function () {
        $("#removeBill").hide();
    }
};