var login={
    login:function(){
        var username=$("#user").val();
        var password=$("#mima").val();
        $.get('/login/'+username+"/"+password,function (data) {
            if(data.success){
                //登录成功
                var user=data.data.user;
                login.setCookieByName("userName",username,60);
                login.setCookieByName("userId",user.id,60);
                window.location="admin/welcome.html";
            }else {
                console.log(data.message);
                $("#login_message").text(data.message);
            }
        })
    },
    logout: function () {
        var userName = login.getCookieByName("userName");
        var userId = login.getCookieByName("userId");
        login.setCookieByName("userName",userName,-1);
        login.setCookieByName("userId",userId,-1);
        // window.alert("userName:"+userName+"     ----userId:"+userId);
        window.location = "../login.html";
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
    }
};