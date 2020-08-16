package com.shane.smbms.service.impl;

import com.shane.smbms.dao.ProviderDao;
import com.shane.smbms.entity.Provider;
import com.shane.smbms.entity.User;
import com.shane.smbms.service.ProviderService;
import com.shane.smbms.vo.ProviderInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProviderServiceImpl implements ProviderService {

    @Autowired
    private ProviderDao providerDao;
    @Override
    public Provider queryProviderByName(String proName) {
        return providerDao.selectProviderByName(proName);
    }

    @Override
    public List<Provider> queryAllProvider() {
        return providerDao.selectAllProvider();
    }

    @Override
    public List<Provider> queryProviderListByName(String proName) {
        return providerDao.selectProviderListByName(proName);
    }

    @Override
    public int addProvider(Provider provider,long id) {
        Date date = new Date();
        provider.setCreationDate(date);
        provider.setModifyDate(date);
        provider.setCreatedBy(id);
        provider.setModifyBy(id);
        return providerDao.insertProvider(provider);
    }

    @Override
    public List<ProviderInfo> queryAllProviderInfo() {
        return providerDao.selectAllProviderInfo();
    }

    @Override
    public Provider queryProviderByCode(String proCode) {
        return providerDao.selectProviderByCode(proCode);
    }

    @Override
    public int modifyProvider(Provider provider, long id) {
        provider.setModifyBy(id);
        provider.setModifyDate(new Date());
        return providerDao.updateProvider(provider);
    }

    @Override
    public Provider queryProviderById(long id) {
        return providerDao.selectProviderById(id);
    }

    @Override
    public int removeProvider(long id) {
        return providerDao.deleteProvider(id);
    }
}
