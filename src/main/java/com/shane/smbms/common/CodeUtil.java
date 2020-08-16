package com.shane.smbms.common;

import java.util.UUID;

public class CodeUtil {
    public static String getCode(){
        return UUID.randomUUID().toString().substring(0, 20);
    }
}
