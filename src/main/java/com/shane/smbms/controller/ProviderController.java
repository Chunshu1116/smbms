package com.shane.smbms.controller;

import com.shane.smbms.common.CommonResult;
import com.shane.smbms.entity.Provider;
import com.shane.smbms.entity.User;
import com.shane.smbms.service.ProviderService;
import com.shane.smbms.vo.ProviderInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.POST;
import java.util.List;

@RestController
@RequestMapping("/provider")
public class ProviderController {
    @Autowired
    private ProviderService providerService;

    @GetMapping("/list")
    public CommonResult queryAllPro(){
        List<Provider> providers = providerService.queryAllProvider();
        if(providers.isEmpty()){
            return CommonResult.error().message("未找到供应商数据");
        }else{
            return CommonResult.ok().data("providers",providers);
        }
    }

    @GetMapping("/list/proName/{proName}")
    public CommonResult queryProListByName(@PathVariable("proName") String proName){
        List<Provider> providers = providerService.queryProviderListByName(proName);
        if(providers.isEmpty()){
            return CommonResult.error().message("未找到符合搜索条件的供应商数据");
        }else {
            return CommonResult.ok().data("providers",providers);
        }
    }

    @PostMapping(value = "/add/{opId}",produces = {"application/json;charset=UTF-8"})
    public CommonResult addProvider(@RequestBody Provider provider,@PathVariable("opId")long opId){
        int i = providerService.addProvider(provider, opId);
        if(i<=0){
            return CommonResult.error().message("添加供应商失败");
        }
        return CommonResult.ok().message("添加供应商成功");
    }

    @GetMapping("/info/{id}")
    public CommonResult queryProviderById(@PathVariable("id")long id){
        Provider provider = providerService.queryProviderById(id);
        if(provider==null){
            return CommonResult.error().message("未找到供应商信息");
        }else {
            return CommonResult.ok().data("provider",provider);
        }
    }

    @PutMapping("/modify/{opId}")
    public CommonResult modifyProvider(@RequestBody Provider provider,@PathVariable("opId") long opId){
        int i = providerService.modifyProvider(provider, opId);
        if(i<=0){
            return CommonResult.error().message("修改供应商信息失败！");
        }else {
            return CommonResult.ok().message("修改供应商信息成功！");
        }
    }

    @DeleteMapping("/remove/{id}")
    public CommonResult removeProvider(@PathVariable("id") long id){
        int i = providerService.removeProvider(id);
        if(i<=0){
            return CommonResult.error().message("删除供应商信息失败！");
        }else {
            return CommonResult.ok().message("删除供应商信息成功！");
        }
    }

    @GetMapping("/info/code/{proCode}")
    public CommonResult queryProByCode(@PathVariable("proCode") String proCode){
        Provider provider = providerService.queryProviderByCode(proCode);
        if(provider==null){
            return CommonResult.error().message("未找到供应商信息");
        }else {
            return CommonResult.ok().data("provider",provider);
        }
    }

    @GetMapping("/proInfo")
    public CommonResult queryProviderInfoList(){
        List<ProviderInfo> providerInfos = providerService.queryAllProviderInfo();
        if(providerInfos.isEmpty()){
            return CommonResult.error().message("未找到供应商数据");
        }else {
            return CommonResult.ok().data("providerInfos",providerInfos);
        }
    }
}
