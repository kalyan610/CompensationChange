import * as React from 'react';
import styles from './CompensationChange.module.scss';
import { ICompensationChangeProps } from './ICompensationChangeProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import {Stack,IStackStyles,ChoiceGroup,IChoiceGroupOption,Checkbox} from 'office-ui-fabric-react'; 

import { Dropdown, IDropdownStyles,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import Service from './Service';
import {Icon} from 'office-ui-fabric-react/lib/Icon';
import {PrimaryButton } from 'office-ui-fabric-react/lib/Button';

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { padding: 10} };

const NatureofCompensation: IChoiceGroupOption[] = 

[ { key: "RSA", text: "Redundancy Severance Payments" },
  { key: "ofc", text: "Off-Cycle Annual Compensation Change" },
  { key: "ofp", text: "Off-Cycle Bonus Payments" }];  


  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };

  const stackButtonStyles: Partial<IStackStyles> = { root: { width: 20 } };



export interface IComponentChange{

  Firstname:any;
  Lastname:any;
  EmpId:any;
  ReasonofRequest:any;
  arragment:any;
  arrangmenttext:any;
  NewCompensationamount:any;
  CurrencyListItems:any;
  currval:any;
  FileValue:any;
  disableFileUpload:boolean;
  flag:boolean;
  FocusGroups:boolean;
  cmpamtlcurrency:any;
  amtusd:any;

}


export default class CompensationChange extends React.Component<ICompensationChangeProps, IComponentChange> 
{

  protected  ppl:any;

  public GlobalService: any;

  public _service: any;

  public constructor(props:ICompensationChangeProps) {
    super(props);

    this.state={

      Firstname:"",
      Lastname:"",
      EmpId:"",
      ReasonofRequest:"",
      arragment:"",
      arrangmenttext:"",
      NewCompensationamount:"",
      CurrencyListItems:"",
      currval:"",
      FileValue:[],
      disableFileUpload:false,
      flag:false,
      FocusGroups:false,
      cmpamtlcurrency:"",
      amtusd:"",

    };

    this._service = new Service(this.props.url, this.props.context);

    this.GlobalService = new Service(this.props.url, this.props.context);

    this.getAllCurrency();

  }

  private changeFirstname(data: any): void {

    this.setState({ Firstname: data.target.value });

  }

  private changeLastname(data: any): void {

    this.setState({ Lastname: data.target.value });

  }

  private changeEmpId(data: any): void {

          const re = /^[0-9\b]+$/;
          if (data.target.value === '' || re.test(data.target.value)) 
            {
             this.setState({EmpId:data.target.value})

            }

  }

  private changecmpamtlcurrency(data: any): void {

    const re = /^[0-9\b]+$/;
    if (data.target.value === '' || re.test(data.target.value)) 
      {
       this.setState({cmpamtlcurrency:data.target.value})

      }

}

private changeamtusd(data: any): void {

  const re = /^[0-9\b]+$/;
  if (data.target.value === '' || re.test(data.target.value)) 
    {
     this.setState({amtusd:data.target.value})

    }

}

  private changeReasonofRequest(data: any): void {

    this.setState({ ReasonofRequest: data.target.value });

  }

  public ChangeArrangment(ev: React.FormEvent<HTMLInputElement>, option: any): void {  

    this.setState({  

      arragment: option.key  

            
      });  


      this.setState({  

        arrangmenttext: option.text  

      
  
        });  

      }

  private changeNewCompensation(data: any): void {

    const re = /^[0-9\b]+$/;
    if (data.target.value === '' || re.test(data.target.value)) 
      {

    this.setState({ NewCompensationamount: data.target.value });

      }
    
      }

      public async getAllCurrency() {

        //var myCurrencyLocal: any = [];
    
        var data = await this._service.GetAllCuurency();
    
        console.log(data);
    
        var AllCuurenctTypes: any = [];
    
        for (var k in data) {
    
          AllCuurenctTypes.push({ key: data[k].ID, text: data[k].Title });
        }
    
        console.log(AllCuurenctTypes);
    
        this.setState({ CurrencyListItems: AllCuurenctTypes });
    
      }

      public handleChangecurrency(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

        //this.setState({currval: defaultState});
        
        this.setState({ currval: item.key });
            
      }

      private changeFileupload(data: any) {

        let LocalFileVal= this.state.FileValue;
        
         LocalFileVal.push(data.target.files[0]);
        
        
        this.setState({FileValue:LocalFileVal});
  
        //Attachmentcount=this.state.FileValue.length;
        
        if(this.state.FileValue.length>4)
        {
        this.setState({disableFileUpload:true});
        
        }
        
        
        }
        
        private _removeItemFromDetail(Item: any) {
          console.log("itemId: " + Item.name); 
        
         let localFileValues=[];
        
         localFileValues=this.state.FileValue;
        
         if(localFileValues.length==1)
         {
        
          localFileValues=[];
         }
        
        
          for(var count=0;count<localFileValues.length;count++)
          {
        
            if(localFileValues[count].name==Item.name)
              {
                let Index=count;
        
                localFileValues.splice(Index,count);
        
              }
        
          }
        
          this.setState({FileValue:localFileValues,disableFileUpload:false});
        
        
        }


        private _onFocusGroupsToChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => {
 
          this.setState({
          FocusGroups: isChecked,
   
         }, () => {console.log(this.state.FocusGroups, 'state.FocusGroups');});
   
       }
  


        private OnBtnClick() :void {

          if(this.state.Firstname==null || this.state.Firstname=='')
            {
              alert('Please enter First Name');
              this.setState({ flag: false });
            }

          else  if(this.state.Lastname==null || this.state.Lastname=='')
              
            {
                alert('Please enter Last Name');
                this.setState({ flag: false });
            }

            else  if(this.state.EmpId==null || this.state.EmpId=='')
              
              {
                  alert('Please enter EmpId');
                  this.setState({ flag: false });
             }

            else  if(this.state.ReasonofRequest==null || this.state.ReasonofRequest=='')
              
                {
                    alert('Please enter Reason of Request');
                    this.setState({ flag: false });
            }
                
            else  if(this.state.arrangmenttext==null || this.state.arrangmenttext=='')
              
              {
                      alert('Please select Nature of Compensation Approval');
                      this.setState({ flag: false });
            }

            else if(this.state.cmpamtlcurrency==null || this.state.cmpamtlcurrency=='')
            {

              alert('Please enter Compensation Amount in Local Currency');
              this.setState({ flag: false });

            }
                 
            else  if(this.state.NewCompensationamount==null || this.state.NewCompensationamount=='')
              
                    {
                        alert('Please enter New Compensation Amount');
                        this.setState({ flag: false });
            }

           else if (this.state.currval == null || this.state.currval == 'Select  Currency Value'|| this.state.currval == "") {

                  alert('Please select  currency Value');
                  this.setState({ flag: false });         
                        
            }

            else  if(this.state.amtusd==null || this.state.amtusd=='')
              
              {
                  
                alert('Please enter Amount in USD');
                this.setState({ flag: false });
                  
                }

            else if(this.state.FocusGroups==false)
            {

              alert('Please confirm the request has been approved and reviewed by CS teams');
              this.setState({ flag: false });    
            }

            //else if(this.state.FileValue.length==0)
                   // {
                    
                     // alert('Please upload attachment');
                      //this.setState({ flag: false });
           // }
else
{

 

  let myfiles=[];

    for(var count=0;count<this.state.FileValue.length;count++)
    {
      
      myfiles.push(this.state.FileValue[count]);
    }

   
    this._service.Save(
    this.state.Firstname,
    this.state.Lastname,
    this.state.EmpId,
    this.state.ReasonofRequest,
    this.state.arrangmenttext,
    this.state.NewCompensationamount,
    this.state.currval,
    this.state.cmpamtlcurrency,
    this.state.amtusd,

    myfiles).then(function (data:any)
    {
      console.log(data);

      alert('Record submitted successfully');

      window.location.replace("https://capcoinc.sharepoint.com/sites/Global_HR_Compensation_Approval_Automation/SitePages/HR-Compensation-Submission.aspx");
  

           
    });

   
}
            

}
  
    


  public render(): React.ReactElement<CompensationChange> {
   
    return (

      <Stack tokens={stackTokens} styles={stackStyles} >
      <Stack>
      <b><label className={styles.labelsFonts}>1. First Name</label><label className={styles.redcolr}>*</label></b><br/>
      <div> 
      <input type="text" name="txtfirstname" value={this.state.Firstname} onChange={this.changeFirstname.bind(this)} className={styles.boxsize}/><br></br>
      </div><br/>
      <b><label className={styles.labelsFonts}> 2. Last Name</label><label className={styles.redcolr}>*</label></b><br/>  
      <input type="text" name="txtlastname" value={this.state.Lastname} onChange={this.changeLastname.bind(this)} className={styles.boxsize}/><br></br>

      <b><label className={styles.labelsFonts}> 3. Employee ID</label><label className={styles.redcolr}>*</label></b><br/>  
      <input type="text" name="txtempId" value={this.state.EmpId} onChange={this.changeEmpId.bind(this)} className={styles.boxsize}/><br></br>

      <b><label className={styles.labelsFonts}> 4. Reason for Request</label><label className={styles.redcolr}>*</label></b><br/>  
      <textarea id="txtreasonofrequest" value={this.state.ReasonofRequest} onChange={this.changeReasonofRequest.bind(this)} className={styles.textAreacss}></textarea><br></br>
     
      <b><label className={styles.labelsFonts}> 5. Nature of Compensation Approval</label><label className={styles.redcolr}>*</label></b><br/>  
      <b><ChoiceGroup className={styles.labelsFonts}  id="rdbarragment"  name="Teaming Arrangement" options={NatureofCompensation}   onChange={this.ChangeArrangment.bind(this)}  selectedKey={this.state.arragment}/></b><br></br>
     
      <b><label className={styles.labelsFonts}> 6. Compensation Amount in Local Currency</label><label className={styles.redcolr}>*</label></b><br/>  
      <input type="text" name="txtcmtamtcurrency" value={this.state.cmpamtlcurrency} onChange={this.changecmpamtlcurrency.bind(this)} className={styles.boxsize}/><br></br>


      <b><label className={styles.labelsFonts}> 7. New Compensation Amount</label><label className={styles.redcolr}>*</label></b><br/>  
      <input type="text" name="txtreasonofrequest" value={this.state.NewCompensationamount} onChange={this.changeNewCompensation.bind(this)} className={styles.boxsize}/><br></br>


      
      <b><label className={styles.labelsFonts}>8. Currency</label><label className={styles.redcolr}>*</label></b><br/>
      <Dropdown className={styles.labelsFonts}
                placeholder="Select Currency"
                options={this.state.CurrencyListItems}
                styles={dropdownStyles}
                selectedKey={this.state.currval ? this.state.currval : undefined} onChange={this.handleChangecurrency.bind(this)}/><br></br>

<b><label className={styles.labelsFonts}> 9.Amount in USD (FX rate as per date of request submission) </label><label className={styles.redcolr}>*</label></b><br/>  
<input type="text" name="txtreasonofrequest" value={this.state.amtusd} onChange={this.changeamtusd.bind(this)} className={styles.boxsize}/><br></br>




<b><label className={styles.labelsFonts}>10. Supporting Documentation</label></b><br/>
        <input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileupload.bind(this)} disabled={this.state.disableFileUpload}/>
        <br></br>
       
  {this.state.FileValue.map((item:any,index:any) =>(

<div className={styles.padcss}>  
{item.name} <Icon iconName='Delete'  onClick={(event) => {this._removeItemFromDetail(item)}}/>
</div>
))}

<br></br><br></br>
  
  <p>*A maximum of five files may be uploaded</p>
  <br></br>

  <Checkbox label="I agree that this request has been reviewed & approved by local Corporate Service teams" onChange={this._onFocusGroupsToChange} defaultChecked={false}/>
  <br></br>
 
 <div>  
  
  <PrimaryButton text="Submit" onClick={this.OnBtnClick.bind(this)} styles={stackButtonStyles} className={styles.Mybutton}/>

  </div>

                

 
      </Stack>
      </Stack>
      
    );
  }
}
