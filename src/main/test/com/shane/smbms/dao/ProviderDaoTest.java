package com.shane.smbms.dao;

import com.shane.smbms.entity.Provider;
import com.shane.smbms.entity.User;
import com.shane.smbms.vo.ProviderInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml","classpath:spring/spring-service.xml"})
public class ProviderDaoTest {

    @Autowired
    private ProviderDao providerDao;

    @Test
    public void selectProviderByName() {
        List<ProviderInfo> providerInfos = providerDao.selectAllProviderInfo();
        for (ProviderInfo providerInfo : providerInfos) {
            System.out.println(providerInfo);
        }
    }

    @Test
    public void selectAllProvider() {
        List<Provider> providers = providerDao.selectAllProvider();
        for (Provider provider : providers) {
            System.out.println(provider);
        }
    }

    @Test
    public void selectProviderListByName() {
        List<Provider> providers = providerDao.selectProviderListByName("z");
        System.out.println(providers.isEmpty());
        for (Provider provider : providers) {
            System.out.println(provider);
        }
    }

    @Test
    public void insertProvider() {
        Provider provider = new Provider();
        provider.setProCode("test123");
        provider.setProName("xiaohong");
        provider.setProContact("tom");
        provider.setProPhone("13211111111");
        provider.setProAddress("Shanghai");
        provider.setProDesc("一个用来测试的供应商123");
        provider.setProFax("1234567");
        Date date = new Date();
        provider.setCreationDate(date);
        provider.setModifyDate(date);
        provider.setCreatedBy(1);
        provider.setModifyBy(1);
        providerDao.insertProvider(provider);
    }

    @Test
    public void updateProvider() {
    }
}