<template>
<div :class="(props.menuOnTop)?'content-top':'content'">
  
<div class="actions"  v-if="!props.menuOnTop">

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
        <ion-icon :icon="shareOutline"></ion-icon>
        <ion-icon :icon="personOutline"></ion-icon>
        <ion-icon :icon="homeOutline"></ion-icon>
        <ion-icon :icon="searchOutline"></ion-icon>
        <ion-icon :icon="bookmarkOutline"></ion-icon>
          
</div>
<div class="actions"  v-if="props.menuOnTop">

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
import {playBackOutline, playForwardOutline, volumeHighOutline,volumeMuteOutline,
 homeOutline,playOutline, shareOutline,searchOutline,personOutline, bookmarkOutline} from 'ionicons/icons';
import {useStore} from 'vuex'
import {computed, ref} from 'vue'
export default {
    
      props: {
    menuOnTop:Boolean 
  },

    
    components:{IonIcon},
    
    setup(props, { emit }) {
        const muted = ref(true)
        function stop() {emit('onStop')}
        const store = useStore()
        const videoComment = computed({
        get: () => store.state.app.videoComment,
        set: (val) => store.commit('updateVideoComment', val)
        })
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
    return{
        stop,
        muted,
        props,
        muteIcon,
        onBackward,
        onForward,
        onStop,
        shareOutline,
        videoComment,
        searchOutline,
        formatedTime,
        personOutline,
        bookmarkOutline,
        homeOutline,
        playBackOutline, 
        playForwardOutline,
        volumeMuteOutline,
        playOutline,
        volumeHighOutline
    }   
    },
}
</script>
<style lang="css" scoped>
.content {
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%);
    padding-top: 46px;
    padding-bottom: 24px;
 
}

.content-top {
    background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%);
    padding-bottom: 46px;
    padding-top: 12px;
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


ion-icon{
  margin-left: 24px;
  margin-right: 24px;
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
.play-buttons{
  display: inherit;
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
  .emoji {
    margin-top: 36px;
    margin-bottom: 36px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    font-size:24px ;
  }

</style>