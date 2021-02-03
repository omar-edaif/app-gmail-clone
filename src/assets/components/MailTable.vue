<template > 
    <button @click="selectedScreen='inbox'"
    :disabled="selectedScreen=='inbox'"> inbox</button>
    <button @click="selectedScreen='archive'" :disabled="selectedScreen=='archive'"> archive</button>

  <table class="mail-table">
     <tbody>
      <tr
      v-for="email in filterEmails" 
      :key="email.id"
      :class="['clickable',email.read?'read':'']" 
      
      >
        <td><input type="checkbox" name="" id=""
         @click="emailSelection.toggle(email)" :selected="emailSelection"></td>
        <td @click="openEmail(email)">{{email.from}}</td>
        <td @click="openEmail(email)"><p><strong>{{email.subject}}</strong> {{email.body}}</p></td>
        <td @click="openEmail(email)"> {{format(new Date(email.sentAt),'MMM-do-yyyy')}}</td> 
        <td > <button @click="archiveEmail(email),consol(email.id)">archive</button></td>
        </tr>  
     </tbody>
  </table>
  <ModelView v-if="openedEmail" @closeModel="openedEmail=null">
  <MailView  :email="openedEmail" @changeEmail="changeEmail" />
   </ModelView>
</template>
<script>
import {format} from 'date-fns';
import axios from 'axios';
import MailView from './MailView.vue'
import ModelView from './ModelView.vue'

import {ref} from 'vue'
import useEmailSelection from '../composable/use-email-selection'
export default {
   
    
  async setup(){
     let{data:emails}   = await axios.get(' http://localhost:3000/emails')
     let emailSelection=useEmailSelection()
   
    return {
      emailSelection,
      format,
      emails: ref(emails), 
      openedEmail:ref(null),
      selectedScreen:ref( 'inbox')
    }
  },
  components:{
    MailView,
    ModelView,
  
    
  },
  computed:{
    soretedEmailes(){
      return this.emails.sort((e1,e2)=>{
        return e1.sentAt<e2.sentAt ? 1:-1
      })
    },
    filterEmails(){
      if (this.selectedScreen=='inbox'){
      return this.soretedEmailes.filter(e=>!e.archived)}
      else{
      return this.soretedEmailes.filter(e=>e.archived)}


    }
  },
  methods: {
    openEmail(email){
     this.openedEmail=email
    if(email){
     email.read=true
     this.updateDB(email)
     }
       },
    archiveEmail(email){
      email.archived=true
      this.updateDB(email) 
    },
    updateDB(email){
      axios.put(`http://localhost:3000/emails/${email.id}`,email)
    },
     changeEmail({toggleRead,toggleArchive,save,changeIndex, closeModel}){
      let email = this.openedEmail
      if(toggleRead){email.read=!email.read}
      if(toggleArchive){email.archived=!email.archived}
      if(save){this.updateDB(email)}
      if(changeIndex){
       
        let emails = this.filterEmails
        let currentIndex=emails.indexOf(this.openedEmail)+parseInt(changeIndex)
        let newEmail =emails[currentIndex]
        this.openedEmail=newEmail
        console.log(this.openedEmail)
      }
      if(closeModel){this.openedEmail=null }

    }
   
  }
}
</script>
<style  >
    
</style>