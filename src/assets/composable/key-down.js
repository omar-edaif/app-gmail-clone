import {onBeforeUnmount} from 'vue';

let useKeydown=(keycombos)=>{
    let onkeydown=(event)=>{
        let kc = keycombos.find(kc=>kc.key==event.key)
        if(kc){
            kc.fn()
        }
    }

window.addEventListener('keydown',onkeydown)
onBeforeUnmount(() => {
    window.removeEventListener('keydown',onkeydown)
})
}
export default useKeydown;
