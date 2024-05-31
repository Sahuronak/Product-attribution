import { LightningElement,api,track,wire } from 'lwc';
import fetchVenderSkucodeDetails from '@salesforce/apex/ProductAttributionController.fetchVenderSkucodeDetails';
import fetchVenderCopyFromDetails from '@salesforce/apex/ProductAttributionController.fetchVenderCopyFromDetails';
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

export default class Productattributionvendorskucomponent extends LightningElement {
  @api venderId;

  isDisplayTable = false;
  @track SelectedAll=false;
  @track UnSelectedAll=true;
  @track loader = true;
  showModal = false;
  showModalPopup = false;

  @track skucodenamesearchKey;
  @track VendorSkuCodedata = [];
  @track filteredVendorSkuCodeData = [];

  @track copyfromName;
  @track copyfromsearchKey;

  @track newRow = {
    count: 0,
    filled: false,
    skucodename:'',
    skuCode: '',
    copyFromname: '',
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

  currentPage = 1;
  recordSize = 50; // Number of records per page
  totalPage = 1;

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
      this.handlePicklistValuesLoaded();
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
      this.handlePicklistValuesLoaded();
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
      this.handlePicklistValuesLoaded();
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
      this.handlePicklistValuesLoaded();
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
      this.handlePicklistValuesLoaded();
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

  handlePicklistValuesLoaded() {
    if (this.PatternTypeFieldData && this.BodyDesignElementFieldData && this.ButaSizeFieldData && this.BorderColorFieldData && this.BlouseColorFieldData) {
      this.handleconnected();
    }
  }

  handleconnected(){
    if (this.venderId) {
      fetchVenderSkucodeDetails({textkey: this.venderId})
        .then(result => {
          console.log('result'+ JSON.stringify(result));
          console.log('this.loader'+this.loader);
          if (result) {
            let count = 1; 
            result.forEach(item => {
              let modifiedRow = { ...this.newRow }; 
              modifiedRow.count = count++;
              modifiedRow.skucodename = item.SKU_Code__c; 
              modifiedRow.skuCode = item.Id; 
              modifiedRow.weightInG = item.Weight_in_G__c; 
              modifiedRow.bodyPatterns = item.Body_Pattern_Update__c; 
              modifiedRow.patternType = item.Pattern_Type__c; 
              modifiedRow.bodyDesignElement = item.Body_Design_Element__c; 
              modifiedRow.butaSize = item.Buta_Size__c; 
              modifiedRow.borderTechnique = item.Border_Technique__c; 
              modifiedRow.borderType = item.Border_Type__c; 
              modifiedRow.borderDimInInch = item.Border_Dim__c; 
              modifiedRow.borderMaterial = item.Border_Material__c; 
              modifiedRow.borderMatching = item.Border_Matching__c; 
              modifiedRow.palluMatching = item.Pallu_Matching__c; 
              modifiedRow.palluType = item.Pallu_Type__c; 
              modifiedRow.blouseType = item.Blouse_Type__c; 
              modifiedRow.blouseDesignElement = item.Blouse_Design_Element__c; 
              modifiedRow.koniya = item.Koniya__c; 
              modifiedRow.tasseling = item.Tasseling__c; 
              modifiedRow.piping = item.Piping__c; 
              modifiedRow.fallPico = item.Fall_Pico__c; 
              modifiedRow.weaveFabric = item.Weave_Fabric__c; 
              modifiedRow.colorType = item.Color_Type__c; 
              modifiedRow.borderColor = item.Border_Color__c; 
              modifiedRow.blouseColor = item.Blouse_Color__c; 
              modifiedRow.silkMark = item.Silk_Mark__c; 
              modifiedRow.gITag = item.GI_Tag__c; 
              modifiedRow.zariCertificate = item.Zari_Certificate__c; 
              modifiedRow.craftMark = item.Craft_Mark__c; 
              modifiedRow.transparency = item.Transparency__c; 
              modifiedRow.breathability = item.Breathability__c; 
              modifiedRow.drapability = item.Drapability__c; 
              modifiedRow.washcare = item.Washcare__c; 
              modifiedRow.sareeLengthinMeter = item.Saree_Length_in_Meter__c; 
              modifiedRow.sareeWidthinMeter = item.Saree_Width_in_Meter__c; 
              modifiedRow.blouseLengthinCM = item.Blouse_Length_in_CM__c;
              if(item.Body_Pattern_Update__c) {
                let key = this.PatternTypeFieldData.controllerValues[item.Body_Pattern_Update__c]; 
                let keybody = this.BodyDesignElementFieldData.controllerValues[item.Body_Pattern_Update__c]; 
                let keybuta = this.ButaSizeFieldData.controllerValues[item.Body_Pattern_Update__c];
                modifiedRow.patternTypeOptions = this.PatternTypeFieldData.values.filter(opt => opt.validFor.includes(key));
                modifiedRow.BodyDesignElementOptions = this.BodyDesignElementFieldData.values.filter(opt => opt.validFor.includes(keybody));
                modifiedRow.ButaSizeOptions = this.ButaSizeFieldData.values.filter(opt => opt.validFor.includes(keybuta));
              } 
              if(item.Border_Matching__c) {
                let key = this.BorderColorFieldData.controllerValues[item.Border_Matching__c]; 
                modifiedRow.BorderColorOptions = this.BorderColorFieldData.values.filter(opt => opt.validFor.includes(key));
              }
              if(item.Blouse_Type__c) {
                  let key = this.BlouseColorFieldData.controllerValues[item.Blouse_Type__c]; 
                  modifiedRow.BlouseColorOptions = this.BlouseColorFieldData.values.filter(opt => opt.validFor.includes(key));
              }     
              this.VendorSkuCodedata = [...this.VendorSkuCodedata, modifiedRow];
            });
            this.filteredVendorSkuCodeData = this.VendorSkuCodedata;
            console.log('this.loader'+this.loader);
            this.loader = false;
            console.log('this.loader'+this.loader);
            this.isDisplayTable = true;
            this.calculateTotalPages();
            this.showPage(1);
            console.log('rowdata sku event deleted skucodeselected id this.filteredRowData', JSON.stringify(this.filteredVendorSkuCodeData));
            console.log('rowdata sku seleceted skucodeselected id this.rowdata', JSON.stringify(this.VendorSkuCodedata));                  
          }
          else {
            this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Data property is undefined or null..!');
            console.error('Data property is undefined or null.');
          }
          })
        .catch(error=>{
          this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Error fetching vendor details:', error); 
          console.error('Error fetching vendor details:', error); 
        });
      }
    else {
      this.template.querySelector('c-custom-toast-message-component').showToast('error', 'venderId is undefined or null..!'); 
      console.error('venderId is undefined or null.');
    }
  }

  calculateTotalPages() {
    this.totalPage = Math.ceil(this.filteredVendorSkuCodeData.length / this.recordSize);
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
    this.filteredVendorSkuCodeData = this.VendorSkuCodedata.slice(startIndex, endIndex);
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
      return this.filteredVendorSkuCodeData[this.currentPage - 1] || {};
  }

  handleMainPage(){
    console.log('Button main Clicked');
    const vendorPageEvent = new CustomEvent('vendorpage');
    this.dispatchEvent(vendorPageEvent);
  }

  SelectedAllHandler(event){
    this.VendorSkuCodedata = this.VendorSkuCodedata.map(item => ({ ...item, filled: true }));
    console.log('filteredData json SelectedAllHandler Valid Product Data List:', JSON.stringify(this.VendorSkuCodedata));
    this.filteredVendorSkuCodeData = this.filteredVendorSkuCodeData.map(item => ({...item, filled: !event.target.checked}));
    console.log('filteredVendorSkuCodeData Reverse json SelectedAllHandler Valid Product Data List:', JSON.stringify(this.filteredVendorSkuCodeData));
    this.SelectedAll=true;
    this.UnSelectedAll=false;
  }

  UnSelectedAllHandler(event){
    this.VendorSkuCodedata = this.VendorSkuCodedata.map(item => ({ ...item, filled: false }));
    console.log('filteredData json UnSelectedAllHandler Valid Product Data List:', JSON.stringify(this.VendorSkuCodedata));
    this.filteredVendorSkuCodeData = this.filteredVendorSkuCodeData.map(item => ({ ...item, filled: event.target.checked }));
    console.log('filteredVendorSkuCodeData Reverse data json UnSelectedAllHandler Valid Product Data List:', JSON.stringify(this.filteredVendorSkuCodeData));
    this.SelectedAll=false;
    this.UnSelectedAll=true;
  }

  handleSearchChange(event){
    this.skucodenamesearchKey =event.target.value;
  }

  handleSearchskucode(){
    if(this.skucodenamesearchKey == null || this.skucodenamesearchKey.trim() == ''){
      this.showPage(this.currentPage);
      //this.filteredVendorSkuCodeData = [...this.VendorSkuCodedata];
    }
    else{
      this.filteredVendorSkuCodeData = this.VendorSkuCodedata.filter(item => {
        return (
          item.skucodename &&
          item.skucodename.toLowerCase() === this.skucodenamesearchKey.toLowerCase()
      );
        //return item.skucodename.toLowerCase().includes(this.skucodenamesearchKey.toLowerCase());
      });
      if(this.filteredVendorSkuCodeData.length === 0) {
          this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Search for a valid Sku code');
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
    if(this.copyfromsearchKey == undefined){
      this.VendorSkuCodedata[selectedRowIndex] = this.VendorSkuCodedata[selectedRowIndex];      
      this.filteredVendorSkuCodeData = this.VendorSkuCodedata;     
      this.showPage(this.currentPage);
    }
    else{
      fetchVenderCopyFromDetails({textkey: this.copyfromsearchKey})
        .then(data =>
        {
          this.VendorSkuCodedata[selectedRowIndex].copyFrom = data.Id;
          this.VendorSkuCodedata[selectedRowIndex].copyFromname = data.SKU_Code__c;
          if(this.VendorSkuCodedata[selectedRowIndex].weightInG == undefined){
            this.VendorSkuCodedata[selectedRowIndex].weightInG = data.Weight_in_G__c;
          }           
          if(this.VendorSkuCodedata[selectedRowIndex].bodyPatterns == undefined){
            this.VendorSkuCodedata[selectedRowIndex].bodyPatterns = data.Body_Pattern_Update__c;
            let key = this.PatternTypeFieldData.controllerValues[data.Body_Pattern_Update__c];
            let keybody = this.BodyDesignElementFieldData.controllerValues[data.Body_Pattern_Update__c]; 
            let keybuta = this.ButaSizeFieldData.controllerValues[data.Body_Pattern_Update__c];
            this.VendorSkuCodedata[selectedRowIndex].patternTypeOptions = this.PatternTypeFieldData.values.filter(opt => opt.validFor.includes(key)); 
            this.VendorSkuCodedata[selectedRowIndex].BodyDesignElementOptions = this.BodyDesignElementFieldData.values.filter(opt => opt.validFor.includes(keybody));
            this.VendorSkuCodedata[selectedRowIndex].ButaSizeOptions = this.ButaSizeFieldData.values.filter(opt => opt.validFor.includes(keybuta));         
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].patternType == undefined){
            this.VendorSkuCodedata[selectedRowIndex].patternType = data.Pattern_Type__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].bodyDesignElement == undefined){
            this.VendorSkuCodedata[selectedRowIndex].bodyDesignElement= data.Body_Design_Element__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].butaSize == undefined){
            this.VendorSkuCodedata[selectedRowIndex].butaSize = data.Buta_Size__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].borderTechnique == undefined){
            this.VendorSkuCodedata[selectedRowIndex].borderTechnique = data.Border_Technique__c;
          }              
          if(this.VendorSkuCodedata[selectedRowIndex].borderType == undefined){
            this.VendorSkuCodedata[selectedRowIndex].borderType = data.Border_Type__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].borderDimInInch == undefined){
            this.VendorSkuCodedata[selectedRowIndex].borderDimInInch = data.Border_Dim__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].borderMaterial == undefined){
            this.VendorSkuCodedata[selectedRowIndex].borderMaterial = data.Border_Material__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].borderMatching == undefined){
            this.VendorSkuCodedata[selectedRowIndex].borderMatching = data.Border_Matching__c;
            let key = this.BorderColorFieldData.controllerValues[data.Border_Matching__c];
            this.VendorSkuCodedata[selectedRowIndex].BorderColorOptions = this.BorderColorFieldData.values.filter(opt => opt.validFor.includes(key)); 
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].palluMatching == undefined){
            this.VendorSkuCodedata[selectedRowIndex].palluMatching = data.Pallu_Matching__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].palluType == undefined){
            this.VendorSkuCodedata[selectedRowIndex].palluType = data.Pallu_Type__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].blouseType == undefined){
            this.VendorSkuCodedata[selectedRowIndex].blouseType = data.Blouse_Type__c;
            let key = this.BlouseColorFieldData.controllerValues[data.Blouse_Type__c];
            this.VendorSkuCodedata[selectedRowIndex].BlouseColorOptions = this.BlouseColorFieldData.values.filter(opt => opt.validFor.includes(key)); 
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].blouseDesignElement == undefined){
            this.VendorSkuCodedata[selectedRowIndex].blouseDesignElement = data.Blouse_Design_Element__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].koniya == undefined){
            this.VendorSkuCodedata[selectedRowIndex].koniya = data.Koniya__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].tasseling == undefined){
            this.VendorSkuCodedata[selectedRowIndex].tasseling = data.Tasseling__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].piping == undefined){
            this.VendorSkuCodedata[selectedRowIndex].piping = data.Piping__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].fallPico == undefined){
            this.VendorSkuCodedata[selectedRowIndex].fallPico = data.Fall_Pico__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].weaveFabric == undefined){
            this.VendorSkuCodedata[selectedRowIndex].weaveFabric = data.Weave_Fabric__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].colorType == undefined){
            this.VendorSkuCodedata[selectedRowIndex].colorType = data.Color_Type__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].borderColor == undefined){
            this.VendorSkuCodedata[selectedRowIndex].borderColor = data.Border_Color__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].blouseColor == undefined){
            this.VendorSkuCodedata[selectedRowIndex].blouseColor = data.Blouse_Color__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].silkMark == undefined){
            this.VendorSkuCodedata[selectedRowIndex].silkMark = data.Silk_Mark__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].gITag == undefined){
            this.VendorSkuCodedata[selectedRowIndex].gITag = data.GI_Tag__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].zariCertificate == undefined){
            this.VendorSkuCodedata[selectedRowIndex].zariCertificate = data.Zari_Certificate__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].craftMark == undefined){
            this.VendorSkuCodedata[selectedRowIndex].craftMark = data.Craft_Mark__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].transparency == undefined){
            this.VendorSkuCodedata[selectedRowIndex].transparency = data.Transparency__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].breathability == undefined){
            this.VendorSkuCodedata[selectedRowIndex].breathability = data.Breathability__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].drapability == undefined){
            this.VendorSkuCodedata[selectedRowIndex].drapability = data.Drapability__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].washcare == undefined){
            this.VendorSkuCodedata[selectedRowIndex].washcare = data.Washcare__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].sareeLengthinMeter == undefined){
            this.VendorSkuCodedata[selectedRowIndex].sareeLengthinMeter = data.Saree_Length_in_Meter__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].sareeWidthinMeter == undefined){
            this.VendorSkuCodedata[selectedRowIndex].sareeWidthinMeter = data.Saree_Width_in_Meter__c;
          } 
          if(this.VendorSkuCodedata[selectedRowIndex].blouseLengthinCM == undefined){
            this.VendorSkuCodedata[selectedRowIndex].blouseLengthinCM = data.Blouse_Length_in_CM__c;
          }   
        });          
        this.filteredVendorSkuCodeData = this.VendorSkuCodedata;
        this.showPage(this.currentPage);
    }  
  }

  changeHandler(event){
    let selectedRowIndex = event.currentTarget.dataset.index;
    let counter = this.filteredVendorSkuCodeData[selectedRowIndex].count;
    this.VendorSkuCodedata = this.VendorSkuCodedata.filter(item => {
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
            //this.VendorSkuCodedata[selectedRowIndex].patternType = event.target.value;
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
            item.borderMatching = event.target.value;
            let keybordercolor = this.BorderColorFieldData.controllerValues[event.target.value];            
            item.BorderColorOptions = this.BorderColorFieldData.values.filter(opt => opt.validFor.includes(keybordercolor));
            break;
          case 'palluMatching':
            item.palluMatching = event.target.value;
            break;
          case 'palluType':
            item.palluType = event.target.value;
            break;
          case 'blouseType':
            item.blouseType = event.target.value;
            let keyblousecolor = this.BlouseColorFieldData.controllerValues[event.target.value];            
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
    console.log('filteredData json after filter Valid Product Data List:', JSON.stringify(this.VendorSkuCodedata));
    console.log('filteredData json down Valid Product Data List:', JSON.stringify(this.VendorSkuCodedata[selectedRowIndex]));
    console.log('filteredData without down json and Valid Product Data List:', JSON.stringify(this.VendorSkuCodedata[counter]));

  }

  handleSaveValidation(){
    let filteredData = this.VendorSkuCodedata.filter(item => item.filled === true);
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
      if (validData.length !== filteredData.length) {
        // Display error message because some items have undefined or empty properties
        this.template.querySelector('c-custom-toast-message-component').showToast('error', 'Sku code are not filled all field..!');
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
            
        // Delay the dispatch of mainpage event
        setTimeout(() => {          
          this.VendorSkuCodedata = [];
          this.filteredVendorSkuCodeData = [];
          this.handleconnected();
          this.closeModal(); 
          //const mainPageEvent = new CustomEvent('mainpage');
          //this.dispatchEvent(mainPageEvent);
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