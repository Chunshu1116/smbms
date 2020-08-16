package com.shane.smbms.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.shane.smbms.dao.UserDao;
import com.shane.smbms.entity.User;
import com.shane.smbms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public int addUser(User user,long createdBy) {
        user.setCreatedBy(createdBy);
        user.setModifyBy(createdBy);
        Date date = new Date();
        user.setCreationDate(date);
        user.setModifyDate(date);
        return userDao.insertUser(user);
    }

    @Override
    public User queryUserByUserName(String userName) {
        return userDao.selectUserByUserName(userName);
    }

    @Override
    public User queryUserByUserCode(String userCode) {
        return userDao.selectUserByUserCode(userCode);
    }

    @Override
    public List<User> queryUserListByName(String userName) {
        return userDao.selectUserListByUserName(userName);
    }

    @Override
    public User queryUserById(long id) {
        return userDao.selectUserById(id);
    }

    @Override
    public List<User> queryAllUser(Integer page,Integer limit) {
        PageHelper.startPage(page, limit);
        return userDao.selectAllUser();
    }

    @Override
    public int removeUser(String userCode) {
        return userDao.deleteUserByUserCode(userCode);
    }

    @Override
    public int updateUserPasswordById(User user) {
        return userDao.updateUserPasswordById(user);
    }

    @Override
    public int updateUser(User user,long id) {
        user.setModifyBy(id);
        Date date = new Date();
        user.setModifyDate(date);
        return userDao.updateUser(user);
    }


}
