import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/fields";
import "@pnp/sp/attachments";
import "@pnp/sp/files";

export default class Service {

    public mysitecontext: any;

    public constructor(siteUrl: string, Sitecontext: any) {
        this.mysitecontext = Sitecontext;


        sp.setup({
            sp: {
                baseUrl: siteUrl

            },
        });

    }
public async GetAllCuurency():Promise<any>
{

 return await sp.web.lists.getByTitle("Currency").items.select('Title','ID').expand().get().then(function (data:any) {

 return data;

 


 });
 

}


public async Save (
    MyFirstname:string,
    MyLastname:string,
    MyEmpId:string,
    MyReason:string,
    MyNatureofCompensationApproval:string,
    MyNewCompensationamount:string,
    MyCurrency:string,
    MycmtAmtcurrency:string,
    Myamtusd:string,
    acceptedFiles:any)  {

   let Myval='Completed';

    try
    {

    //let Filemal=[];

    let file=acceptedFiles;

   let Varmyval= await sp.web.lists.getByTitle("Requests").items.add({

    Title:"Request Saved",
    FirstName:MyFirstname,
    LastName:MyLastname,
    EmployeeID:MyEmpId,
    ReasonforRequest:MyReason,
    ReasonForTravel:MyNatureofCompensationApproval,
    NewCompensationAmount:MyNewCompensationamount,
    CurrencyId:MyCurrency,
    CompensationinLocalCurrency:MycmtAmtcurrency,
    AmountinUSD:Myamtusd
    
    
    }).then (async r => {
        // this will add an attachment to the item we just created to push t sharepoint list
  
      for(var count=0;count<file.length;count++)
      {
       await r.item.attachmentFiles.add(file[count].name, file[count]).then(result => {
      console.log(result);
  
        })
  
      }
  
      return Myval;

    
    })

    return Varmyval;
    
}

catch (error) {
    console.log(error);
  
 }


}

}