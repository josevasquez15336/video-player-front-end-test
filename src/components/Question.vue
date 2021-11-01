<template>
<div  :class="(menuOnTop)?'content-top':'content'">
<div class="actions" v-if="!menuOnTop">

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

<div class="message">
<ion-item >
  <ion-textarea rows="1" placeholder="What would you like to ask?"  auto-grow v-model="videoComment"  clear-on-edit="true">
  </ion-textarea>
</ion-item>
<ion-icon  @click="stop()" :icon="paperPlaneOutline"></ion-icon>
</div>  

<div class="actions" v-if="menuOnTop">

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
import { IonItem, IonTextarea,IonIcon } from '@ionic/vue';
import {happyOutline,paperPlaneOutline, playBackOutline, playForwardOutline, playOutline, 
        volumeMuteOutline, 
        volumeHighOutline,
        } from 'ionicons/icons';
import {useStore} from 'vuex'
import {computed,ref} from 'vue'
export default {
    components:{IonItem, IonTextarea,IonIcon},
     
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
        
        const formatedTime = computed({
        get: () => store.state.app.formatedTime,
        set: (val) => store.commit('updateFormatedTime', val)
        })
        
        function onBackward() {emit('onBackward')}
        function onForward() {emit('onForward')}
        function onStop() {emit('onStopPlay')}
        
         function stop() {emit('onStop')}
        const store = useStore()
        const videoComment = computed({
        get: () => store.state.app.videoComment,
        set: (val) => store.commit('updateVideoComment', val)
        })
       
    
    return{
        stop,
        muted,
        props,
        muteIcon,
        videoComment,
        playOutline, 
        formatedTime,
        onBackward,
        onForward,
        onStop,
        volumeMuteOutline, 
        volumeHighOutline,
        happyOutline,
        playBackOutline,
        playForwardOutline,
        paperPlaneOutline,
 
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
    padding-bottom: 12px;
 
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
    border-style: solid;
      border-color: white;
     border-width: 2px;
    border-radius: 50px;
    padding: 6px 24px 6px 32px;
    --background: transparent ;
    --inner-border-width: 0;
    position: relative;
  
   width: 100%;  
   
  }
  ion-textarea {
    max-height: 80px;
    position: relative;
    border-style: none;
    --inner-border-width: 0;
  
    color: white;
    --placeholder-opacity:1;
  }

.actions {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-size:24px ;
    margin: 0 0 12px 0;
}
.actions span{
    font-size:16px ;
}

.message{
    font-size:16px ;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.message ion-icon{
 margin-left: 24px;
 font-size: 32px;
}

.play-buttons{
  display: inherit;
}

ion-icon{
  margin-left: 24px;
  margin-right: 24px;
}

    
</style>