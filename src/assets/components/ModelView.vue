<template>
    <div class="modal">
        <div class="overlay" @click="emit('closeModel')"></div>
        <div class="modal-card">
            <slot/>
        </div>
    </div>
</template>

<script>
import useKeydown from '../composable/key-down'
    export default {
       setup(props,{emit}){
     useKeydown([
         {key:'Escape', fn:() => {emit('closeModel')}},
          ])
        return{emit}
       }
    }
</script>

<style lang="scss" scoped>

</style>