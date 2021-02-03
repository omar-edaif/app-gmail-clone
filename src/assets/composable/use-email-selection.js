import {reactive} from 'vue' ;
export const useEmailSelection= function(){
    let emails =  reactive(new Set())
     
     
       let toggle=function(email){
         if(emails.has(email)){  
           emails.delete(email)
        }
         else{
           emails.add(email)
         }
        }
        
        let clear=()=>{emails.clear()}
        let addMultiple = (newEmail)=>{
          newEmail.foreach((email)=>{
            emails.add(email)
          })
        } 


        return{ emails,toggle,clear,addMultiple}
 }

export default useEmailSelection