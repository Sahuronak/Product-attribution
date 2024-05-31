/**
* Created By:Sakshi Sahu
* @description : This apex helper class is a update product through product attribution tab records is used for ProductAttributionController class and this productattributionvendorcomponent,productattributionvendorskucomponent,productattributionindividuallwc,productattributioneditlwc LWC Component.
*/
//This field is for Taneira Attribution.
public with sharing class ProductattributionHelper {
    @AuraEnabled(cacheable = false)
    public static void updateProductList(List<Object> validData) {       //This method update the product record
        List<Product__c> productUpdateList = new List<Product__c>();
        List<ProductDataWrapper> productDataList = new List<ProductDataWrapper>();
        
        for(Object prod :validData){
            String jsonStr = JSON.serialize(prod);
            ProductDataWrapper productRecord =(ProductDataWrapper) System.JSON.deserialize(jsonStr, ProductDataWrapper.class);  
            productDataList.add(productRecord);
        }
        
        try{
            if(!validData.isEmpty())
            {
                for(ProductDataWrapper prodoctWrap : productDataList)
                {
                    Product__c productData = new Product__c();                
                    productData.Id = prodoctWrap.skuCode;
                    if (Schema.sObjectType.Product__c.isUpdateable()) {
                        productData.Weight_in_G__c = prodoctWrap.weightInG;
                        productData.Body_Pattern_Update__c = prodoctWrap.bodyPatterns;
                        productData.Pattern_Type__c = prodoctWrap.patternType;
                        productData.Body_Design_Element__c = prodoctWrap.bodyDesignElement;
                        productData.Buta_Size__c = prodoctWrap.butaSize;
                        productData.Border_Technique__c = prodoctWrap.borderTechnique;
                        productData.Border_Type__c = prodoctWrap.borderType;
                        productData.Border_Dim__c = prodoctWrap.borderDimInInch;
                        productData.Border_Material__c = prodoctWrap.borderMaterial;
                        productData.Pallu_Matching__c = prodoctWrap.palluMatching;
                        productData.Border_Matching__c = prodoctWrap.borderMatching;
                        productData.Pallu_Type__c = prodoctWrap.palluType;
                        productData.Blouse_Type__c = prodoctWrap.blouseType;
                        productData.Blouse_Design_Element__c = prodoctWrap.blouseDesignElement;
                        productData.Koniya__c = prodoctWrap.koniya;
                        productData.Tasseling__c = prodoctWrap.tasseling;
                        productData.Piping__c = prodoctWrap.piping;
                        productData.Fall_Pico__c = prodoctWrap.fallPico;
                        productData.Weave_Fabric__c = prodoctWrap.weaveFabric;
                        productData.Color_Type__c = prodoctWrap.colorType;
                        productData.Border_Color__c = prodoctWrap.borderColor;
                        productData.Blouse_Color__c = prodoctWrap.blouseColor;
                        productData.Silk_Mark__c = prodoctWrap.silkMark;
                        productData.GI_Tag__c = prodoctWrap.gITag;
                        productData.Zari_Certificate__c = prodoctWrap.zariCertificate;
                        productData.Craft_Mark__c = prodoctWrap.craftMark;
                        productData.Transparency__c = prodoctWrap.transparency;
                        productData.Breathability__c = prodoctWrap.breathability;
                        productData.Drapability__c = prodoctWrap.drapability;
                        productData.Washcare__c = prodoctWrap.washcare;
                        productData.Saree_Length_in_Meter__c = prodoctWrap.sareeLengthinMeter;
                        productData.Saree_Width_in_Meter__c = prodoctWrap.sareeWidthinMeter;
                        productData.Blouse_Length_in_CM__c = prodoctWrap.blouseLengthinCM;
                        productUpdateList.add(productData);
                    }
                }
            }        
            if(!productUpdateList.isEmpty()){
                Database.update(productUpdateList);
            }
        }
        catch(Exception e){
            System.debug('error '+e.getMessage());
        }
    }
    
    //This is wrapper class
    public class ProductDataWrapper {           
        @AuraEnabled public String skuCode;
        @AuraEnabled public Decimal weightInG;
        @AuraEnabled public String bodyPatterns;
        @AuraEnabled public String patternType;
        @AuraEnabled public String bodyDesignElement;
        @AuraEnabled public String butaSize;  
        @AuraEnabled public String borderTechnique;
        @AuraEnabled public String borderType;
        @AuraEnabled public String borderDimInInch;  
        @AuraEnabled public String borderMaterial;  
        @AuraEnabled public String palluMatching;
        @AuraEnabled public String borderMatching; 
        @AuraEnabled public String palluType;      
        @AuraEnabled public String blouseType; 
        @AuraEnabled public String blouseDesignElement;      
        @AuraEnabled public String koniya;
        @AuraEnabled public String tasseling;
        @AuraEnabled public String piping;
        @AuraEnabled public String fallPico;
        @AuraEnabled public String weaveFabric;
        @AuraEnabled public String colorType;
        @AuraEnabled public String borderColor;       
        @AuraEnabled public String blouseColor;
        @AuraEnabled public String silkMark; 
        @AuraEnabled public String gITag;
        @AuraEnabled public String zariCertificate;         
        @AuraEnabled public String craftMark;
        @AuraEnabled public String transparency;
        @AuraEnabled public String breathability;
        @AuraEnabled public String drapability;       
        @AuraEnabled public String washcare;
        @AuraEnabled public String sareeLengthinMeter; 
        @AuraEnabled public String sareeWidthinMeter;
        @AuraEnabled public String blouseLengthinCM;  
    }
}