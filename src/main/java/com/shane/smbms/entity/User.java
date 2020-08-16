package com.shane.smbms.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    //主键id
    private long id;
    //用户编码
    private String userCode;
    //用户名
    private String userName;
    //密码
    private String userPassword;
    //性别（1=女，2=男）
    private int gender;
    //出生日期
    private Date birthday;
    //手机
    private String phone;
    //地址
    private String address;
    //用户类型（1：系统管理员、2：经理、3：普通员工）
    private int userType;
    //创建者
    private long createdBy;
    //创建时间
    private Date creationDate;
    //更新者
    private long modifyBy;
    //更新时间
    private Date modifyDate;
}
