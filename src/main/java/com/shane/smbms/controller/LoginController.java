package com.shane.smbms.controller;

import com.shane.smbms.common.CommonResult;
import com.shane.smbms.entity.User;
import com.shane.smbms.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class LoginController {
    @Autowired
    private UserService userService;

    @GetMapping("/login/{username}/{password}")
    public CommonResult login(@PathVariable String username, @PathVariable String password, HttpSession session){
        User user = userService.queryUserByUserName(username);
        if(user==null){
            return CommonResult.error().message("用户名不存在");
        }else {
            if(user.getUserPassword().equals(password)){
                session.setAttribute("user",user.getUserName());
                session.setMaxInactiveInterval(30*60);
                return CommonResult.ok().data("user",user);
            }else {
                return CommonResult.error().message("密码错误");
            }
        }
    }

    @GetMapping("/changePassword/{id}/{oldPwd}/{newPwd}")
    public CommonResult changePassword(@PathVariable("id") long id, @PathVariable("oldPwd") String oldPwd,@PathVariable("newPwd") String newPwd){
        User user = userService.queryUserById(id);
        if(user.getUserPassword().equals(newPwd)){
            return CommonResult.error().message("新密码不能与旧密码相同");
        }else if(!user.getUserPassword().equals(oldPwd)){
            return CommonResult.error().message("旧密码输入错误");
        }else {
            user.setUserPassword(newPwd);
            int i = userService.updateUserPasswordById(user);
            if(i<=0){
                return CommonResult.error().message("密码修改失败!");
            }else {
                String password = userService.queryUserById(id).getUserPassword();
                return CommonResult.ok().message("密码修改成功!新密码修改为："+password);
            }
        }
    }

//    @GetMapping("/oldPassword/{id}")
//    public CommonResult getOldPassword(@PathVariable("id") long id){
//        User user = userService.queryUserById(id);
//        if(user)
//        String userPassword = user.getUserPassword();
//
//    }
}
