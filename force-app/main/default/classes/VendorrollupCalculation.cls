/**
* Created By:Sakshu Sahu
* @description : This apex controller class used to calculate the rollup of Total Products , Attribution completed products and Attribution pending products for related Vendor. 
*/
//This field is for Taneira Attribution.
public class VendorrollupCalculation 
{    
    @future
    //Rollup calculation logic to store the total products, attribution completed products and attribution pending products under related Vendor. 
    public Static void rollupCalculationOnproductInsertandUPdate(Set<Id> vendorIdset)
    {
        Map<Id,vendorwrapper> vendorproductCount=new Map<Id,vendorwrapper>();
        List<Vendor__c> vendorListtoupdate=new List<Vendor__c>();
        //Fetching the Products from related vendors
        List<Product__c> productList=[SELECT Id,Attribution_Status__c,Vendor_custom__c FROM Product__c WHERE Vendor_custom__c =:vendorIdset];
        for(Product__c prod:productList)
        {          
            if(!vendorproductCount.containsKey(prod.Vendor_custom__c))
            {
                vendorwrapper wrapper = new vendorwrapper();
                wrapper.totalSku=1;
                wrapper.totalattcompleted=0;
                wrapper.totalattpending=0;
                if(prod.Attribution_Status__c=='Pending')
                {
                    wrapper.totalattpending=1;
                }
                else if(prod.Attribution_Status__c=='Completed')
                {
                    wrapper.totalattcompleted=1;
                }
                vendorproductCount.put(prod.Vendor_custom__c,wrapper);
            }
            else
            {
                vendorwrapper vendWrapper =vendorproductCount.get(prod.Vendor_custom__c);
                vendWrapper.totalSku+= 1;
                if(prod.Attribution_Status__c=='Pending')
                {
                    vendWrapper.totalattpending+=1;
                }
                else if(prod.Attribution_Status__c=='Completed')
                {
                    vendWrapper.totalattcompleted+=1;
                }
                vendorproductCount.put(prod.Vendor_custom__c,vendWrapper);
            }
        }
        for(Id vendorid:vendorproductCount.keySet())
        {
            Vendor__c vendor=new Vendor__c();
            vendor.Id = vendorid;
            vendor.Total_SKU__c = vendorproductCount.get(vendorid).totalSku;
            vendor.Total_Completed_SKU__c=vendorproductCount.get(vendorid).totalattcompleted;
            vendor.Total_Pending_SKU__c=vendorproductCount.get(vendorid).totalattpending;
            vendorListtoupdate.add(vendor);
        }
        if(!vendorListtoupdate.isEmpty()){
            update vendorListtoupdate;
        } 
    }
    //Wrapper class and variables to store the rollup values
    public class vendorwrapper 
    {       
        public Integer totalSku;
        public Integer totalattcompleted;
        Public Integer totalattpending;
    }   
}