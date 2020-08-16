package com.shane.smbms.common;


import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class CommonResult {
    private Boolean success;

    private Integer code;

    private String message;

    private Map<String, Object> data = new HashMap<String, Object>();

    private CommonResult(){}

    public static CommonResult ok(){
        CommonResult r = new CommonResult();
        r.setSuccess(true);
        r.setCode(200);
        r.setMessage("成功");
        return r;
    }

    public static CommonResult error(){
        CommonResult r = new CommonResult();
        r.setSuccess(false);
        r.setCode(400);
        r.setMessage("失败");
        return r;
    }

    public CommonResult success(Boolean success){
        this.setSuccess(success);
        return this;
    }

    public CommonResult message(String message){
        this.setMessage(message);
        return this;
    }

    public CommonResult code(Integer code){
        this.setCode(code);
        return this;
    }

    public CommonResult data(String key, Object value){
        this.data.put(key, value);
        return this;
    }

    public CommonResult data(Map<String, Object> map){
        this.setData(map);
        return this;
    }

    //链式编程
}
