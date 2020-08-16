package com.shane.smbms.service;

import com.shane.smbms.entity.Provider;
import com.shane.smbms.entity.User;
import com.shane.smbms.vo.ProviderInfo;

import java.util.List;

public interface ProviderService {
    Provider queryProviderByName(String proName);

    Provider queryProviderById(long id);

    List<Provider> queryAllProvider();

    List<Provider> queryProviderListByName(String proName);

    int addProvider(Provider provider,long id);

    int modifyProvider(Provider provider,long id);

    int removeProvider(long id);

    Provider queryProviderByCode(String proCode);

    List<ProviderInfo> queryAllProviderInfo();
}
