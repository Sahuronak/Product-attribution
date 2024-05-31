//This field is for Taneira Attribution.
trigger ProductTrigger on Product__c(after update ,after insert) {
    if((Trigger.isAfter && Trigger.isInsert)||(Trigger.isAfter && Trigger.isUpdate)) {
    	Set<Id> vendorIds = new Set<Id>();
    	for (Product__c prod : Trigger.new) {
        	if (prod.Vendor_custom__c != null) {
            	vendorIds.add(prod.Vendor_custom__c);
            }
    	}
    	if (!vendorIds.isEmpty()) {
        	if(!System.isFuture()){
        		VendorrollupCalculation.rollupCalculationOnproductInsertandUPdate(vendorIds);
        	}
    	}
    }
}