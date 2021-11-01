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

<div class="rating">
      <ion-range min="0" max="5" value="5" color="secondary" step="1" snaps="true" >
        <ion-icon  size="small" slot="start" :icon="heartOutline"></ion-icon>
        <ion-icon slot="end"  :icon="heart"></ion-icon>
      </ion-range>

      <ion-icon  @click="stop()" :icon="paperPlaneOutline"></ion-icon>
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
import { IonIcon,IonRange } from '@ionic/vue';
import {playBackOutline, playForwardOutline,heartOutline,heart,paperPlaneOutline, playOutline, 
        volumeMuteOutline, 
        volumeHighOutline,
        } from 'ionicons/icons';
import {useStore} from 'vuex'
import {computed,ref} from 'vue'
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
        function stop() {emit('onStop')}
        function onBackward() {emit('onBackward')}
        function onForward() {emit('onForward')}
        function onStop() {emit('onStopPlay')}
        
         

        const store = useStore()
        const videoComment = computed({
        get: () => store.state.app.videoComment,
        set: (val) => store.commit('updateVideoComment', val)
        })
       const formatedTime = computed({
        get: () => store.state.app.formatedTime,
        set: (val) => store.commit('updateFormatedTime', val)
        })
    
    return{
        stop,
        heart,
        muted,
        props,
        muteIcon,
        IonRange,
        playOutline, 
        formatedTime,
        onBackward,
        onForward,
        onStop,
        volumeMuteOutline, 
        volumeHighOutline,
        videoComment,
        playBackOutline, 
        paperPlaneOutline,
        playForwardOutline,
        heartOutline,
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


.actions {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-size:24px ;
    margin: 24px 0 24px 0;
}
.actions span{
    font-size:16px ;
}
  .rating {
    padding:24px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    font-size:32px ;
  }
 
.rating ion-range{
 margin-right: 24px;
}

 .rating ion-range ion-icon {
   color: red;
   font-size: 3rem;
 }

  .rating ion-icon {
   font-size: 24px;
 }

 .play-buttons{
  display: inherit;
}

.actions ion-icon{
  margin-left: 24px;
  margin-right: 24px;
}



</style>