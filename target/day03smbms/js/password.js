var password={
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
    changePassword:function () {
        var userId = password.getCookieByName("userId");
        var oldPassword = $("#oldPassword").val();
        var newPassword = $("#newPassword").val();
        var reNewPassword = $("#reNewPassword").val();
        if(newPassword!==reNewPassword){
            window.alert("两次输入的密码不一致！");
        }else {
            $.get('/changePassword/'+userId+'/'+oldPassword+'/'+newPassword,function (data) {
                if(data.success){
                    window.alert(data.message);
                    user.logout();
                }else {
                    window.alert(data.message);
                }
            })
        }

    }
};