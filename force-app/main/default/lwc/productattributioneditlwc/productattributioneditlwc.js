import { LightningElement,track,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import FetchEditSkucodeSearch from '@salesforce/apex/ProductAttributionController.fetchEditSkucodeSearch';
import updateProductData from '@salesforce/apex/ProductAttributionController.updateProductData';

import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Productobject from '@salesforce/schema/Product__c';

import BodyPatternUpdate from '@salesforce/schema/Product__c.Body_Pattern_Update__c';
import PatternType from '@salesforce/schema/Product__c.Pattern_Type__c';
import BodyDesignElement from '@salesforce/schema/Product__c.Body_Design_Element__c';
import ButaSize from '@salesforce/schema/Product__c.Buta_Size__c';
import BorderDim from '@salesforce/schema/Product__c.Border_Dim__c';
import BorderColor from '@salesforce/schema/Product__c.Border_Color__c';
import Washcare from '@salesforce/schema/Product__c.Washcare__c';
import BorderTechnique from '@salesforce/schema/Product__c.Border_Technique__c';
import BorderType from '@salesforce/schema/Product__c.Border_Type__c';
import BorderMatching from '@salesforce/schema/Product__c.Border_Matching__c';
import BorderMaterial from '@salesforce/schema/Product__c.Border_Material__c';
import PalluMatching from '@salesforce/schema/Product__c.Pallu_Matching__c';
import PalluType from '@salesforce/schema/Product__c.Pallu_Type__c';
import BlouseType from '@salesforce/schema/Product__c.Blouse_Type__c';
import BlouseDesignElement from '@salesforce/schema/Product__c.Blouse_Design_Element__c';
import Koniya from '@salesforce/schema/Product__c.Koniya__c';
import Tasseling from '@salesforce/schema/Product__c.Tasseling__c';
import Piping from '@salesforce/schema/Product__c.Piping__c';
import FallPico from '@salesforce/schema/Product__c.Fall_Pico__c';
import WeaveFabric from '@salesforce/schema/Product__c.Weave_Fabric__c';
import ColorType from '@salesforce/schema/Product__c.Color_Type__c';
import BlouseColor from '@salesforce/schema/Product__c.Blouse_Color__c';
import SilkMark from '@salesforce/schema/Product__c.Silk_Mark__c';
import GITag from '@salesforce/schema/Product__c.GI_Tag__c';
import ZariCertificate from '@salesforce/schema/Product__c.Zari_Certificate__c';
import CraftMark from '@salesforce/schema/Product__c.Craft_Mark__c';
import Transparency from '@salesforce/schema/Product__c.Transparency__c';
import Breathability from '@salesforce/schema/Product__c.Breathability__c';
import Drapability from '@salesforce/schema/Product__c.Drapability__c';
import SareeLengthinMeter from '@salesforce/schema/Product__c.Saree_Length_in_Meter__c';
import SareeWidthinMeter from '@salesforce/schema/Product__c.Saree_Width_in_Meter__c';
import BlouseLengthinCM from '@salesforce/schema/Product__c.Blouse_Length_in_CM__c';

export default class Productattributioneditlwc extends NavigationMixin(LightningElement) {
    
    @track isSkuCodeSearchDisabled = true;
    @track isEditSaveButtonDisabled = true;

    @track isTableDisabled = true;

    @track skuCodeName;
    @track skuCodesearchKey;

    @track isDisplayTable = false;
    @track SelectedAll=true;
    @track UnSelectedAll=true;
    @track loader = false;
    showModal = false;
    showModalPopup = false;

    @track SkucodeSearchRowData = [];

    @track newRow = {
        count: 0,
        isDisabled:false,
        filled: false,
        skucodename:'',
        skuCode: '',
        weightInG: '',
        bodyPatterns: '',
        patternType: '',
        bodyDesignElement: '',
        butaSize: '',
        borderTechnique: '',
        borderType: '',
        borderDimInInch: '',
        borderMaterial: '',
        borderMatching: '',
        palluMatching: '',
        palluType: '',
        blouseType: '',
        blouseDesignElement: '',
        koniya: '',
        tasseling: '',
        piping: '',
        fallPico: '',
        weaveFabric: '',
        colorType: '',
        borderColor: '',
        blouseColor: '',
        silkMark: '',
        gITag: '',
        zariCertificate: '',
        craftMark: '',
        transparency: '',
        breathability: '',
        drapability: '',
        washcare: '',
        sareeLengthinMeter: '',
        sareeWidthinMeter: '',
        blouseLengthinCM: '',
        patternTypeOptions: [],
        BodyDesignElementOptions: [],
        ButaSizeOptions: [],
        BorderColorOptions: [],
        BlouseColorOptions: [],
      };

    @track BodyPatternUpdateOptions;
    @track PatternTypeFieldData;
    @track BodyDesignElementFieldData;
    @track ButaSizeFieldData;
    @track BorderMatchingOptions;
    @track BorderColorFieldData;
    @track BlouseTypeOptions;
    @track BlouseColorFieldData;

    @wire(getObjectInfo, { objectApiName: Productobject })
    productInfo;

    @wire(getPicklistValues, {recordTypeId: '$productInfo.data.defaultRecordTypeId', fieldApiName: PatternType })
    PatternTypeFieldInfo({ data, error }) {
        if (data) 
        {
        this.PatternTypeFieldData = data;
        }
        if (error) {
        console.error('Error fetching picklist values:', error);
        }   
    }
    @wire(getPicklistValues, {recordTypeId:'$productInfo.data.defaultRecordTypeId', fieldApiName: BodyPatternUpdate })
    BodyPatternUpdateFieldInfo({ data, error }) {
        if (data) {
        this.BodyPatternUpdateOptions = data.values;
        }
        if (error) {
        console.error('Error fetching picklist values:', error);
        }  
    }
    @wire(getPicklistValues, {recordTypeId: '$productInfo.data.defaultRecordTypeId', fieldApiName: BodyDesignElement })
    BodyDesignElementFieldInfo({ data, error }) {
        if (data) 
        {
        this.BodyDesignElementFieldData = data;
        }
        if (error) {
        console.error('Error fetching picklist values:', error);
        }   
    }
    @wire(getPicklistValues, { recordTypeId: '$productInfo.data.defaultRecordTypeId', fieldApiName: ButaSize })
    ButaSizeFieldInfo({ data, error }) {
        if (data) 
        {
        this.ButaSizeFieldData = data;
        }
        if (error) {
        console.error('Error fetching picklist values:', error);
        }   
    } 
    @wire(getPicklistValues, {recordTypeId: '$productInfo.data.defaultRecordTypeId', fieldApiName: BorderColor })
    BorderColorFieldInfo({ data, error }) {
        if (data) 
        {
        this.BorderColorFieldData = data;
        }
        if (error) {
        console.error('Error fetching picklist values:', error);
        }   
    }
    @wire(getPicklistValues, {recordTypeId:'$productInfo.data.defaultRecordTypeId', fieldApiName: BorderMatching })
    BorderMatchingFieldInfo({ data, error }) {
        if (data) {
        this.BorderMatchingOptions = data.values;
        console.log('log fetching picklist values:', this.BorderMatchingOptions);
        }
        if (error) {
        console.error('Error fetching picklist values:', error);
        }  
    }
    @wire(getPicklistValues, {recordTypeId: '$productInfo.data.defaultRecordTypeId', fieldApiName: BlouseColor })
    BlouseColorFieldInfo({ data, error }) {
        if (data) 
        {
        this.BlouseColorFieldData = data;
        console.log('log fetching picklist values:', this.BlouseColorFieldData);
        }
        if (error) {
        console.error('Error fetching picklist values:', error);
        }   
    }
    @wire(getPicklistValues, {recordTypeId:'$productInfo.data.defaultRecordTypeId', fieldApiName: BlouseType })
    BlouseTypeFieldInfo({ data, error }) {
        if (data) {
        this.BlouseTypeOptions = data.values;
        console.log('log fetching picklist values:', this.BlouseTypeOptions);
        }
        if (error) {
        console.error('Error fetching picklist values:', error);
        }  
    }  
    @wire(getPicklistValues,
    {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: BorderDim
    }
    )
    BorderDimValues;
    @wire(getPicklistValues,
    {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: Washcare
    }
    )
    WashcareValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: BorderTechnique
        }
    )
    BorderTechniqueValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: BorderType
        }
    )
    BorderTypeValues;    
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: BorderMaterial
        }
    )
    BorderMaterialValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: PalluMatching
        }
    )
    PalluMatchingValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: PalluType
        }
    )
    PalluTypeValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: BlouseDesignElement
        }
    )
    BlouseDesignElementValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: Koniya
        }
    )
    KoniyaValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: Tasseling
        }
    )
    TasselingValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: Piping
        }
    )
    PipingValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: FallPico
        }
    )
    FallPicoValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: WeaveFabric
        }
    )
    WeaveFabricValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: ColorType
        }
    )
    ColorTypeValues;
    
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: SilkMark
        }
    )
    SilkMarkValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: GITag
        }
    )
    GITagValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: ZariCertificate
        }
    )
    ZariCertificateValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: CraftMark
        }
    )
    CraftMarkValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: Transparency
        }
    )
    TransparencyValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: Breathability
        }
    )
    BreathabilityValues;
    @wire(getPicklistValues,
        {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: Drapability
        }
    )
    DrapabilityValues;
    @wire(getPicklistValues,
      {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: SareeLengthinMeter
      }
    )
    SareeLengthinMeterValues;
    @wire(getPicklistValues,
      {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: SareeWidthinMeter
      }
    )
    SareeWidthinMeterValues;
    @wire(getPicklistValues,
      {
        recordTypeId: '$productInfo.data.defaultRecordTypeId',
        fieldApiName: BlouseLengthinCM
      }
    )
    BlouseLengthinCMValues;

    openModal(event) 
    {
        this.showModal = true;
    }

    closeModal() 
    {
        this.showModal = false;
    }

    openModalPrevious(event) 
    {
        this.showModalPopup = true;
    }

    closeModalPrevious() 
    {
        this.showModalPopup = false;
    }
    
    handleMainPage(){
        const mainPageEvent = new CustomEvent('mainpage');
        this.dispatchEvent(mainPageEvent);
    }

    SelectedAllHandler(event){
        this.SkucodeSearchRowData = this.SkucodeSearchRowData.map(item => ({ ...item, filled: true}));
        console.log('SelectedAllHandler all json  filter Valid Product Data List:', JSON.stringify(this.SkucodeSearchRowData));
        this.SelectedAll=true;
        this.UnSelectedAll=false;
    }
    
    UnSelectedAllHandler(event){
        this.SkucodeSearchRowData =  this.SkucodeSearchRowData.map(item => ({ ...item, filled: false }));
        console.log('UnSelectedAllHandler all json  filter Valid Product Data List:', JSON.stringify(this.SkucodeSearchRowData));
        this.SelectedAll=false;
        this.UnSelectedAll=true;
    }
    
    handleSkuSelection(event){        
        let searchDetail = event.detail;
        let searchId = searchDetail.id;
        let searchName = searchDetail.name;
        this.skuCodeName = searchName;
        this.skuCodesearchKey = searchId;
        this.isSkuCodeSearchDisabled =false;
        console.log('test');
    }
  
    handleSearchskucode(){  
        if (!this.skuCodesearchKey || this.skuCodesearchKey.trim() === '') {
            // Show a message or handle the case when skuCodesearchKey is empty
            this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Please enter a SKU code before searching.');
            return;
        }
        else{
            this.loader = true;
            FetchEditSkucodeSearch({textkey: this.skuCodesearchKey})
            .then(data => {
                const isDuplicate = this.SkucodeSearchRowData.some(item => item.skuCode === data.Id);
                if (isDuplicate) {
                    this.loader = false;
                    this.template.querySelector('c-custom-toast-message-component').showToast('error', 'This SKU is already present in table..!');
                    console.log('This SKU is already present in table..!');
                    //this.template.querySelector('c-custom-toast-message-component').showToast('error', 'This SKU is already present in table..!');
                }
                else
                {
                    const newRowData = {
                        filled: false,
                        skucodename:data.SKU_Code__c,
                        skuCode: data.Id,
                        weightInG: data.Weight_in_G__c,
                        bodyPatterns: data.Body_Pattern_Update__c,
                        patternType: data.Pattern_Type__c,
                        bodyDesignElement: data.Body_Design_Element__c,
                        butaSize: data.Buta_Size__c,
                        borderTechnique: data.Border_Technique__c,
                        borderType: data.Border_Type__c,
                        borderDimInInch: data.Border_Dim__c,
                        borderMaterial: data.Border_Material__c,
                        borderMatching: data.Border_Matching__c,
                        palluMatching: data.Pallu_Matching__c,
                        palluType: data.Pallu_Type__c,
                        blouseType: data.Blouse_Type__c,
                        blouseDesignElement: data.Blouse_Design_Element__c,
                        koniya: data.Koniya__c,
                        tasseling: data.Tasseling__c,
                        piping: data.Piping__c,
                        fallPico: data.Fall_Pico__c,
                        weaveFabric:data.Weave_Fabric__c,
                        colorType: data.Color_Type__c,
                        borderColor: data.Border_Color__c,
                        blouseColor: data.Blouse_Color__c,
                        silkMark: data.Silk_Mark__c,
                        gITag: data.GI_Tag__c,
                        zariCertificate: data.Zari_Certificate__c,
                        craftMark: data.Craft_Mark__c,
                        transparency: data.Transparency__c,
                        breathability: data.Breathability__c,
                        drapability: data.Drapability__c,
                        washcare: data.Washcare__c,
                        sareeLengthinMeter: data.Saree_Length_in_Meter__c,
                        sareeWidthinMeter: data.Saree_Width_in_Meter__c,
                        blouseLengthinCM: data.Blouse_Length_in_CM__c,
                    };
                    if(newRowData.bodyPatterns) {
                        let key = this.PatternTypeFieldData.controllerValues[newRowData.bodyPatterns]; 
                        let keybody = this.BodyDesignElementFieldData.controllerValues[newRowData.bodyPatterns]; 
                        let keybuta = this.ButaSizeFieldData.controllerValues[newRowData.bodyPatterns];
                        newRowData.patternTypeOptions = this.PatternTypeFieldData.values.filter(opt => opt.validFor.includes(key));
                        newRowData.BodyDesignElementOptions = this.BodyDesignElementFieldData.values.filter(opt => opt.validFor.includes(keybody));
                        newRowData.ButaSizeOptions = this.ButaSizeFieldData.values.filter(opt => opt.validFor.includes(keybuta));
                    } 
                    if(newRowData.borderMatching) {
                        let key = this.BorderColorFieldData.controllerValues[newRowData.borderMatching]; 
                        newRowData.BorderColorOptions = this.BorderColorFieldData.values.filter(opt => opt.validFor.includes(key));
                    }
                    if(newRowData.blouseType) {
                        let key = this.BlouseColorFieldData.controllerValues[newRowData.blouseType]; 
                        newRowData.BlouseColorOptions = this.BlouseColorFieldData.values.filter(opt => opt.validFor.includes(key));
                    }
                    this.SkucodeSearchRowData = [...this.SkucodeSearchRowData, newRowData];   
                    this.loader = false;
                    this.isEditSaveButtonDisabled =false;
                    const customLookup = this.template.querySelector('c-productattributionlookuplwc');
                    customLookup.clearSelection();
                    //this.template.querySelector('c-productattributionlookuplwc')[0].clearSelection();
                    console.log('this sku after insert newRowData this.SkucodeSearchRowData = [...this.SkucodeSearchRowData, this.newRow]; SkucodeSearchRowData sku insert data id this.filteredRowData', JSON.stringify(this.SkucodeSearchRowData));
                }
            })
            .catch(error => {
                this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Error fetching SkucodeSearchRowData:'+error);    
                console.error('Error fetching SkucodeSearchRowData:', error);
            });
            this.isDisplayTable = true;
        }
        this.skuCodesearchKey = '';
    }
    
    handleEdit(){
        this.isTableDisabled = false;
        this.SelectedAll =false;
    }

    changeHandler(event) {
        let selectedRowIndex = event.currentTarget.dataset.index;
        let propertyName = event.target.name;
        let propertyValue = event.target.value;
        console.log('propertyName :', JSON.stringify(propertyName));
        console.log('propertyValue :', JSON.stringify(propertyValue));
            
        // Define a mapping of input names to SkucodeSearchRowData properties
        const propertyMap = {
            filled:'filled',
            weightInG: 'weightInG',
            bodyPatterns: 'bodyPatterns',
            patternType: 'patternType',
            bodyDesignElement: 'bodyDesignElement',
            butaSize: 'butaSize',
            borderTechnique: 'borderTechnique',
            borderType: 'borderType',
            borderDimInInch: 'borderDimInInch',
            borderMaterial: 'borderMaterial',
            borderMatching: 'borderMatching',
            palluMatching: 'palluMatching',
            palluType: 'palluType',
            blouseType: 'blouseType',
            blouseDesignElement: 'blouseDesignElement',
            koniya: 'koniya',
            tasseling: 'tasseling',
            piping: 'piping',
            fallPico: 'fallPico',
            weaveFabric: 'weaveFabric',
            colorType: 'colorType',
            borderColor: 'borderColor',
            blouseColor: 'blouseColor',
            silkMark: 'silkMark',
            gITag: 'gITag',
            zariCertificate: 'zariCertificate',
            craftMark: 'craftMark',
            transparency: 'transparency',
            breathability: 'breathability',
            drapability: 'drapability',
            washcare: 'washcare',
            sareeLengthinMeter: 'sareeLengthinMeter',
            sareeWidthinMeter: 'sareeWidthinMeter',
            blouseLengthinCM: 'blouseLengthinCM',
        };
        console.log('propertyMap :', JSON.stringify(propertyMap));
        if(propertyName === 'filled') {
            this.SkucodeSearchRowData[selectedRowIndex].filled = event.target.checked;
            console.log('filled all json  filter Valid Product Data List:', JSON.stringify(this.SkucodeSearchRowData[selectedRowIndex]));
        }
        else if(propertyName === 'bodyPatterns') {
            let key = this.PatternTypeFieldData.controllerValues[propertyValue];            
            let keybody = this.BodyDesignElementFieldData.controllerValues[propertyValue]; 
            let keybuta = this.ButaSizeFieldData.controllerValues[propertyValue];
            this.SkucodeSearchRowData[selectedRowIndex].bodyPatterns = propertyValue;
            console.log('bodyPatterns all json  filter Valid Product Data List:', JSON.stringify(this.SkucodeSearchRowData[selectedRowIndex]));
            this.SkucodeSearchRowData[selectedRowIndex].patternTypeOptions = this.PatternTypeFieldData.values.filter(opt => opt.validFor.includes(key));
            this.SkucodeSearchRowData[selectedRowIndex].BodyDesignElementOptions = this.BodyDesignElementFieldData.values.filter(opt => opt.validFor.includes(keybody));
            this.SkucodeSearchRowData[selectedRowIndex].ButaSizeOptions = this.ButaSizeFieldData.values.filter(opt => opt.validFor.includes(keybuta)); 
          
        }
        else if(propertyName === 'borderMatching') {
            let key = this.BorderColorFieldData.controllerValues[propertyValue];            
            this.SkucodeSearchRowData[selectedRowIndex].borderMatching = propertyValue;
            this.SkucodeSearchRowData[selectedRowIndex].BorderColorOptions = this.BorderColorFieldData.values.filter(opt => opt.validFor.includes(key)); 
        }
        else if(propertyName === 'blouseType') {
            let key = this.BlouseColorFieldData.controllerValues[propertyValue]; 
            this.SkucodeSearchRowData[selectedRowIndex].blouseType = propertyValue;
            this.SkucodeSearchRowData[selectedRowIndex].BlouseColorOptions = this.BlouseColorFieldData.values.filter(opt => opt.validFor.includes(key));
        }
        else if(propertyMap.hasOwnProperty(propertyName)) {
            // Update the corresponding property in SkucodeSearchRowData
            this.SkucodeSearchRowData[selectedRowIndex][propertyMap[propertyName]] = propertyValue;    
            console.log('filteredData all json  filter Valid Product Data List:', JSON.stringify(this.SkucodeSearchRowData[selectedRowIndex]));
            console.log('filteredData json  filter Valid Product Data List:', JSON.stringify(this.SkucodeSearchRowData));
        }
    }  

    handleSaveValidation(){
        let filteredData = this.SkucodeSearchRowData.filter(item => item.filled === true);
        console.log('filteredData json Valid Product Data List:', JSON.stringify(filteredData));
        console.log('filteredData without json and Valid Product Data List:', filteredData);
    
        if (filteredData && filteredData.length > 0) {
            let validData = filteredData.filter(item => {
                // Check if any property is undefined or empty string
                let hasUndefinedOrEmptyProperty = (item.skuCode === undefined || item.skuCode === "") ||  
                                                (item.weightInG === undefined || item.weightInG === "")||
                                                (item.bodyPatterns === undefined || item.bodyPatterns === "")||
                                                (item.patternType === undefined || item.patternType === "")||
                                                (item.bodyDesignElement === undefined || item.bodyDesignElement === "")||
                                                (item.butaSize === undefined || item.butaSize === "")||
                                                (item.borderDimInInch === undefined || item.borderDimInInch === "")||
                                                (item.borderColor === undefined || item.borderColor === "")||
                                                (item.borderTechnique === undefined || item.borderTechnique === "") ||  
                                                (item.borderType === undefined || item.borderType === "")||
                                                (item.borderMaterial === undefined || item.borderMaterial === "") ||  
                                                (item.borderMatching === undefined || item.borderMatching === "")||
                                                (item.palluMatching === undefined || item.palluMatching === "") ||  
                                                (item.palluType === undefined || item.palluType === "")||
                                                (item.blouseType === undefined || item.blouseType === "")||
                                                (item.blouseDesignElement === undefined || item.blouseDesignElement === "") ||  
                                                (item.koniya === undefined || item.koniya === "")||
                                                (item.tasseling === undefined || item.tasseling === "") ||  
                                                (item.piping === undefined || item.piping === "")||
                                                (item.fallPico === undefined || item.fallPico === "") ||  
                                                (item.weaveFabric === undefined || item.weaveFabric === "")||
                                                (item.colorType === undefined || item.colorType === "") ||  
                                                (item.blouseColor === undefined || item.blouseColor === "") ||  
                                                (item.silkMark === undefined || item.silkMark === "")||
                                                (item.gITag === undefined || item.gITag === "") ||  
                                                (item.zariCertificate === undefined || item.zariCertificate === "")||                                          
                                                (item.craftMark === undefined || item.craftMark === "")||
                                                (item.transparency === undefined || item.transparency === "")||
                                                (item.breathability === undefined || item.breathability === "") ||
                                                (item.drapability === undefined || item.drapability === "")||
                                                (item.washcare === undefined || item.washcare === "")||
                                                (item.sareeLengthinMeter === undefined || item.sareeLengthinMeter === "") || 
                                                (item.sareeWidthinMeter === undefined || item.sareeWidthinMeter === "") || 
                                                (item.blouseLengthinCM === undefined || item.blouseLengthinCM === "");
                return !hasUndefinedOrEmptyProperty;
            });
            console.log('validData apex json Valid Product Data List:', JSON.stringify(validData));
            if (validData.length !== filteredData.length) {
                // Display error message because some items have undefined or empty properties
                console.log('validData apex json Valid Product Data List:', JSON.stringify(validData));
                this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Some Sku code are not filled all field..!');    
                console.log('Some Sku code are not filled all field..!');
                //this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Some Sku code are not filled all field..!');
            } 
            else {
                this.handlesaveData(validData);
                console.log('validData apex json Valid Product Data List:', JSON.stringify(validData));
                console.log('filteredData apex json Valid Product Data List:', JSON.stringify(filteredData));
            }
        }
        else {
            this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Sku code Data is not selected..!');    
            console.log('Sku code Data is not selected..!');
            //this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Sku code Data is not selected..!');
        }
      }

    handlesaveData(validData) {
        console.log('validData' + JSON.stringify(validData));
        updateProductData({ validData: validData })
          .then(result => {
            // Handle successful update
            const toastComponent = this.template.querySelector('c-custom-toast-message-component');
            toastComponent.showToast('success', 'Successfully Sku Records are updated!');
                
            // Delay the dispatch of mainpage event
            setTimeout(() => {
               this.SkucodeSearchRowData = [];
               this.closeModal();
            }, 1000); // You can adjust the delay time if needed
        })
        .catch(error => {
            // Handle error
            console.error('Error updating objects:', error);
            const toastComponent = this.template.querySelector('c-custom-toast-message-component');
            toastComponent.showToast('error', 'Error updating sku.');
        });
    }
}