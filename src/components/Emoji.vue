<template>
<div :class="(props.menuOnTop)?'content-top':'content'">
  
<div class="actions" v-if="!props.menuOnTop">

    <div>
      <ion-icon :icon="muteIcon">
      </ion-icon>
     </div>


     <div class="play-buttons">
       <ion-icon @mousedown="onBackward()" @mouseup="onStop()" @mouseleave="onStop()" :icon="playBackOutline"></ion-icon>
       <span>{{formatedTime}}</span>
       <ion-icon @mousedown="onForward()" @mouseup="onStop()" @mouseleave="onStop()"  :icon="playForwardOutline"></ion-icon>
     </div>

     
     
      <div>
      <ion-icon @click="stop()" :icon="playOutline">
      </ion-icon>
     </div>
     
     
   
</div>

<div class="emoji">
        <div @click="stop();currentEmoji='thumbUp'" >👍</div>
        <div @click="stop();currentEmoji='cryingSmile'" >😂</div>
        <div @click="stop();currentEmoji='astonished'" >😮</div>
        <div @click="stop();currentEmoji='crying'" >😢</div>
        <div @click="stop();currentEmoji='angry'" >😡</div>
        <div @click="stop();currentEmoji='thumbDown'" >👎</div>
</div>


<div class="actions" v-if="props.menuOnTop">

    <div>
      <ion-icon :icon="muteIcon">
      </ion-icon>
     </div>

     <div class="play-buttons">
       <ion-icon @mousedown="onBackward()" @mouseup="onStop()" @mouseleave="onStop()" :icon="playBackOutline"></ion-icon>
       <span>{{formatedTime}}</span>
       <ion-icon @mousedown="onForward()" @mouseup="onStop()" @mouseleave="onStop()"  :icon="playForwardOutline"></ion-icon>
     </div>


      <div>
      <ion-icon @click="stop()" :icon="playOutline">
      </ion-icon>
     </div>
     
     
   
</div>
</div>
</template>
<script>
import { IonIcon } from '@ionic/vue';
import {playBackOutline, playForwardOutline,volumeHighOutline,volumeMuteOutline,playOutline} from 'ionicons/icons';
import {useStore} from 'vuex'
import {computed, ref} from 'vue'
export default {
    components:{IonIcon},

         props: {
    menuOnTop:Boolean 
  },


    setup(props, { emit }) {
        const muted = ref(true)
        const muteIcon = computed(() => {
            if (!muted.value) {
              return volumeHighOutline
            }
            else return volumeMuteOutline
          })
        function stop() {
          emit('onStop'),
          emit('onEmoji')
        }
        const store = useStore()
         function onBackward() {emit('onBackward')}
        function onForward() {emit('onForward')}
        function onStop() {emit('onStopPlay')}
     const currentInteraction = computed({
        get: () => store.state.app.currentInteraction,
        set: (val) => store.commit('updateCurrentInteraction', val)
        })
  const currentEmoji = computed({
        get: () => store.state.app.currentEmoji,
        set: (val) => store.commit('updateCurrentEmoji', val)
        })
       const formatedTime = computed({
        get: () => store.state.app.formatedTime,
        set: (val) => store.commit('updateFormatedTime', val)
        })
    
    return{
        stop,
        muted,
        props,
        muteIcon,
        currentEmoji,
        onBackward,
        onForward,
        onStop,
        playOutline,
        formatedTime,
        playBackOutline, 
        currentInteraction,
        playForwardOutline,
        volumeHighOutline,
        volumeMuteOutline
    }   
    },
}
</script>
<style lang="css" scoped>
.content-top {
    background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%);
    padding-bottom: 46px;
    padding-top: 12px;
}
.content {
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%);
    padding-top: 46px;
    padding-bottom: 24px;
 
}

@media not all and (min-resolution:.001dpcm) { 
     @supports (-webkit-appearance:none) {
              .content {
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
    padding-top: 46px;
    padding-bottom: 24px;
 
}

.content-top {
    background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
    padding-bottom: 46px;
    padding-top: 12px;
}
     }
}
  ion-item {
    --background: transparent ;
   width: 100%;  
   
  }
  ion-textarea {
   
    position: relative;
    margin: 24px 64px 24px 24px;
    padding: 6px 55px 12px 24px;
    border-style: solid;
    border-color: white;
     border-width: 2px;
    border-radius: 50px;
    color: white;
    --placeholder-opacity:1;
  }

.actions {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-size:24px ;
    margin: 24px 0 12px 0;
}
.actions span{
    font-size:16px ;
}
.play-buttons{
  display: inherit;
}

ion-icon{
  margin-left: 24px;
  margin-right: 24px;
}
.emoji div{
  cursor: pointer;
}

  .emoji {
    margin: 24px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-size:32px ;
  }

</style>