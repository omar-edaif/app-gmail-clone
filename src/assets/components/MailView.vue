<template>
<div>
    <button @click ="toggleArchive()">{{email.archived?'Move to Inbox (e)':'artchive (e )'}}</button>
    <button @click="toggleRead()">{{ email.read?'mark unread':'mark read' }} </button>
    <button @click="goNewer()"> Newer</button>
    <button @click="goOlder()">Older</button>
</div>
  <div class="email-display">
    <h2 class="mb-0">Subject: <strong>{{email.subject}}</strong></h2>
    <div><em>From {{email.from}} on {{format(new Date(email.sentAt), 'MMM do yyyy')}}</em></div>
    <div v-html="marked(email.body)" />
  </div>

</template>

<script>
import {format} from 'date-fns'
import marked from 'marked' 
import axios from 'axios';

    export default {
        setup(props,{emit}){
            let toggleRead   =()=>{emit('changeEmail',{toggleRead:true,save:true})}
            let toggleArchive=()=>{emit('changeEmail',{toggleArchive:true,save:true})}
            let goNewer      =()=>{ emit('changeEmail',{changeIndex : -1})}
            let goOlder      =()=>{ emit('changeEmail',{changeIndex : 1 })}
            return{
            format,
            marked,
            toggleRead,
            toggleArchive,
            goNewer,
            goOlder
           
            }
        },
  props:{
            email :{
                type:Object,
                require: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>