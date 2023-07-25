/**
 * @description       :
 * @author            : ManojG
 * @group             :
 * @last modified on  : 2023-07-25
 * @last modified by  : ManojG
 **/
public with sharing class AccountDataController {
  @AuraEnabled
  public static List<Account> getAccounts() {
    List<Account> accList = new List<Account>();
    accList = [
      SELECT Id, Name, AccountNumber, AccountSource, Active__c, Phone
      FROM Account
    ];
    return accList;
  }
}
