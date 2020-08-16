package com.shane.smbms.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bill {
    //主键id
    private long id;
    //账单编码
    private String billCode;
    //供应商编码
    private String proCode;
    //商品名称
    private String productName;
    //商品描述
    private String productDesc;
    //商品单位
    private String productUnit;
    //商品数量
    private BigDecimal productCount;
    //商品总额
    private BigDecimal totalPrice;
    //是否支付（0：未支付，1：已支付）
    private int isPayment;
    //创建者
    private long createdBy;
    //创建时间
    private Date creationDate;
    //更新者
    private long modifyBy;
    //更新时间
    private Date modifyDate;
}
