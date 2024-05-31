/**
* Created By:Sakshi Sahu
* @description : This apex controller class is a fetch records from product it is used in productattributionvendorcomponent,productattributionvendorskucomponent,productattributionindividuallwc,productattributioneditlwc LWC Component.
*/
//This field is for Taneira Attribution.
public without sharing class ProductAttributionController {
    //This method is use Fetch Vendor detail in productattributionvendorcomponent lwc component
    @AuraEnabled
    public static List<Vendor__c> fetchVendorActiveDetails(){           //This method is use Fetch Vendor detail in productattributionvendorcomponent lwc component
        // Check if the user has read access to the Vendor__c object
        if (Schema.sObjectType.Vendor__c.isAccessible()) {
            List<Vendor__c> vendorList=[Select Id,	Name, Vendor_Code__c, Active__c, Total_SKU__c, Total_Completed_SKU__c, Total_Pending_SKU__c From Vendor__c WHERE Active__c = TRUE ];
            return vendorList;
        }
        else {
            // Handle the case where the user doesn't have read access
            return null;
        }
    } 
   
    //This method is use Fetch Sku Code detail from vendor page in productattributionvendorskucomponent lwc component
    @AuraEnabled(cacheable=true)
    public static List<Product__c> fetchVenderSkucodeDetails(String textkey)                //This method is use Fetch Sku Code detail from vendor page in productattributionvendorskucomponent lwc component
    {
        if(textkey != null){
            if (Schema.sObjectType.Product__c.isAccessible()) {
                List<Product__c> skuCodeList = [Select Id,Name,Weight_in_G__c,Body_Pattern_Update__c,Pattern_Type__c,Body_Design_Element__c,Buta_Size__c,
                               Border_Technique__c,Border_Type__c,Border_Dim__c,Border_Matching__c,Border_Material__c,Pallu_Matching__c,Pallu_Type__c,
                               Blouse_Type__c,Blouse_Design_Element__c,SKU_Code__c,Koniya__c,Tasseling__c,Piping__c,Fall_Pico__c,Weave_Fabric__c,
                               Color_Type__c,Border_Color__c,Blouse_Color__c,Silk_Mark__c,GI_Tag__c,Zari_Certificate__c,Craft_Mark__c,
                               Transparency__c,Breathability__c,Drapability__c,Washcare__c,Saree_Length_in_Meter__c,Saree_Width_in_Meter__c,
                               Blouse_Length_in_CM__c,Vendor_custom__c,Attribution_Status__c from Product__c Where Vendor_custom__c =: textkey AND Attribution_Status__c = 'Pending'];      
                return skuCodeList;
            }
            else {
            	// Handle the case where the user doesn't have read access
            	return null;
        	}
        }
        else{
            return null;  
        }
    }
    
    //This method is use Fetch Sku Code Copy From detail from vendor page in productattributionvendorskucomponent lwc component
    @AuraEnabled(cacheable=true)
    public static Product__c fetchVenderCopyFromDetails(String textkey)                      //This method is use Fetch Sku Code Copy From detail from vendor page in productattributionvendorskucomponent lwc component
    {
        if(textkey != null){
            if (Schema.sObjectType.Product__c.isAccessible()) {
                Product__c copyFromList = [Select Id,Name,Weight_in_G__c,Body_Pattern_Update__c,Pattern_Type__c,Body_Design_Element__c,Buta_Size__c,
                               Border_Technique__c,Border_Type__c,Border_Dim__c,Border_Matching__c,Border_Material__c,Pallu_Matching__c,Pallu_Type__c,
                               Blouse_Type__c,Blouse_Design_Element__c,SKU_Code__c,Koniya__c,Tasseling__c,Piping__c,Fall_Pico__c,Weave_Fabric__c,
                               Color_Type__c,Border_Color__c,Blouse_Color__c,Silk_Mark__c,GI_Tag__c,Zari_Certificate__c,Craft_Mark__c,
                               Transparency__c,Breathability__c,Drapability__c,Washcare__c,Saree_Length_in_Meter__c,Saree_Width_in_Meter__c,
                               Blouse_Length_in_CM__c from Product__c Where Id =:textkey];      
                return copyFromList;
            }
            else {
            	// Handle the case where the user doesn't have read access
            	return null;
        	}
        }
        else{
            return null;  
        }
    } 
    
    //This method is use Fetch Individual Sku code Details in productattributionindividuallwc lwc component
    @AuraEnabled(cacheable=true)
    public static Product__c fetchIndividualSkucodeDetails(String textkey)                            //This method is use Fetch Individual Sku code Details in productattributionindividuallwc lwc component
    {
        if(textkey != null){
             if (Schema.sObjectType.Product__c.isAccessible()) {
                Product__c skuCodeList = [Select Id,Name,Weight_in_G__c,Body_Pattern_Update__c,Pattern_Type__c,Body_Design_Element__c,Buta_Size__c,
                               Border_Technique__c,Border_Type__c,Border_Dim__c,Border_Matching__c,Border_Material__c,Pallu_Matching__c,Pallu_Type__c,
                               Blouse_Type__c,Blouse_Design_Element__c,SKU_Code__c,Koniya__c,Tasseling__c,Piping__c,Fall_Pico__c,Weave_Fabric__c,
                               Color_Type__c,Border_Color__c,Blouse_Color__c,Silk_Mark__c,GI_Tag__c,Zari_Certificate__c,Craft_Mark__c,
                               Transparency__c,Breathability__c,Drapability__c,Washcare__c,Saree_Length_in_Meter__c,Saree_Width_in_Meter__c,
                               Blouse_Length_in_CM__c from Product__c Where Id =:textkey];      
                return skuCodeList;
            }
            else {
            	// Handle the case where the user doesn't have read access
            	return null;
        	}
        }
        else{
            return null;  
        }
    }
    
    //This method is use Fetch Individual Sku code Details from Copy From in productattributionindividuallwc lwc component
    @AuraEnabled(cacheable=true)
    public static Product__c fetchIndividualCopyFromDetails(String textkey)                             //This method is use Fetch Individual Sku code Details from Copy From in productattributionindividuallwc lwc component
    {
        if(textkey != null){
            if (Schema.sObjectType.Product__c.isAccessible()) {
                Product__c copyFromList = [Select Id,Name,Weight_in_G__c,Body_Pattern_Update__c,Pattern_Type__c,Body_Design_Element__c,Buta_Size__c,
                               Border_Technique__c,Border_Type__c,Border_Dim__c,Border_Matching__c,Border_Material__c,Pallu_Matching__c,Pallu_Type__c,
                               Blouse_Type__c,Blouse_Design_Element__c,SKU_Code__c,Koniya__c,Tasseling__c,Piping__c,Fall_Pico__c,Weave_Fabric__c,
                               Color_Type__c,Border_Color__c,Blouse_Color__c,Silk_Mark__c,GI_Tag__c,Zari_Certificate__c,Craft_Mark__c,
                               Transparency__c,Breathability__c,Drapability__c,Washcare__c,Saree_Length_in_Meter__c,Saree_Width_in_Meter__c,
                               Blouse_Length_in_CM__c from Product__c Where Id =:textkey];      
                return copyFromList;
            }
            else {
            	// Handle the case where the user doesn't have read access
            	return null;
        	}
        }
        else{
            return null;  
        }
    }
    
    //This method is use Fetch Edit Sku code Search Details in productattributioneditlwc lwc component
    @AuraEnabled(cacheable=true)
    public static Product__c fetchEditSkucodeSearch(String textkey)                    //This method is use Fetch Edit Sku code Search Details in productattributioneditlwc lwc component
    {
        if(textkey != null){
            if (Schema.sObjectType.Product__c.isAccessible()) {
                Product__c skuCodeList = [Select Id,Name,Weight_in_G__c,Body_Pattern_Update__c,Pattern_Type__c,Body_Design_Element__c,Buta_Size__c,
                               Border_Technique__c,Border_Type__c,Border_Dim__c,Border_Matching__c,Border_Material__c,Pallu_Matching__c,Pallu_Type__c,
                               Blouse_Type__c,Blouse_Design_Element__c,SKU_Code__c,Koniya__c,Tasseling__c,Piping__c,Fall_Pico__c,Weave_Fabric__c,
                               Color_Type__c,Border_Color__c,Blouse_Color__c,Silk_Mark__c,GI_Tag__c,Zari_Certificate__c,Craft_Mark__c,
                               Transparency__c,Breathability__c,Drapability__c,Washcare__c,Saree_Length_in_Meter__c,Saree_Width_in_Meter__c,
                               Blouse_Length_in_CM__c from Product__c Where Id =:textkey];      
                return skuCodeList;
            }
            else {
            	// Handle the case where the user doesn't have read access
            	return null;
        	}
        }
        else{
            return null;  
        }
    }
    
	//This method is use Update the mass record in Product(Product__c) object with all component are used productattributionindividuallwc,productattributioneditlwc,productattributionvendorskucomponent lwc component
	@AuraEnabled(cacheable = false)
    public static void updateProductData(List<Object> validData) {                    //This method is use Update the mass record in Product(Product__c) object with all component are used productattributionindividuallwc,productattributioneditlwc,productattributionvendorskucomponent lwc component
        ProductattributionHelper.updateProductList(validData);
    }
    
    
}