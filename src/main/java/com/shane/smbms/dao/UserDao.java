package com.shane.smbms.dao;

import com.shane.smbms.entity.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {
    /**
     * 插入一条用户信息
     * @param user
     * @return
     */
    int insertUser(@Param("user") User user);

    /**
     * 根据用户名称查找用户
     * @param userName
     * @return
     */
    @Select("select * from smbms_user where userName=#{userName}")
    User selectUserByUserName(@Param("userName") String userName);


    @Select("select * from smbms_user where userName like concat('%',#{userName},'%')")
    List<User> selectUserListByUserName(@Param("userName") String userName);

    @Select("select * from smbms_user where userCode=#{userCode}")
    User selectUserByUserCode(@Param("userCode") String userCode);

    /**
     * 根据id查询用户
     * @param id
     * @return
     */
    @Select("select * from smbms_user where id=#{id}")
    User selectUserById(@Param("id")long id);


    /**
     * 返回所有用户
     * @return
     */
    @Select("select * from smbms_user")
    List<User> selectAllUser();

    /**
     * 根据user对象更新用户信息
     * @param user
     * @return
     */
    int updateUser(@Param("user") User user);

    @Update("update smbms_user set userPassword=#{user.userPassword} where id=#{user.id}")
    int updateUserPasswordById(@Param("user") User user);

    @Delete("delete from smbms_user where userCode=#{userCode}")
    int deleteUserByUserCode(@Param("userCode") String userCode);
}
