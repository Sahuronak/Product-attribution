import { LightningElement,track,wire,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import fetchIndividualSkucodeDetails from '@salesforce/apex/ProductAttributionController.fetchIndividualSkucodeDetails';
import fetchIndividualCopyFromDetails from '@salesforce/apex/ProductAttributionController.fetchIndividualCopyFromDetails';
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

export default class Productattributionindividuallwc extends NavigationMixin(LightningElement) 
{
  @api isback;
  showModal = false;
  showModalPopup = false;

  @track isEditSaveButtonDisabled = true;
  @track skuCodeName;
  @track skuCodesearchKey;
  @track copyfromName;
  @track copyfromsearchKey;

  @track counter = -1;
  @track rowdata = [];
  @track filteredRowData = [];
  
  @track SelectedAll=true;
  @track UnSelectedAll=true;
  isDisplayTable = false;
  
  @track newRow = {
    count: 0,
    isDisabled:false,
    filled: false,
    skucodename:'',
    copyFromname: '',
    skuCode: '',
    copyFrom: '',
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
    }
    if (error) {
      console.error('Error fetching picklist values:', error);
    }   
  }
  @wire(getPicklistValues, {recordTypeId:'$productInfo.data.defaultRecordTypeId', fieldApiName: BlouseType })
  BlouseTypeFieldInfo({ data, error }) {
    if (data) {
      this.BlouseTypeOptions = data.values;
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
      fieldApiName: BlouseColor
    }
  )
  BlouseColorValues;
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

  SelectedAllHandler(event){
    this.rowdata = this.rowdata.map(item => ({ ...item, filled: !item.isDisabled }));
    console.log('filteredData json SelectedAllHandler Valid Product Data List:', JSON.stringify(this.rowdata));
    this.filteredRowData = this.filteredRowData.map(item => ({ ...item, filled: !item.isDisabled}));
    console.log('filteredVendorSkuCodeData Reverse json SelectedAllHandler Valid Product Data:', JSON.stringify(this.filteredRowData));
    this.SelectedAll=true;
    this.UnSelectedAll=false;
  }

  UnSelectedAllHandler(event){
    this.rowdata =  this.rowdata.map(item => ({ ...item, filled: false }));
    console.log('filteredData json UnSelectedAllHandler Valid Product Data List:', JSON.stringify(this.rowdata));
    this.filteredRowData = this.filteredRowData.map(item => ({ ...item, filled: event.target.checked }));
    console.log('filteredVendorSkuCodeData Reverse data json UnSelectedAllHandler Valid Product Data List:', JSON.stringify(this.filteredRowData));
    this.SelectedAll=false;
    this.UnSelectedAll=true;
  }

  handleMainPage(){
    console.log('Button main Clicked');
    //this.isback();
    const mainPageEvent = new CustomEvent('mainpage');
    this.dispatchEvent(mainPageEvent);
  }

  handleAddRow() {
    let newRow = { ...this.newRow }; // Create a new object using object spread syntax
    this.counter = this.counter + 1;
    newRow.isDisabled = true;
    newRow.count = this.counter; // Assign the count property to the new object
    let rowdata = [...this.rowdata, newRow]; // Push the new object into the rowdata array
    this.rowdata = rowdata;
    if (this.rowdata && this.rowdata.length > 0) {
      this.isDisplayTable = true;    
      this.isEditSaveButtonDisabled =false;       
      this.filteredRowData = this.rowdata;
    }
  }

  handleProductSelection(event){
    let searchDetail = event.detail;
    let searchId = searchDetail.id;
    let searchName = searchDetail.name;
    let selectedRowIndex = event.currentTarget.dataset.index;
    let selectedRowIndexcount = event.currentTarget.dataset.index.count;
    this.skuCodeName = searchName;
    this.skuCodesearchKey = searchId;
    this.showLoadingSpinner = true;

    const foundObject = this.rowdata.find(obj => obj.skuCode === this.skuCodesearchKey); 
    if (foundObject) 
    {   
      this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Sku code is already present..!');  
    } 
    else 
    { 
      if(this.skuCodesearchKey == undefined){
      this.rowdata[selectedRowIndex].filled = false;
      this.rowdata[selectedRowIndex].isDisabled = true;
      this.rowdata[selectedRowIndex].skuCode = undefined;
      this.rowdata[selectedRowIndex].skuCodeName = '';
      this.rowdata[selectedRowIndex].copyFrom = '';
      this.rowdata[selectedRowIndex].copyFromname = '';
      this.rowdata[selectedRowIndex].weightInG = '';
      this.rowdata[selectedRowIndex].bodyPatterns = '';
      this.rowdata[selectedRowIndex].patternType = '';
      this.rowdata[selectedRowIndex].bodyDesignElement = '';
      this.rowdata[selectedRowIndex].butaSize = '';
      this.rowdata[selectedRowIndex].borderTechnique = '';
      this.rowdata[selectedRowIndex].borderType = '';
      this.rowdata[selectedRowIndex].borderDimInInch = '';
      this.rowdata[selectedRowIndex].borderMatching = '';
      this.rowdata[selectedRowIndex].borderMaterial = '';
      this.rowdata[selectedRowIndex].palluMatching = '';
      this.rowdata[selectedRowIndex].palluType = '';
      this.rowdata[selectedRowIndex].blouseType = '';
      this.rowdata[selectedRowIndex].blouseDesignElement = '';
      this.rowdata[selectedRowIndex].koniya = '';
      this.rowdata[selectedRowIndex].tasseling = '';
      this.rowdata[selectedRowIndex].piping = '';
      this.rowdata[selectedRowIndex].weaveFabric = '';
      this.rowdata[selectedRowIndex].fallPico = '';
      this.rowdata[selectedRowIndex].colorType = '';
      this.rowdata[selectedRowIndex].borderColor = '';
      this.rowdata[selectedRowIndex].blouseColor = '';
      this.rowdata[selectedRowIndex].silkMark = '';
      this.rowdata[selectedRowIndex].gITag = '';
      this.rowdata[selectedRowIndex].zariCertificate = '';
      this.rowdata[selectedRowIndex].craftMark = '';
      this.rowdata[selectedRowIndex].transparency = '';
      this.rowdata[selectedRowIndex].breathability = '';
      this.rowdata[selectedRowIndex].drapability = '';
      this.rowdata[selectedRowIndex].washcare = '';
      this.rowdata[selectedRowIndex].sareeLengthinMeter = '';
      this.rowdata[selectedRowIndex].sareeWidthinMeter = '';
      this.rowdata[selectedRowIndex].blouseLengthinCM = '';
      this.rowdata[selectedRowIndex].patternTypeOptions = [];
      this.rowdata[selectedRowIndex].BodyDesignElementOptions = [];
      this.rowdata[selectedRowIndex].ButaSizeOptions = [];
      this.filteredRowData = this.rowdata;
      console.log('rowdata sku seleceted skucodeselected this.rowdata', JSON.stringify(this.rowdata)); 
      }
      else{   
        this.rowdata[selectedRowIndex].isDisabled = false; 
        this.SelectedAll = false;
        fetchIndividualSkucodeDetails({textkey: this.skuCodesearchKey})
            .then(data =>
            {
              this.rowdata[selectedRowIndex].skuCode = data.Id;
              this.rowdata[selectedRowIndex].skucodename = data.SKU_Code__c;
              this.rowdata[selectedRowIndex].weightInG = data.Weight_in_G__c;
              this.rowdata[selectedRowIndex].bodyPatterns = data.Body_Pattern_Update__c;
              this.rowdata[selectedRowIndex].patternType = data.Pattern_Type__c;
              this.rowdata[selectedRowIndex].bodyDesignElement= data.Body_Design_Element__c;
              this.rowdata[selectedRowIndex].butaSize = data.Buta_Size__c;
              this.rowdata[selectedRowIndex].borderTechnique = data.Border_Technique__c;
              this.rowdata[selectedRowIndex].borderType = data.Border_Type__c;
              this.rowdata[selectedRowIndex].borderDimInInch = data.Border_Dim__c;
              this.rowdata[selectedRowIndex].borderMaterial = data.Border_Material__c;
              this.rowdata[selectedRowIndex].borderMatching = data.Border_Matching__c;
              this.rowdata[selectedRowIndex].palluMatching = data.Pallu_Matching__c;
              this.rowdata[selectedRowIndex].palluType = data.Pallu_Type__c;
              this.rowdata[selectedRowIndex].blouseType = data.Blouse_Type__c;
              this.rowdata[selectedRowIndex].blouseDesignElement = data.Blouse_Design_Element__c;
              this.rowdata[selectedRowIndex].koniya = data.Koniya__c;
              this.rowdata[selectedRowIndex].tasseling = data.Tasseling__c;
              this.rowdata[selectedRowIndex].piping = data.Piping__c;
              this.rowdata[selectedRowIndex].fallPico = data.Fall_Pico__c;
              this.rowdata[selectedRowIndex].weaveFabric = data.Weave_Fabric__c;
              this.rowdata[selectedRowIndex].colorType = data.Color_Type__c;
              this.rowdata[selectedRowIndex].borderColor = data.Border_Color__c;
              this.rowdata[selectedRowIndex].blouseColor = data.Blouse_Color__c;
              this.rowdata[selectedRowIndex].silkMark = data.Silk_Mark__c;
              this.rowdata[selectedRowIndex].gITag = data.GI_Tag__c;
              this.rowdata[selectedRowIndex].zariCertificate = data.Zari_Certificate__c;
              this.rowdata[selectedRowIndex].craftMark = data.Craft_Mark__c;
              this.rowdata[selectedRowIndex].transparency = data.Transparency__c;
              this.rowdata[selectedRowIndex].breathability = data.Breathability__c;
              this.rowdata[selectedRowIndex].drapability = data.Drapability__c;
              this.rowdata[selectedRowIndex].washcare = data.Washcare__c;
              this.rowdata[selectedRowIndex].sareeLengthinMeter = data.Saree_Length_in_Meter__c;
              this.rowdata[selectedRowIndex].sareeWidthinMeter = data.Saree_Width_in_Meter__c;
              this.rowdata[selectedRowIndex].blouseLengthinCM = data.Blouse_Length_in_CM__c;           
              if(data.Body_Pattern_Update__c) {
                let key = this.PatternTypeFieldData.controllerValues[data.Body_Pattern_Update__c]; 
                let keybody = this.BodyDesignElementFieldData.controllerValues[data.Body_Pattern_Update__c]; 
                let keybuta = this.ButaSizeFieldData.controllerValues[data.Body_Pattern_Update__c];
                this.rowdata[selectedRowIndex].patternTypeOptions = this.PatternTypeFieldData.values.filter(opt => opt.validFor.includes(key));
                this.rowdata[selectedRowIndex].BodyDesignElementOptions = this.BodyDesignElementFieldData.values.filter(opt => opt.validFor.includes(keybody));
                this.rowdata[selectedRowIndex].ButaSizeOptions = this.ButaSizeFieldData.values.filter(opt => opt.validFor.includes(keybuta));
              }
              if(data.Border_Matching__c) {
                let key = this.BorderColorFieldData.controllerValues[data.Border_Matching__c]; 
                this.rowdata[selectedRowIndex].BorderColorOptions = this.BorderColorFieldData.values.filter(opt => opt.validFor.includes(key));
              }
              if(data.Blouse_Type__c) {
                let key = this.BlouseColorFieldData.controllerValues[data.Blouse_Type__c]; 
                this.rowdata[selectedRowIndex].BlouseColorOptions = this.BlouseColorFieldData.values.filter(opt => opt.validFor.includes(key));
              }
            });
            this.filteredRowData = this.rowdata;
            console.log('rowdata sku event deleted skucodeselected id this.filteredRowData', JSON.stringify(this.filteredRowData));
            console.log('rowdata sku seleceted skucodeselected id this.rowdata', JSON.stringify(this.rowdata));          
      } 
    } 
  }
  
  handleProductCopyFrom(event){
    let searchDetail = event.detail;
    let searchId = searchDetail.id;
    let searchName = searchDetail.name;
    let selectedRowIndex = event.currentTarget.dataset.index;
    this.copyfromName = searchName;
    this.copyfromsearchKey = searchId;
    this.showLoadingSpinner = true;
    if(this.copyfromsearchKey == undefined){
      this.rowdata[selectedRowIndex] = this.rowdata[selectedRowIndex];      
      this.filteredRowData = this.rowdata;     
    }
    else{
      fetchIndividualCopyFromDetails({textkey: this.copyfromsearchKey})
          .then(data =>
          {
            //console.log('this.rowdata[selectedRowIndex] data all', JSON.stringify(this.rowdata[selectedRowIndex]));
            this.rowdata[selectedRowIndex].copyFrom = data.Id;
            this.rowdata[selectedRowIndex].copyFromname = data.SKU_Code__c;
            if(this.rowdata[selectedRowIndex].weightInG == undefined){
              this.rowdata[selectedRowIndex].weightInG = data.Weight_in_G__c;
            }           
            if(this.rowdata[selectedRowIndex].bodyPatterns == undefined){
              this.rowdata[selectedRowIndex].bodyPatterns = data.Body_Pattern_Update__c;
              let key = this.PatternTypeFieldData.controllerValues[data.Body_Pattern_Update__c];
              let keybody = this.BodyDesignElementFieldData.controllerValues[data.Body_Pattern_Update__c]; 
              let keybuta = this.ButaSizeFieldData.controllerValues[data.Body_Pattern_Update__c];
              this.rowdata[selectedRowIndex].patternTypeOptions = this.PatternTypeFieldData.values.filter(opt => opt.validFor.includes(key)); 
              this.rowdata[selectedRowIndex].BodyDesignElementOptions = this.BodyDesignElementFieldData.values.filter(opt => opt.validFor.includes(keybody));
              this.rowdata[selectedRowIndex].ButaSizeOptions = this.ButaSizeFieldData.values.filter(opt => opt.validFor.includes(keybuta));         
            } 
            if(this.rowdata[selectedRowIndex].patternType == undefined){
              this.rowdata[selectedRowIndex].patternType = data.Pattern_Type__c;
            } 
            if(this.rowdata[selectedRowIndex].bodyDesignElement == undefined){
              this.rowdata[selectedRowIndex].bodyDesignElement= data.Body_Design_Element__c;
            } 
            if(this.rowdata[selectedRowIndex].butaSize == undefined){
              this.rowdata[selectedRowIndex].butaSize = data.Buta_Size__c;
            } 
            if(this.rowdata[selectedRowIndex].borderTechnique == undefined){
              this.rowdata[selectedRowIndex].borderTechnique = data.Border_Technique__c;
            }              
            if(this.rowdata[selectedRowIndex].borderType == undefined){
              this.rowdata[selectedRowIndex].borderType = data.Border_Type__c;
            } 
            if(this.rowdata[selectedRowIndex].borderDimInInch == undefined){
              this.rowdata[selectedRowIndex].borderDimInInch = data.Border_Dim__c;
            } 
            if(this.rowdata[selectedRowIndex].borderMaterial == undefined){
              this.rowdata[selectedRowIndex].borderMaterial = data.Border_Material__c;
            } 
            if(this.rowdata[selectedRowIndex].borderMatching == undefined){
              this.rowdata[selectedRowIndex].borderMatching = data.Border_Matching__c;
              let key = this.BorderColorFieldData.controllerValues[data.Border_Matching__c];
              this.rowdata[selectedRowIndex].BorderColorOptions = this.BorderColorFieldData.values.filter(opt => opt.validFor.includes(key)); 
            } 
            if(this.rowdata[selectedRowIndex].palluMatching == undefined){
              this.rowdata[selectedRowIndex].palluMatching = data.Pallu_Matching__c;
            } 
            if(this.rowdata[selectedRowIndex].palluType == undefined){
              this.rowdata[selectedRowIndex].palluType = data.Pallu_Type__c;
            } 
            if(this.rowdata[selectedRowIndex].blouseType == undefined){
              this.rowdata[selectedRowIndex].blouseType = data.Blouse_Type__c;
              let key = this.BlouseColorFieldData.controllerValues[data.Blouse_Type__c];
              this.rowdata[selectedRowIndex].BlouseColorOptions = this.BlouseColorFieldData.values.filter(opt => opt.validFor.includes(key)); 
            } 
            if(this.rowdata[selectedRowIndex].blouseDesignElement == undefined){
              this.rowdata[selectedRowIndex].blouseDesignElement = data.Blouse_Design_Element__c;
            } 
            if(this.rowdata[selectedRowIndex].koniya == undefined){
              this.rowdata[selectedRowIndex].koniya = data.Koniya__c;
            } 
            if(this.rowdata[selectedRowIndex].tasseling == undefined){
              this.rowdata[selectedRowIndex].tasseling = data.Tasseling__c;
            } 
            if(this.rowdata[selectedRowIndex].piping == undefined){
              this.rowdata[selectedRowIndex].piping = data.Piping__c;
            } 
            if(this.rowdata[selectedRowIndex].fallPico == undefined){
              this.rowdata[selectedRowIndex].fallPico = data.Fall_Pico__c;
            } 
            if(this.rowdata[selectedRowIndex].weaveFabric == undefined){
              this.rowdata[selectedRowIndex].weaveFabric = data.Weave_Fabric__c;
            } 
            if(this.rowdata[selectedRowIndex].colorType == undefined){
              this.rowdata[selectedRowIndex].colorType = data.Color_Type__c;
            } 
            if(this.rowdata[selectedRowIndex].borderColor == undefined){
              this.rowdata[selectedRowIndex].borderColor = data.Border_Color__c;
            } 
            if(this.rowdata[selectedRowIndex].blouseColor == undefined){
              this.rowdata[selectedRowIndex].blouseColor = data.Blouse_Color__c;
            } 
            if(this.rowdata[selectedRowIndex].silkMark == undefined){
              this.rowdata[selectedRowIndex].silkMark = data.Silk_Mark__c;
            } 
            if(this.rowdata[selectedRowIndex].gITag == undefined){
              this.rowdata[selectedRowIndex].gITag = data.GI_Tag__c;
            } 
            if(this.rowdata[selectedRowIndex].zariCertificate == undefined){
              this.rowdata[selectedRowIndex].zariCertificate = data.Zari_Certificate__c;
            } 
            if(this.rowdata[selectedRowIndex].craftMark == undefined){
              this.rowdata[selectedRowIndex].craftMark = data.Craft_Mark__c;
            } 
            if(this.rowdata[selectedRowIndex].transparency == undefined){
              this.rowdata[selectedRowIndex].transparency = data.Transparency__c;
            } 
            if(this.rowdata[selectedRowIndex].breathability == undefined){
              this.rowdata[selectedRowIndex].breathability = data.Breathability__c;
            } 
            if(this.rowdata[selectedRowIndex].drapability == undefined){
              this.rowdata[selectedRowIndex].drapability = data.Drapability__c;
            } 
            if(this.rowdata[selectedRowIndex].washcare == undefined){
              this.rowdata[selectedRowIndex].washcare = data.Washcare__c;
            } 
            if(this.rowdata[selectedRowIndex].sareeLengthinMeter == undefined){
              this.rowdata[selectedRowIndex].sareeLengthinMeter = data.Saree_Length_in_Meter__c;
            } 
            if(this.rowdata[selectedRowIndex].sareeWidthinMeter == undefined){
              this.rowdata[selectedRowIndex].sareeWidthinMeter = data.Saree_Width_in_Meter__c;
            } 
            if(this.rowdata[selectedRowIndex].blouseLengthinCM == undefined){
              this.rowdata[selectedRowIndex].blouseLengthinCM = data.Blouse_Length_in_CM__c;
            } 
          });          
          this.filteredRowData = this.rowdata;
    }  
  }

  changeHandler(event){
    let selectedRowIndex = event.currentTarget.dataset.index;
    let counter = this.filteredRowData[selectedRowIndex].count;
    console.log('filteredData json Valid Product Data List:', JSON.stringify(this.rowdata[selectedRowIndex]));
    console.log('filteredData without json and Valid Product Data List:', counter);

    console.log('filteredData json before filter Valid Product Data List:', JSON.stringify(this.rowdata));
    this.rowdata = this.rowdata.filter(item => {
      if (item.count === counter) {
        // Update another field, for example, 'filled', to true
        switch (event.target.name) {
          case 'filled':
            item.filled = event.target.checked;
            break;
          case 'weightInG':
            item.weightInG = event.target.value;
            break;
          case 'bodyPatterns':
            let key = this.PatternTypeFieldData.controllerValues[event.target.value];            
            let keybody = this.BodyDesignElementFieldData.controllerValues[event.target.value]; 
            let keybuta = this.ButaSizeFieldData.controllerValues[event.target.value];
            item.bodyPatterns = event.target.value;
            item.patternTypeOptions = this.PatternTypeFieldData.values.filter(opt => opt.validFor.includes(key));
            item.BodyDesignElementOptions = this.BodyDesignElementFieldData.values.filter(opt => opt.validFor.includes(keybody));
            item.ButaSizeOptions = this.ButaSizeFieldData.values.filter(opt => opt.validFor.includes(keybuta)); 
          break;
          case 'patternType':
            item.patternType = event.target.value;
          break;
          case 'bodyDesignElement':
            item.bodyDesignElement = event.target.value;
          break;
          case 'butaSize':
            item.butaSize = event.target.value;
          break;
          case 'borderDimInInch':
            item.borderDimInInch = event.target.value;
          break;
          case 'borderColor':
            item.borderColor = event.target.value;
          break;
          case 'washcare':
            item.washcare = event.target.value;
          break;  
          case 'borderTechnique':
            item.borderTechnique = event.target.value;
            break;
          case 'borderType':
            item.borderType = event.target.value;
            break;
          case 'borderMaterial':
            item.borderMaterial = event.target.value;
            break;
          case 'borderMatching':
            let keybordercolor = this.BorderColorFieldData.controllerValues[event.target.value];            
            item.borderMatching = event.target.value;
            item.BorderColorOptions = this.BorderColorFieldData.values.filter(opt => opt.validFor.includes(keybordercolor));
          break;
          case 'palluMatching':
            item.palluMatching = event.target.value;
            break;
          case 'palluType':
            item.palluType = event.target.value;
            break;
          case 'blouseType':
            let keyblousecolor = this.BlouseColorFieldData.controllerValues[event.target.value];            
            item.blouseType = event.target.value;
            item.BlouseColorOptions = this.BlouseColorFieldData.values.filter(opt => opt.validFor.includes(keyblousecolor));
            break;
          case 'blouseDesignElement':
            item.blouseDesignElement = event.target.value;
            break;
          case 'koniya':
            item.koniya = event.target.value;
            break;
          case 'tasseling':
            item.tasseling = event.target.value;
            break;
          case 'piping':
            item.piping = event.target.value;
            break;
          case 'fallPico':
            item.fallPico = event.target.value;
            break;
          case 'weaveFabric':
            item.weaveFabric = event.target.value;
            break;
          case 'colorType':
            item.colorType = event.target.value;
            break;
          case 'blouseColor':
            item.blouseColor = event.target.value;
            break;
          case 'silkMark':
            item.silkMark = event.target.value;
            break;
          case 'gITag':
            item.gITag = event.target.value;
            break;
          case 'zariCertificate':
            item.zariCertificate = event.target.value;
            break;
          case 'craftMark':
            item.craftMark = event.target.value;
            break;
          case 'transparency':
            item.transparency = event.target.value;
            break;
          case 'breathability':
            item.breathability = event.target.value;
            break;
          case 'drapability':
            item.drapability = event.target.value;
            break;
          case 'sareeLengthinMeter':
            item.sareeLengthinMeter = event.target.value;
            break;
          case 'sareeWidthinMeter':
            item.sareeWidthinMeter = event.target.value;
            break;
          case 'blouseLengthinCM':
            item.blouseLengthinCM = event.target.value;
            break;
          default:
            break;
        }
      }  
      return item;
    });
    console.log('filteredData json after filter Valid Product Data List:', JSON.stringify(this.rowdata));
    
    console.log('filteredData json down Valid Product Data List:', JSON.stringify(this.rowdata[selectedRowIndex]));
    console.log('filteredData without down json and Valid Product Data List:', JSON.stringify(this.rowdata[counter]));

  }

  handleSaveValidation(){
    let filteredData = this.rowdata.filter(item => item.filled === true);
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
                                          (item.drapability === undefined || item.drapability === "") ||
                                          (item.washcare === undefined || item.washcare === "")||
                                          (item.sareeLengthinMeter === undefined || item.sareeLengthinMeter === "") || 
                                          (item.sareeWidthinMeter === undefined || item.sareeWidthinMeter === "") || 
                                          (item.blouseLengthinCM === undefined || item.blouseLengthinCM === "");
        return !hasUndefinedOrEmptyProperty;
      });
      if (validData.length !== filteredData.length) {
        // Display error message because some items have undefined or empty properties
        this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Some Sku code are not filled all field..!');
      } 
      else {
        this.handlesaveData(validData);
        console.log('validData apex json Valid Product Data List:', JSON.stringify(validData));
        console.log('filteredData apex json Valid Product Data List:', JSON.stringify(filteredData));
      }
    }
    else {
      this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Sku code Data is not selected..!');
    }
  }
  
  handlesaveData(validData) {
    console.log('validData' + JSON.stringify(validData));
    updateProductData({ validData: validData })
      .then(result => {
        // Handle successful update
        const toastComponent = this.template.querySelector('c-custom-toast-message-component');
        toastComponent.showToast('success', 'Successfully Sku Records are updated!');
        console.log('Error beforr updating objects:');
        // Delay the dispatch of mainpage event
        setTimeout(() => {
          console.log('Error after updating ');
          this.rowdata = [];
          this.filteredRowData = [];
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