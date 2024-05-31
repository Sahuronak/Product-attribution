import { LightningElement,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Productattributiondetaillwc extends NavigationMixin(LightningElement) {
    @api VendorwiseVariable = false;
    @api IndividualVariable = false;
    @api EditVariable = false;

    get shouldDisplayTemplate() {
        return !this.VendorwiseVariable && !this.IndividualVariable && !this.EditVariable;
    }
    
    handlerVendorwise() {
        this.VendorwiseVariable = true;
        this.IndividualVariable = false;
        this.EditVariable = false;
    }

    handlerIndividual() {
        this.IndividualVariable = true;
        this.VendorwiseVariable = false;
        this.EditVariable = false;
    }

    handlerEdit() {
        this.EditVariable = true;
        this.VendorwiseVariable = false;
        this.IndividualVariable = false;
    }

    handleBack() {
        // Handle the back action, e.g., navigate back to the main page
        this.VendorwiseVariable = false;
        this.IndividualVariable = false;
        this.EditVariable = false;
    }
}