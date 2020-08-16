package com.shane.smbms.dao;

import com.shane.smbms.common.CodeUtil;
import com.shane.smbms.entity.User;
import com.shane.smbms.service.UserService;
import org.apache.ibatis.logging.stdout.StdOutImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml","classpath:spring/spring-service.xml"})
public class UserDaoTest {

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserService userService;

    @Test
    public void selectUserByUserName() {
        List<User> users = userDao.selectUserListByUserName("l");
        for (User user : users) {
            System.out.println(user);
        }
    }

    @Test
    public void testInsertUser(){
        User user = new User();
        user.setUserCode("3423uiyu");
        user.setUserName("chen");
        user.setUserPassword("111111");
        user.setGender(2);
        user.setBirthday(new Date(98,Calendar.NOVEMBER,16));
        user.setPhone("13266666666");
        user.setAddress("北京");
        user.setUserType(2);
        userService.addUser(user,1);
    }

    @Test
    public void testDate(){
//        Date date = new Date();
//        long time = date.getTime();
//        System.out.println(date);
//        Date date1 = new Date(time);
//        System.out.println(date1);

//        System.out.println(UUID.randomUUID().toString().substring(0,20).length());
//        System.out.println(UUID.randomUUID().toString());
        User user = new User();
        user.setUserPassword("123456");
        user.setId(1);
        userDao.updateUserPasswordById(user);
    }

    @Test
    public void testUpdateUser(){
        User user = userDao.selectUserById(541);
        System.out.println(user);
        user.setAddress("上海");
        user.setPhone("18723456789");
        Date date = new Date();
        user.setModifyDate(date);
        user.setModifyBy(1);
        userDao.updateUser(user);

        user = userDao.selectUserById(541);
        System.out.println(user);
    }
    @Test
    public void testDelete(){
        int d123 = userDao.deleteUserByUserCode("d123");
        System.out.println(d123);
    }
}