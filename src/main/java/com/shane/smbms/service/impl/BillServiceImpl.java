package com.shane.smbms.service.impl;

import com.shane.smbms.dao.BillDao;
import com.shane.smbms.dao.ProviderDao;
import com.shane.smbms.entity.Bill;
import com.shane.smbms.entity.Provider;
import com.shane.smbms.service.BillService;
import com.shane.smbms.vo.BillInfo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private BillDao billDao;

    @Autowired
    private ProviderDao providerDao;

    @Override
    public List<Bill> queryAll() {
        return billDao.selectAll();
    }

    @Override
    public Bill queryByBillCode(String billCode) {
        return billDao.selectByBillCode(billCode);
    }

    @Override
    public List<Bill> queryListByProductName(String productName) {
        return billDao.selectListByProductName(productName);
    }

    @Override
    public int modifyBill(BillInfo billInfo, long id) {
        Bill bill = new Bill();
        BeanUtils.copyProperties(billInfo,bill);
        Date date = new Date();
        bill.setModifyDate(date);
        bill.setModifyBy(id);
        return billDao.updateBill(bill);
    }

    @Override
    public BillInfo getBillInfoByBillCode(String billCode) {
        return billDao.getBillInfoByBillCode(billCode);
    }

    @Override
    public int removeByBillCode(String billCode) {
        return billDao.deleteByBillCode(billCode);
    }

    @Override
    public int addBill(BillInfo billInfo,long id) {
        Bill bill = new Bill();
        BeanUtils.copyProperties(billInfo, bill);
        Date date = new Date();
        bill.setCreatedBy(id);
        bill.setModifyBy(id);
        bill.setCreationDate(date);
        bill.setModifyDate(date);
        return billDao.insertBill(bill);
    }
}
