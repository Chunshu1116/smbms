package com.shane.smbms.dao;

import com.shane.smbms.entity.Bill;
import com.shane.smbms.vo.BillInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml","classpath:spring/spring-service.xml"})
public class BillDaoTest {
    @Autowired
    private BillDao billDao;

    @Test
    public void selectByBillCode() {
        Bill bi = billDao.selectByBillCode("a815e066df5c11eab0631eceacf6cc1b");
        System.out.println(bi);
    }

    @Test
    public void selectAll() {
        List<Bill> bills = billDao.selectAll();
        for (Bill bill : bills) {
            System.out.println(bill);
        }
    }

    @Test
    public void selectListByProductName() {
    }

    @Test
    public void insertBill() {


//        BillInfo billInfo = new BillInfo();
//        billInfo.setBillCode("df23rf");
//        billInfo.setIsPayment(1);
//        billInfo.setProviderId(2);
//        billInfo.setProviderName("dfs");
//        Bill bill = new Bill();
//        BeanUtils.copyProperties(billInfo,bill);
//        System.out.println(bill);
    }

    @Test
    public void updateBill() {
        Bill bill = billDao.selectByBillCode("92de29f0df5d11eab0631eceacf6cc1b");
        System.out.println(bill);
        bill.setTotalPrice(new BigDecimal("1000"));
        billDao.updateBill(bill);
    }

    @Test
    public void deleteByBillCode() {
    }

    @Test
    public void testGetBillInfoByBillCode(){
        BillInfo billInfo = billDao.getBillInfoByBillCode("a815e066df5c11eab0631eceacf6cc1b");
        System.out.println(billInfo);
    }
}