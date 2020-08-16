package com.shane.smbms.dao;

import com.shane.smbms.entity.Provider;
import com.shane.smbms.entity.User;
import com.shane.smbms.vo.ProviderInfo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderDao {

    @Select("select * from smbms_provider where proName=#{proName}")
    Provider selectProviderByName(@Param("proName") String proName);

    @Select("select * from smbms_provider where id=#{id}")
    Provider selectProviderById(@Param("id")long id);

    @Select("select * from smbms_provider where proCode=#{proCode}")
    Provider selectProviderByCode(@Param("proCode") String proCode);

    @Select("select * from smbms_provider")
    List<Provider> selectAllProvider();

    List<Provider> selectProviderListByName(@Param("proName") String proName);

    int insertProvider(@Param("provider") Provider provider);

    int updateProvider(@Param("provider") Provider provider);

    @Delete("delete from smbms_provider where id=#{id}")
    int deleteProvider(@Param("id") long id);

    @Select("select proCode,proName from smbms_provider")
    List<ProviderInfo> selectAllProviderInfo();
}
