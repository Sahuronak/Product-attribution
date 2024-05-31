/**
* Created By: Sakshi Sahu
* @description : This apex controller class is a search controller for product as a lookup in Productattributionlookuplwc component.
*/
//This field is for Taneira Attribution.
public without sharing class ProductattributionlookupController {
    @AuraEnabled(cacheable=true)
    public static List<sObject> search(String searchTerm, string myObject, String filter) {         //This method is use to search record
        String myQuery = null;
        if((String.isNotBlank(filter)) && (searchTerm == null || searchTerm == '')){
            myQuery = 'Select Id, Name,SKU_Code__c from '+myObject+' Where '+filter+' LIMIT  20';
        }
        else {
            
            myQuery = 'Select Id, Name,SKU_Code__c from '+myObject+' Where SKU_Code__c Like  \'%' + searchTerm + '%\' AND ' + filter + ' LIMIT  20';
            //myQuery = 'SELECT Id, Name, SKU_Code__c FROM ' + myObject + ' WHERE SKU_Code__c LIKE :searchTerm AND ' + filter + ' LIMIT 20';
        }
        
        List<sObject> lookUpList = database.query(myQuery);
        return lookUpList;
    }
}