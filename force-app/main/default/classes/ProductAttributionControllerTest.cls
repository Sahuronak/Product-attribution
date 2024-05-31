/**
* Created By:Sakshi Sahu
* @description : This test class is used for ProductAttributionController class.
*/
//This field is for Taneira Attribution.
@isTest
public class ProductAttributionControllerTest {

    @isTest
    static void testFetchVendorActiveDetails() {
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
            List<Vendor__c> vendorList = ProductAttributionController.fetchVendorActiveDetails();
            // Add your assertions here to validate the behavior of FetchVendorActiveDetails method
            System.assertNotEquals(null, vendorList);
        }
    }

    @isTest
    static void testFetchVenderSkucodeDetails() {
        Vendor__c testVendor = new Vendor__c(Name = 'Test Vendor', Vendor_Code__c = 'V123', Active__c = true);
        insert testVendor;
        
        List<Product__c> skuCodeList = ProductAttributionController.fetchVenderSkucodeDetails(testVendor.id);
        // Add your assertions here to validate the behavior of FetchVenderSkucodeDetails method
        System.assertNotEquals(null, skuCodeList);
        
        List<Product__c> skuCodeListNull = ProductAttributionController.fetchVenderSkucodeDetails(null);
        // Add assertions to verify that skuCodeListNull is null
        System.assertEquals(null, skuCodeListNull);
    }

    @isTest
    static void testFetchVenderCopyFromDetails() {
        Product__c testProduct = new Product__c(Name = 'Test Product', Attribution_Status__c = 'Completed');
        insert testProduct;
        
        Product__c copyFromList = ProductAttributionController.fetchVenderCopyFromDetails(testProduct.id);
        // Add your assertions here to validate the behavior of fetchVenderCopyFromDetails method
        System.assertNotEquals(null, copyFromList);
        
        Product__c copyFromListNull = ProductAttributionController.fetchVenderCopyFromDetails(null);
        // Add your assertions here to validate the behavior of fetchVenderCopyFromDetails method
        System.assertEquals(null, copyFromListNull);
    }

    @isTest
    static void testFetchIndividualSkucodeDetails() {
        Product__c testProduct = new Product__c(Name = 'Test Product', Attribution_Status__c = 'Pending');
        insert testProduct;
        
        Product__c skuCodeDetails = ProductAttributionController.fetchIndividualSkucodeDetails(testProduct.id);
        // Add your assertions here to validate the behavior of fetchIndividualSkucodeDetails method
        System.assertNotEquals(null, skuCodeDetails);
        
        Product__c skuCodeDetailsListNull = ProductAttributionController.fetchIndividualSkucodeDetails(null);
        // Add your assertions here to validate the behavior of fetchIndividualSkucodeDetails method
        System.assertEquals(null, skuCodeDetailsListNull);
    }

    @isTest
    static void testFetchIndividualCopyFromDetails() {
        Product__c testProduct = new Product__c(Name = 'Test Product', Attribution_Status__c = 'Completed');
        insert testProduct;
        
        Product__c copyFromDetails = ProductAttributionController.fetchIndividualCopyFromDetails(testProduct.id);
        // Add your assertions here to validate the behavior of fetchIndividualCopyFromDetails method
        System.assertNotEquals(null, copyFromDetails);
        
        Product__c copyFromDetailsListNull = ProductAttributionController.fetchIndividualCopyFromDetails(null);
        // Add your assertions here to validate the behavior of fetchIndividualCopyFromDetails method
        System.assertEquals(null, copyFromDetailsListNull);
    }

    @isTest
    static void testFetchEditSkucodeSearch() {
        Product__c testProduct = new Product__c(Name = 'Test Product', Attribution_Status__c = 'Completed');
        insert testProduct;
        
        Product__c skuCodeDetails = ProductAttributionController.fetchEditSkucodeSearch(testProduct.id);
        // Add your assertions here to validate the behavior of fetchEditSkucodeSearch method
        System.assertNotEquals(null, skuCodeDetails);
        
        Product__c skuCodeDetailsListNull = ProductAttributionController.fetchEditSkucodeSearch(null);
        // Add your assertions here to validate the behavior of fetchEditSkucodeSearch method
        System.assertEquals(null, skuCodeDetailsListNull);
    }

    @isTest
    static void testUpdateProductData() 
    {
        Vendor__c vendor = new Vendor__c();
        vendor.Name = 'test';        
        insert vendor;                 
        
        List<Product__c> productList=new List<Product__c>();
        Product__c prod ;
        for(Integer i=0;i<5;i++){
            prod = new Product__c();
            prod.Name = 'mv127'+i;
            prod.SKU_Code__c='sku123'+i;    
            prod.vendor_custom__c = vendor.id;
            prod.Attribution_Status__c='Completed';
                
            productList.add(prod); 
                
        }
            
        if(productList.size()>0){
         insert productList;
            
        }
       
        List<Object> testData = new List<Object>{
            new Map<String, Object>{
                'Vendor' => vendor,
                'Product' => productList
            }
            
        };

        Test.startTest();
        ProductAttributionController.updateProductData(testData);
        Test.stopTest();
    }
}