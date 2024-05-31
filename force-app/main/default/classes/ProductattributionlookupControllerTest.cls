/**
* Created By:Sakshi Sahu
* @description : This test class is used for ProductattributionlookupController class.
*/
//This field is for Taneira Attribution.
@isTest
public class ProductattributionlookupControllerTest {

    @isTest
    static void testSearch() {
        Profile testProfile = [SELECT Id FROM Profile WHERE Name = 'System Administrator']; 
        User testUser = new User(
            FirstName = 'Test',
            LastName = 'User',
            Email = 'testuser@example.com',
            UserName = 'testuser@example.com',
            Alias = 'TUser',
            ProfileId = testProfile.Id,
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            TimeZoneSidKey = 'America/Los_Angeles'
        );

        insert testUser;
        
        // Create a test record
        System.runAs(testUser) 
        {
            List<Product__c> productList = new List<Product__c>();
            Product__c prod;
            for (Integer i = 0; i < 5; i++) {
                prod = new Product__c();
                prod.Name = 'mv127' + i;
                prod.SKU_Code__c = 'sku123' + i;
                prod.Attribution_Status__c = 'Completed';
                productList.add(prod);
            }
            for(Integer i=5;i<10;i++){
                prod = new Product__c();
                prod.Name = 'mv127'+i;
                prod.SKU_Code__c='skuc'+i;
                prod.Attribution_Status__c='Pending';
                productList.add(prod);    
            }
    
            // Insert the records
            if(productList.size()>0){
             insert productList;            
            }
    
            // Query the expected record
            Product__c expectedRecord = [SELECT Id, Name FROM Product__c WHERE SKU_Code__c = 'sku1231' AND Attribution_Status__c = 'Completed' LIMIT 1];
    
            // Call the search method
            List<sObject> result = ProductattributionlookupController.search('sku1231', 'Product__c', 'Attribution_Status__c = \'Completed\'');
            List<sObject> resultWithFilter = ProductattributionlookupController.search(null, 'Product__c', 'Attribution_Status__c = \'Completed\'');
            List<sObject> resultWithFilterAndEmptySearchTerm = ProductattributionlookupController.search('', 'Product__c', 'Attribution_Status__c = \'Completed\'');
    
            // Add your assertions here
            System.assertNotEquals(null, result);
            System.assertEquals(1, result.size());
            System.assertNotEquals(null, resultWithFilter);
            System.assertNotEquals(null, resultWithFilterAndEmptySearchTerm);
    
            // Verify that the returned record matches the expected record
            sObject returnedRecord = result[0];
            System.assertEquals(expectedRecord.Id, String.valueOf(returnedRecord.get('Id')));
            System.assertEquals(expectedRecord.Name, returnedRecord.get('Name'));
        }
    }
}