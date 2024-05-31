/**
* Created By:Sakshi Sahu
* @description : Test class to BatchtoUpdateVendor
*/
//This field is for Taneira Attribution.
@isTest
public class BatchtoUpdateVendor_Test {
 @isTest
    static void testBatchtoUpdateVendor() {
        
        Vendor__c testVendor = new Vendor__c(Name = 'Test Vendor');
        insert testVendor;

        List<Product__c> testProducts = new List<Product__c>{
            new Product__c(Name = 'Product 1', Vendor_custom__c = testVendor.Id, Attribution_Status__c = 'Pending'),
            new Product__c(Name = 'Product 2', Vendor_custom__c = testVendor.Id, Attribution_Status__c = 'Completed'),
            new Product__c(Name = 'Product 3', Vendor_custom__c = testVendor.Id, Attribution_Status__c = 'Pending')
        };
        insert testProducts;

        
        Test.startTest();
        BatchtoUpdateVendor batchJob = new BatchtoUpdateVendor();
        Database.executeBatch(batchJob);
        Test.stopTest();
    }
}