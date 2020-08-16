package com.shane.smbms.controller;


import com.github.pagehelper.PageInfo;
import com.shane.smbms.common.CommonResult;
import com.shane.smbms.entity.User;
import com.shane.smbms.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/add/{opId}",produces = {"application/json;charset=UTF-8"})
    public CommonResult addUser(@RequestBody User user,@PathVariable("opId") long opId){
        int i = userService.addUser(user, opId);
        if(i<=0){
            return CommonResult.error().message("添加用户失败");
        }else{
            return CommonResult.ok().message("添加用户成功");
        }
    }

    @RequestMapping(value = "/info/userName/{userName}",method = RequestMethod.GET,produces = {"application/json;charset=UTF-8"})
    public CommonResult queryUserByUserName(@PathVariable("userName") String userName){
        User user = userService.queryUserByUserName(userName);
        if(user==null){
            return CommonResult.error().message("未查询到用户");
        }
        return CommonResult.ok().data("user",user);
    }

    @RequestMapping(value = "/list",method = RequestMethod.GET,produces = {"application/json;charset=UTF-8"})
    public CommonResult queryAllUser(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "5") Integer limit){
        List<User> users = userService.queryAllUser(page, limit);

        //分页
        PageInfo<User> pageInfo=new PageInfo<>(users);
        return CommonResult.ok().data("users",pageInfo);
    }

    @GetMapping(value = "/list/userName/{userName}")
    public CommonResult queryUserListByUserName(@PathVariable("userName") String userName){
        List<User> users = userService.queryUserListByName(userName);
        if(!users.isEmpty()){
            return CommonResult.ok().data("users",users);
        }else {
            return CommonResult.error().message("未找到符合条件的数据");
        }

    }

    @GetMapping(value = "/info/id/{id}",produces = {"application/json;charset=UTF-8"})
    public CommonResult queryUserById(@PathVariable("id") long id){
        User user = userService.queryUserById(id);
        if(user==null){
            return CommonResult.error().message("未查询到用户");
        }
        return CommonResult.ok().data("user",user);
    }

    @GetMapping(value = "/info/userCode/{userCode}",produces = {"application/json;charset=UTF-8"})
    public CommonResult queryUserByUserCode(@PathVariable("userCode") String userCode){
        User user = userService.queryUserByUserCode(userCode);
        if(user==null){
            return CommonResult.error().message("未查询到用户");
        }
        return CommonResult.ok().data("user",user);
    }

    @PutMapping(value = "/modify/{opId}",produces = {"application/json;charset=UTF-8"})
    public CommonResult modifyUser(@RequestBody User user,@PathVariable("opId")long opId){
        int i = userService.updateUser(user, opId);
        if(i<=0){
            return CommonResult.error().message("修改用户信息失败");
        }else {
            return CommonResult.ok().message("修改用户信息成功");
        }
    }

    @DeleteMapping("/remove/{userCode}")
    public CommonResult removeUser(@PathVariable("userCode") String userCode){
        int i = userService.removeUser(userCode);
        if(i<=0){
            CommonResult.error().message("删除用户失败");
        }
        return CommonResult.ok().message("删除用户成功");
    }
}
