import {LightningElement, track, wire,api} from 'lwc';
import lookUp from '@salesforce/apex/ProductattributionlookupController.search';

export default class Productattributionlookuplwc extends LightningElement {
    @api disabled;
    @api objName;
    @api iconName;
    @api filter = '';
    @api searchPlaceholder='Search';
    @track selectedName;
    @track records;
    @track isValueSelected;
    @track blurTimeout;
    @track searchTerm;
    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';

    connectedCallback() {
        // Initialize the records
        this.clearRecords();
    }

    @wire(lookUp, {searchTerm : '$searchTerm', myObject : '$objName', filter : '$filter'})
    wiredRecords({ error, data }) {
        console.log('wired records '+this.data);
        if (data) {
            this.error = undefined;
            this.records = data;
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }

    clearRecords() {
        // Clear records logic
        this.records = undefined;
        this.searchTerm = '';
    }

    handleClick(event) {
        console.log('handleClick  data'+this.data)
        this.searchTerm = event.target.value;
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onBlur() {
        console.log('onBlur '+this.data)
        this.blurTimeout = setTimeout(() =>  {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }

    onSelect(event) {
        console.log('onSelect '+this.data)
        let selectedId = event.currentTarget.dataset.id;
        console.log(event.currentTarget.dataset.name);
        let selectedName = event.currentTarget.dataset.name;
        // Create an object to hold both id and name
            let selectedData = {
                id: selectedId,
                name: selectedName
            };        
        const valueSelectedEvent = new CustomEvent('lookupselected', {detail: selectedData });
        this.dispatchEvent(valueSelectedEvent);
        this.isValueSelected = true;
        this.selectedName = selectedName;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }

    handleRemovePill() {
        console.log('handleRemovePill '+this.data)
        this.isValueSelected = false;
        let selectedData = {
            id: undefined,
            name: undefined
        };
        const customEventCheck = new CustomEvent('valuecheck', { detail: selectedData } /* here is the correct format */
        );
        this.dispatchEvent(customEventCheck); 
    }
    
    onChange(event) {
        console.log('onChange '+this.data)
        this.searchTerm = event.target.value;
    }

    @api
    clearSelection() {
        console.log('onChange '+this.data);
        this.isValueSelected = false;
        this.selectedName = undefined;

        // Optionally, dispatch an event to notify the parent component about cleared selection
        const clearSelectionEvent = new CustomEvent('clearselection');
        this.dispatchEvent(clearSelectionEvent);
    }    
}