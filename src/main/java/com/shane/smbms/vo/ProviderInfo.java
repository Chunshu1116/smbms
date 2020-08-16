package com.shane.smbms.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderInfo {
    private String proCode; //供应商编码
    private String proName;//供应商名称
}
