package com.bts.yomojomo.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bts.yomojomo.dao.AccountingDao;
import com.bts.yomojomo.domain.Accounting;
import com.bts.yomojomo.domain.AccountingCate;
import com.bts.yomojomo.service.AccountingService;

@Service
public class DefaultAccountingService implements AccountingService{

  @Autowired
  AccountingDao accountingDao;

  @Transactional
  @Override
  public int add(Accounting accounting) {
    return accountingDao.insert(accounting);
  }

  @Override
  public List<Accounting> list() {
    return accountingDao.findAll(); 
  }

  @Override
  public List<Accounting> listByGroup(Accounting accounting) {
    return accountingDao.findListByGroup(accounting);
  }

  @Override
  public Accounting get(int no) {
    return accountingDao.findByNo(no);
  }

  @Transactional
  @Override
  public int update(Accounting accounting) {
    return accountingDao.update(accounting);
  }

  @Override
  public int delete(Accounting accounting) {
    return accountingDao.delete(accounting);
  }

  @Override
  public List<AccountingCate> findCateList() {
    return accountingDao.cateListAll();
  }

  @Override
  public List<Accounting> findSelectCateList(Accounting accounting) {
    return accountingDao.selectedCate(accounting);
  }




}
