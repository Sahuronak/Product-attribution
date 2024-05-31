/**
* Created By:Sakshi Sahu
* @description : This apex controller test class used to calculate the rollup of Total Products , Attribution completed products and Attribution pending products for related Vendor. 
*/
//This field is for Taneira Attribution.
@isTest
public class VendorRollupCalculation_Test {
 @isTest
    static void testRollupCalculation() {
       
        Vendor__c testVendor = new Vendor__c(Name = 'Test Vendor');
        insert testVendor;

        Product__c testProduct1 = new Product__c(
            Name = 'Test Product 1',
            Vendor_custom__c = testVendor.Id,
            Attribution_Status__c = 'Pending'
        );
        Product__c testProduct2 = new Product__c(
            Name = 'Test Product 2',
            Vendor_custom__c = testVendor.Id,
            Attribution_Status__c = 'Completed'
        );
        insert new List<Product__c>{testProduct1, testProduct2};

        Set<Id> vendorIdSet = new Set<Id>{testVendor.Id};

        
        Test.startTest();
        VendorrollupCalculation.rollupCalculationOnproductInsertandUPdate(vendorIdSet);
        Test.stopTest();

      
    }
}