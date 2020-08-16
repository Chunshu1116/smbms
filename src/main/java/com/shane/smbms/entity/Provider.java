package com.shane.smbms.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Provider {
    private long id; //主键id
    private String proCode; //供应商编码
    private String proName;//供应商名称
    private String proDesc; //供应商详细描述
    private String proContact; //供应商联系人
    private String proPhone;//联系电话
    private String proAddress; //地址
    private String proFax; //传真
    private long createdBy;//创建者
    private Date creationDate;//创建时间
    private long modifyBy;//更新者
    private Date modifyDate;//更新时间
}
