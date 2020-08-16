package com.shane.smbms.dao;

import com.shane.smbms.entity.Bill;
import com.shane.smbms.vo.BillInfo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BillDao {
    @Select("select * from smbms_bill where billCode=#{billCode}")
    Bill selectByBillCode(@Param("billCode") String billCode);

    @Select("select * from smbms_bill")
    List<Bill> selectAll();

    @Select("select * from smbms_bill where productName like concat('%',#{productName},'%')")
    List<Bill> selectListByProductName(@Param("productName") String productName);

    int insertBill(@Param("bill") Bill bill);

    int updateBill(@Param("bill") Bill bill);

    @Delete("delete from smbms_bill where billCode=#{billCode}")
    int deleteByBillCode(@Param("billCode") String billCode);


    BillInfo getBillInfoByBillCode(@Param("billCode") String billCode);
}
