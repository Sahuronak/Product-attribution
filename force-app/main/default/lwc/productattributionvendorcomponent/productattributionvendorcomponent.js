import { LightningElement,track,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import FetchVendorActiveDetails from '@salesforce/apex/ProductAttributionController.fetchVendorActiveDetails';


export default class Productattributionvendorcomponent extends NavigationMixin(LightningElement) {
    Vendordata= [];
    filteredVendorData= [];
    filteredData = [];
    totalAttributionCompleted = 0;
    totalAttributionPending = 0;
    VendorNamesearchKey = '';
    isDisplayTable = false;
    @track loader = false;
    currentPage = 1;
    recordSize = 50; // Number of records per page
    totalPage = 1;

    
   // isDisplayTable = false;
    @track VendorNamesearchKey;
    @track venderId;
    @api FetchSkuVariable = false;
    showModalPopup = false;

    columnHeader = [
        'Vendor Name'
        ,
        'Vendor Code'
        ,
        'Total skus'
        ,
        'Attribution Completed'
        ,
        'Attribution Pending'
       
        ]

        connectedCallback() {
           // this.isDisplayTable = true;
           this.loader = true;
           FetchVendorActiveDetails()
                .then(result => {
                    this.loader = false;
                   this.Vendordata=result;
                   this.isDisplayTable = true;
                   this.filteredVendorData=this.Vendordata;
                   this.filteredData=this.Vendordata;
                   this.venderId=this.filteredVendorData.Id;
                   this.calculateTotalPages();
                   //this.filterVendorNames();
                   this.showPage(1);
                  // this.previousHandler();
                  // this.nextHandler();
        })
        .catch(error=>{
            console.error('Error fetching vendor details:', error); 
        })
    }

    openModalPrevious(event) 
    {
        this.showModalPopup = true;
    }

    closeModalPrevious() 
    {
        this.showModalPopup = false;
    }

    calculateTotalPages() {
        this.totalPage = Math.ceil(this.filteredData.length / this.recordSize);
    }
   
    showPage(pageNumber) {
        if (pageNumber < 1) {
            this.currentPage = 1;
        } else if (pageNumber > this.totalPage) {
            this.currentPage = this.totalPage;
        } else {
            this.currentPage = pageNumber;
        }
    
        // Filter the data to display only one record per page
        const startIndex = (this.currentPage - 1) * this.recordSize;
        const endIndex = startIndex + this.recordSize;
        this.filteredVendorData = this.filteredData.slice(startIndex, endIndex);
    }
    

    previousHandler() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    }

    nextHandler() {
        if (this.currentPage < this.totalPage) {
            this.showPage(this.currentPage + 1);
        }
    }

    get disablePrevious() {
        return this.currentPage <= 1;
    }

    get disableNext() {
        return this.currentPage >= this.totalPage;
    }

    get record() {
        return this.filteredVendorData[this.currentPage - 1] || {};
    }

    handleSearchChange(event) {
        // Set the VendorNamesearchKey to empty string to show all records initially
        //this.VendorNamesearchKey = event.target.value.toLowerCase();
        //this.filterVendorNames();
        this.VendorNamesearchKey =event.target.value;
        console.log('rowdata sku seleceted id this.filteredRowData', JSON.stringify(this.filteredVendorData));
    }

    handleSearchVendorName(){
        if(this.VendorNamesearchKey == null || this.VendorNamesearchKey == ''){
            this.filteredData = this.Vendordata;
            this.calculateTotalPages();
            this.showPage(1);
            //this.showPage(this.currentPage);
        }
        else{
            this.filteredData = this.Vendordata.filter(item => {
                return item.Name.toLowerCase().includes(this.VendorNamesearchKey.toLowerCase());
                //return item.Name.toLowerCase() === this.VendorNamesearchKey.toLowerCase();
            });
            this.calculateTotalPages();
            this.showPage(1);
            if(this.filteredData.length === 0) {
                this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Search for a valid vendor name');
            }
        }
    }
    
    handleMainPage(){
        const mainPageEvent = new CustomEvent('mainpage');
        this.dispatchEvent(mainPageEvent);
    }

    handleVendorPage(){
        this.FetchSkuVariable = false;
    }

    handleDownloadSummary()
    {
        // Prepare a html table
        let doc = '<table>';
        // Add styles for the table
        doc += '<style>';
        doc += 'table, th, td {';
        doc += '    border: 1px solid black;';
        doc += '    border-collapse: collapse;';
        doc += '}';          
        doc += '</style>';
        // Add all the Table Headers
        doc += '<tr>';
        this.columnHeader.forEach(element => {            
            doc += '<th>'+ element +'</th>'           
        });
        doc += '</tr>';
        // Add the data rows
        this.Vendordata.forEach(record => {
            doc += '<tr>';
            doc += '<th style="font-weight: normal;">'+(record.Name!=undefined?record.Name:'')+'</th>'; 
            doc += '<th style="font-weight: normal;">'+(record.Vendor_Code__c!=undefined?record.Vendor_Code__c:'')+'</th>'; 
            doc += '<th style="font-weight: normal;">'+(record.Total_SKU__c!=undefined?record.Total_SKU__c:'')+'</th>';
            doc += '<th style="font-weight: normal;">'+(record.Total_Completed_SKU__c!=undefined?record.Total_Completed_SKU__c:'')+'</th>';
            doc += '<th style="font-weight: normal;">'+(record.Total_Pending_SKU__c!=undefined?record.Total_Pending_SKU__c:'')+'</th>';
            doc += '</tr>';
        });
        doc += '</table>';
        var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        
        downloadElement.download = 'Taneira Attribution Summary_'+this.OrderIdName+'.xls';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }

    handleVendorNameClick(event){
        let selectedRowIndex = event.currentTarget.dataset.index;
        this.venderId = this.filteredVendorData[selectedRowIndex].Id;
        this.FetchSkuVariable = true;
    }
}