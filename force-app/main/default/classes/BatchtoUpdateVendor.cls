/**
* Created By:Sakshi Sahu
* @description : Batch class to update the existing Vendor records with the product rollup values
*/
//This field is for Taneira Attribution.
global with sharing class BatchtoUpdateVendor implements Database.Batchable<sObject>, Database.Stateful{
    public Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator([
            SELECT Id, Attribution_Status__c, Vendor_custom__c
            FROM Product__c
            WHERE Vendor_custom__c != null
        ]);
    }

    public void execute(Database.BatchableContext BC, List<Product__c> scope) {
        Map<Id, VendorWrapper> vendorProductCount = new Map<Id, VendorWrapper>();
        
        for (Product__c prod : scope) {
            if (!vendorProductCount.containsKey(prod.Vendor_custom__c)) {
                VendorWrapper wrapper = new VendorWrapper();
                wrapper.totalSku = 1;
                wrapper.totalattcompleted = 0;
                wrapper.totalattpending = 0;
                
                if (prod.Attribution_Status__c == 'Pending') {
                    wrapper.totalattpending = 1;
                } else if (prod.Attribution_Status__c == 'Completed') {
                    wrapper.totalattcompleted = 1;
                }
                
                vendorProductCount.put(prod.Vendor_custom__c, wrapper);
            } else {
                VendorWrapper tem = vendorProductCount.get(prod.Vendor_custom__c);
                tem.totalSku += 1;
                
                if (prod.Attribution_Status__c == 'Pending') {
                    tem.totalattpending += 1;
                } else if (prod.Attribution_Status__c == 'Completed') {
                    tem.totalattcompleted += 1;
                }
                
                vendorProductCount.put(prod.Vendor_custom__c, tem);
            }
        }
        List<Vendor__c> vendorListToUpdate = new List<Vendor__c>();
         for (Id vendorId : vendorProductCount.keySet()) {
            Vendor__c vendor = new Vendor__c(Id = vendorId);
            vendor.Total_SKU__c = vendorProductCount.get(vendorId).totalSku;
            vendor.Total_Completed_SKU__c = vendorProductCount.get(vendorId).totalattcompleted;
            vendor.Total_Pending_SKU__c = vendorProductCount.get(vendorId).totalattpending;
            vendorListToUpdate.add(vendor);
        }
        
        if (!vendorListToUpdate.isEmpty()) {
            update vendorListToUpdate;
        }
    }

    public void finish(Database.BatchableContext BC) {
      }
    
    public class VendorWrapper {
        public Integer totalSku;
        public Integer totalattcompleted;
        public Integer totalattpending;
    }
    
}