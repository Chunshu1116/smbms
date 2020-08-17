var user={
    URL:{

    },
    login:function(){
        var username=$("#user").val();
        var password=$("#mima").val();
        $.get('/login/'+username+"/"+password,function (data) {
            if(data.success){
                //登录成功
                var user=data.data.user;
                var date=new Date();
                date.setTime(date.getTime()+24*60*60*1000);
                document.cookie="userName="+username+"; expires="+date.toUTCString();
                document.cookie="userId="+user.id+"; expires="+date.toUTCString();
                window.location="welcome.html";
            }else {
                console.log(data.message);
                $("#login_message").text(data.message);
            }
        })
    },
    loginUser:{
        userName:"",
        id:""

    },
    modifyingUser:{
        id:"",
        userCode:"",
        userName:"",
        gender:"",
        birthday:"",
        phone:"",
        address:"",
        userType:""
    },
    viewingUser:{
        userCode:"",
        userName:"",
        gender:"",
        birthday:"",
        phone:"",
        address:"",
        userType:""
    },
    deleteUserCode:"",
    //根据username查询到user
    getUserByUserName:function(){
        var userName_search=$("#search_userName").val();
        if (userName_search===""||userName_search===undefined){
            window.location="userList.html";
            return;
        }
        $.get('/user/list/userName/'+userName_search,function (data) {
            if(data.success){
                var usersByName=data.data.users;
                console.log(usersByName);
                var text="";
                $("#table_userList tbody").html(text);
                for(var i in usersByName){
                    var nowYear=new Date().getFullYear();   //2020
                    var age = nowYear-new Date(usersByName.birthday).getFullYear();
                    text="<tr>\n" +
                        "                    <td>"+usersByName[i].userCode+"</td>\n" +
                        "                    <td>"+usersByName[i].userName+"</td>\n" +
                        "                    <td>"+user.getUserGender(usersByName[i].gender)+"</td>\n" +
                        "                    <td>"+age+"</td>\n" +
                        "                    <td>"+usersByName[i].phone+"</td>\n" +
                        "                    <td>"+user.getUserType(usersByName[i].userType)+"</td>\n" +
                        "                    <td>\n" +
                        "                        <a onclick=\"user.goToUserViewPage()\"><img src=\"../img/read.png\" alt=\"查看\" title=\"查看\"/></a>\n" +
                        "                        <a onclick=\"user.goToUserUpdatePage()\"><img src=\"../img/xiugai.png\" alt=\"修改\" title=\"修改\"/></a>\n" +
                        "                        <a onclick=\"user.showRemoveUser()\"><img src=\"../img/schu.png\" alt=\"删除\" title=\"删除\"/></a>\n" +
                        "                    </td>\n" +
                        "                </tr>";
                    $("#table_userList tbody").append(text);
                }
            }else {
                $("#table_userList tbody").html("");
            }
        })
    },
    //根据userCode查询到user
    getUserByUserCode:function(userCode){
        $.get('/user/info/userCode/'+userCode,function (data) {
            if(data.success){
                user.modifyingUser=data.data.user;
                // console.log(user.modifyingUser);
                $("#userName").val(user.modifyingUser.userName);
                $("#userGender").val(user.modifyingUser.gender);
                var oldBirthday = new Date(user.modifyingUser.birthday);
                var str_birthday=oldBirthday.getFullYear()+"-"+(oldBirthday.getMonth()+1)+"-"+oldBirthday.getDate();
                console.log(str_birthday);
                $("#data").val(str_birthday);
                $("#userphone").val(user.modifyingUser.phone);
                $("#userAddress").val(user.modifyingUser.address);
                var index=user.modifyingUser.userType-1;
                console.log("index="+index);
                $("input:radio").eq(index).prop("checked","checked");
            }
        })
    },
    //根据id查询到user
    getUserById:function(id){
        $.get('/user/info/id/'+id,function (data) {
            if(data.success){
                return data.data.user;
            }else {
                return "error";
            }
        })
    },
    showUserList:function (userList){
        var text="";
        $("#table_userList tbody").html(text);
        for(var i in userList){
            var nowYear=new Date().getFullYear();   //2020
            var age = nowYear-new Date(userList[i].birthday).getFullYear();
            text="<tr>\n" +
                "                    <td>"+userList[i].userCode+"</td>\n" +
                "                    <td>"+userList[i].userName+"</td>\n" +
                "                    <td>"+user.getUserGender(userList[i].gender)+"</td>\n" +
                "                    <td>"+age+"</td>\n" +
                "                    <td>"+userList[i].phone+"</td>\n" +
                "                    <td>"+user.getUserType(userList[i].userType)+"</td>\n" +
                "                    <td>\n" +
                "                        <a onclick=\"user.goToUserViewPage()\"><img src=\"../img/read.png\" alt=\"查看\" title=\"查看\"/></a>\n" +
                "                        <a onclick=\"user.goToUserUpdatePage()\"><img src=\"../img/xiugai.png\" alt=\"修改\" title=\"修改\"/></a>\n" +
                "                        <a onclick=\"user.showRemoveUser()\"><img src=\"../img/schu.png\" alt=\"删除\" title=\"删除\"/></a>\n" +
                "                    </td>\n" +
                "                </tr>";
            $("#table_userList tbody").append(text);
        }
    },
    getUserList:function () {
        $.get('/user/list',function(data){
            var users=data.data.users;
            var userList=users.list;
            user.showUserList(userList);
            user.handleUserListPage(users);
        })
    },
    getUserPageList:function (page,limit) {
        $.get('/user/list?page='+page+"&limit="+limit,function(data){
            var users=data.data.users;
            var userList=users.list;
            user.showUserList(userList);
            user.handleUserListPage(users);
        })
    },
    handleUserListPage:function(users){
        var nowPage=users.pageNum;
        var totalPage=users.pages;
        console.log("nowPage:"+nowPage);
        console.log("totalPage:"+totalPage);
        //显示当前页的数据
        user.showUserList(users.list);
        var text="";
        text="<a class=\"page-current\" type=\"button\" onclick=\"user.getUserPageList(1,5)\"\n" +
            "                       aria-label=\"Previous\">首页</a>\n" +
            "\n" +
            "                    <a type=\"button\" class=\"previous-page\"\n" +
            "                       onclick=\"user.getUserPageList("+(nowPage-1)+",5)\">上一页</a>";

        for(var i=1;i<=totalPage;i++){
            text=text+"<a type=\"button\" onclick=\"user.getUserPageList("+i+",5)\">"+i+"</a>";
        }
        text=text+"<a type=\"button\" class=\"page-next\" onclick=\"user.getUserPageList("+(nowPage+1)+",5)\">下一页</a>\n" +
            "                    <a type=\"button\" onclick=\"user.getUserPageList("+totalPage+",5)\"\n" +
            "                       aria-label=\"Next\">尾页</a>";
        $("#user_page_bar").html(text);
    },
    //根据序号返回用户类型
    getUserType:function (userTypeNum) {
        if(userTypeNum===1){
            return "系统管理员";
        }else if(userTypeNum===2){
            return "经理";
        }else if (userTypeNum===3){
            return "普通员工";
        }else {
            return "未知";
        }
    },
    //根据序号返回用户性别
    getUserGender:function (userGenderNum) {
        if(userGenderNum===1){
            return "女";
        }else if(userGenderNum===2){
            return "男";
        }else{
            return "未知";
        }
    },
    //是否已登录，在login.html界面加载时执行
    isLogin:function(){
        user.getInfoFromCookie();
        if(user.loginUser.userName!==""){
            window.location="welcome.html";
        }
    },
    //从cookie中取出当前登录用户的userName和id
    getInfoFromCookie:function () {
        // if(user.loginUser.userName===""||user.loginUser.id===""){
            console.log("开始查找cookie了！！！！！！！")
            //获取cookie字符串
            var strCookie=document.cookie;
            // console.log(strCookie);
            //将多cookie切割为多个名/值对
            var arrCookie=strCookie.split("; ");
            // var userName;
            for(var i=0;i<arrCookie.length;i++){
                // console.log(arrCookie[i]);
                var arr=arrCookie[i].split("=");
                if(arr[0]==="userName"){
                    user.loginUser.userName=arr[1];
                }else if(arr[0]==="userId"){
                    user.loginUser.id=arr[1];
                }else if(arr[0]==="modifyUserCode"){
                    user.modifyingUser.userCode=arr[1];
                }else if(arr[0]==="viewingUserCode"){
                    user.viewingUser.userCode=arr[1];
                }else if(arr[0]==="deleteUserCode"){
                    user.deleteUserCode=arr[1];
                }
            }
        // }
    },
    //把当前登录用户的用户名称显示到页面上
    getLoginUserName:function () {
        if(user.loginUser.userName===""){
            user.getInfoFromCookie();
        }
        // console.log(user.loginUser.userName);
        $("#loginUserName1").html(user.loginUser.userName);
        $("#loginUserName2").text(user.loginUser.userName);
    },
    //登出
    // logout:function () {
    //     user.getInfoFromCookie();
    //     var date=new Date();
    //     date.setTime(date.getTime()-24*60*60*1000);
    //     //登出时清空cookie
    //     // document.cookie="userName=x; expires="+date.toUTCString();
    //     // user.setCookieByName("userName",'',-1);
    //     // user.setCookieByName("userId",'',-1);
    //     document.cookie="userName="+user.loginUser.userName+"; expires="+date.toUTCString();
    //     document.cookie="userId="+user.loginUser.userName+"; expires="+date.toUTCString();
    //     // document.cookie="userId=x; expires="+date.toUTCString();
    //     window.location="../login.html";
    // },
    setCookieByName:function (cookieName,value,time) {
        var date=new Date();
        date.setTime(date.getTime()+time*60*1000);
        document.cookie=cookieName+"="+value+"; expires="+date.toUTCString();
    },
    //添加用户
    addUser:function () {
        var add_userCode = $("#userId").val();
        var add_userName = $("#userName").val();
        var add_userPassword = $("#userpassword").val();
        var add_userPasswordRe=$("#userRemi").val();
        var add_userGender = $("#userGender").val();
        var add_userBirthday = $("#data").val();
        var add_userPhone = $("#userphone").val();
        var add_userAddress = $("#userAddress").val();
        var add_userType = $(":radio:checked").val();
        var arrYMD=add_userBirthday.split("-");
        if(arrYMD.length!==3){
            $("#result_message_addUser").text("出生日期格式错误！");
            return;
        }
        var birthday = new Date();
        var year=arrYMD[0];
        var month=arrYMD[1];
        var day=arrYMD[2];
        birthday.setFullYear(year,month-1,day);
        if(user.loginUser.id===""){
            user.getInfoFromCookie();
        }
        if(add_userPassword!==add_userPasswordRe){
            $("#result_message_addUser").text("两次输入的密码不一致！");
        }else{
            var user_add={
                id:"",
                userCode:add_userCode,
                userName:add_userName,
                userPassword:add_userPassword,
                gender:add_userGender,
                birthday:birthday,
                phone:add_userPhone,
                address:add_userAddress,
                userType:add_userType,
                createdBy:"",
                creationDate:"",
                modifyBy:"",
                modifyDate:""
            };
            var user_add_json = JSON.stringify(user_add);
            $.ajax({
                type: 'POST',
                url: '/user/add/'+user.loginUser.id,
                data: user_add_json,
                contentType: "application/json",
                success: function (data) {
                    if(data.success){
                        //添加用户成功
                        window.alert(data.message);
                        window.location="userList.html";
                    }else {
                        //添加用户失败
                        window.alert(data.message);
                    }
                }
            });
        }
    },
    //修改用户信息
    modifyUser:function () {
        var modify_userName = $("#userName").val();
        var modify_userGender = $("#userGender").val();
        var modify_birthday = $("#data").val();
        var modify_userPhone = $("#userphone").val();
        var modify_userAddress = $("#userAddress").val();
        var modify_userType = $(":radio:checked").val();
        var arrYMD=modify_birthday.split("-");
        if(arrYMD.length!==3){
            $("#result_message_modifyUser").text("出生日期格式错误！");
            return;
        }
        var birthday = new Date();
        var year=arrYMD[0];
        var month=arrYMD[1];
        var day=arrYMD[2];
        birthday.setFullYear(year,month-1,day);
        if(user.modifyingUser.id===""){
            user.getInfoFromCookie();
        }
        var user_modify={
            id:user.modifyingUser.id,
            userCode:"",
            userName:modify_userName,
            userPassword:"",
            gender:modify_userGender,
            birthday:birthday,
            phone:modify_userPhone,
            address:modify_userAddress,
            userType:modify_userType,
            createdBy:"",
            creationDate:"",
            modifyBy:"",
            modifyDate:""
        };
        var user_modify_json = JSON.stringify(user_modify);
        $.ajax({
            type: 'PUT',
            url: '/user/modify/'+user.loginUser.id,
            data: user_modify_json,
            contentType: "application/json",
            success: function (data) {
                if(data.success){
                    //添加用户成功
                    window.alert(data.message);
                    window.location="userList.html";
                }else {
                    //添加用户失败
                    window.alert(data.message);
                }
            }
        });
    },
    //点击修改用户按钮的事件
    goToUserUpdatePage:function () {
        $("#table_userList tbody tr").click(function () {
            //点击用户列表
            user.modifyingUser.userCode=$(this).children().eq(0).html();
            var date=new Date();
            date.setTime(date.getTime()+60*60*1000);
            document.cookie="modifyUserCode="+user.modifyingUser.userCode+"; expires="+date.toUTCString();
            window.location="userUpdate.html";
        })
    },
    //把要修改的用户信息打印到表单中
    printModifyUserInfo:function () {
        if(user.modifyingUser.userCode===""){
            user.getInfoFromCookie();
        }
        if(user.modifyingUser.userCode!==""){
            user.getUserByUserCode(user.modifyingUser.userCode);
        }
    },
    goToUserViewPage:function () {
        $("#table_userList tbody tr").click(function () {
            //点击用户列表
            user.viewingUser.userCode=$(this).children().eq(0).html();
            var date=new Date();
            date.setTime(date.getTime()+60*60*1000);
            document.cookie="viewingUserCode="+user.viewingUser.userCode+"; expires="+date.toUTCString();
            window.location="userView.html";
        })
    },
    printViewUserInfo:function () {
        if(user.viewingUser.userCode===""){
            user.getInfoFromCookie();
        }
        if(user.viewingUser.userCode!==""){
            $.get('/user/info/userCode/'+user.viewingUser.userCode,function (data) {
                if(data.success){
                    user.viewingUser=data.data.user;
                    $("#userCode").text(user.viewingUser.userCode);
                    $("#userName").text(user.viewingUser.userName);
                    $("#gender").text(user.viewingUser.gender);
                    var birthday = new Date(user.viewingUser.birthday);
                    var str_birthday=birthday.getFullYear()+"年"+(birthday.getMonth()+1)+"月"+birthday.getDate()+"日";
                    console.log(str_birthday);
                    $("#birthday").text(str_birthday);
                    $("#phone").text(user.viewingUser.phone);
                    $("#address").text(user.viewingUser.address);
                    var userTypeNum=user.viewingUser.userType;
                    $("#userType").text(user.getUserType(userTypeNum));
                }
            })
        }

    },
    showRemoveUser:function () {
        $("#table_userList tbody tr").click(function () {
            user.deleteUserCode=$(this).children().eq(0).html();
            console.log("user.deleteUserCode12222222222222222");
            console.log(user.deleteUserCode);
            var date=new Date();
            date.setTime(date.getTime()+5*60*1000);
            document.cookie="deleteUserCode="+user.deleteUserCode+"; expires="+date.toUTCString();
        });
        $("#removeUser").show();
    },
    removeUser:function () {
        if(user.deleteUserCode===""){
            user.getInfoFromCookie();
        }
        console.log("user.deleteUserCode1111111111111111");
        console.log(user.deleteUserCode);
        $.ajax({
            type:'DELETE',
            url:'/user/remove/'+user.deleteUserCode,
            success:function () {
                user.hideRemoveUser();
                window.location="userList.html";
            }
        })
    },
    hideRemoveUser:function () {
        $("#removeUser").hide();
    }
};