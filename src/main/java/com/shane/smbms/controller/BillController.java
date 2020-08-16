package com.shane.smbms.controller;

import com.shane.smbms.common.CommonResult;
import com.shane.smbms.entity.Bill;
import com.shane.smbms.service.BillService;
import com.shane.smbms.vo.BillInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.GET;
import java.util.List;

@RestController
@RequestMapping("/bill")
public class BillController {
    @Autowired
    private BillService billService;

    @GetMapping("/list")
    public CommonResult getBillList(){
        List<Bill> bills = billService.queryAll();
        if(bills.isEmpty()){
            return CommonResult.error().message("未找到任何账单数据");
        }
        return CommonResult.ok().data("bills",bills);
    }

    @GetMapping("/info/{billCode}")
    public CommonResult getBillByBillCode(@PathVariable("billCode") String billCode){
        Bill bill = billService.queryByBillCode(billCode);
        if(bill==null){
            return CommonResult.error().message("未找到此订单");
        }
        return CommonResult.ok().data("bill",bill);
    }

    @GetMapping("/billInfo/{billCode}")
    public CommonResult getBillInfoByBillCode(@PathVariable("billCode") String billCode){
        BillInfo billInfo = billService.getBillInfoByBillCode(billCode);
        if(billInfo==null){
            return CommonResult.error().message("未找到此订单");
        }
        return CommonResult.ok().data("billInfo",billInfo);
    }

    @PostMapping(value = "/add/{OpId}",produces = {"application/json;charset=UTF-8"})
    public CommonResult addBill(@RequestBody BillInfo billInfo,@PathVariable("OpId") long OpId){
        int i = billService.addBill(billInfo, OpId);
        if(i<=0){
            return CommonResult.error().message("添加账单失败");
        }
        return CommonResult.ok().message("添加账单成功");
    }

    @DeleteMapping("remove/{billCode}")
    public CommonResult removeBillByBillCode(@PathVariable("billCode") String billCode){
        int i = billService.removeByBillCode(billCode);
        if(i<=0){
            return CommonResult.error().message("删除账单失败");
        }
        return CommonResult.ok().message("删除账单成功");
    }

    @PutMapping("/modify/{OpId}")
    public CommonResult modifyBill(@RequestBody BillInfo billInfo,@PathVariable("OpId")long OpId){
        int i = billService.modifyBill(billInfo, OpId);
        if(i<=0){
            return CommonResult.error().message("修改订单信息失败！");
        }else {
            return CommonResult.ok().message("修改订单信息成功！");
        }
    }
}
