package com.shane.smbms.service;

import com.shane.smbms.entity.Bill;
import com.shane.smbms.vo.BillInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BillService {
    int addBill(BillInfo billInfo,long id);

    int modifyBill(BillInfo billInfo,long id);

    List<Bill> queryAll();

    Bill queryByBillCode(String billCode);

    List<Bill> queryListByProductName(String productName);

    int removeByBillCode(String billCode);

    BillInfo getBillInfoByBillCode(String billCode);
}
