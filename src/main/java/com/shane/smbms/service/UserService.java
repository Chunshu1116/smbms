package com.shane.smbms.service;

import com.shane.smbms.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserService {
    /**
     * 添加用户
     * @param user
     */
    int addUser(User user,long createdBy);

    User queryUserByUserName(String userName);

    User queryUserByUserCode(String userCode);

    List<User> queryUserListByName(String userName);

    User queryUserById(long id);

    List<User> queryAllUser(Integer page,Integer limit);

    int updateUser(User user,long id);

    int removeUser(String userCode);

    int updateUserPasswordById(User user);
}
