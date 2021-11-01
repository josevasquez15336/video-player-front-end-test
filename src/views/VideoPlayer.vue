<template>
 
  <ion-page>
<div class="container">
  <div class="content">
     
     <div ref="descriptionRef" loop class="intro_content">
      <transition name="show">
        <videoDescription  @onPlay="startVideo()" v-if="videoDescriptionActive"/>
      </transition>
    </div>

     <div ref="emojiRef" :style="`top:${currentPosition.y}px; left:${currentPosition.x}px;`" v-if="emoji" :class="emojiClass"></div>
        
      <transition :name="(menuOnTop)?'showTop':'showBottom'">
      <div v-if="currentInteraction=='menu'" :class="(menuOnTop)?'content_interaction_top':'content_interaction_bottom'">
         <Menu :menuOnTop="menuOnTop" @onStop="closeInteractionChild()" @onBackward="playBackward()"  @onForward="playFowrard()" @onStopPlay="stopForward()"/>
      </div>
      </transition>

      <transition :name="(menuOnTop)?'showTop':'showBottom'">
      <div v-if="currentInteraction=='question'" :class="(menuOnTop)?'content_interaction_top':'content_interaction_bottom'">
         <Question :menuOnTop="menuOnTop"  @onStop="closeInteractionChild()" @onBackward="playBackward()"  @onForward="playFowrard()" @onStopPlay="stopForward()"/>
      </div>
      </transition>

      <transition :name="(menuOnTop)?'showTop':'showBottom'">
      <div v-if="currentInteraction=='message'" :class="(menuOnTop)?'content_interaction_top':'content_interaction_bottom'">
         <Message :menuOnTop="menuOnTop"  @onStop="closeInteractionChild()" @onBackward="playBackward()"  @onForward="playFowrard()" @onStopPlay="stopForward()"/>
      </div>
      </transition>
      
      <transition :name="(menuOnTop)?'showTop':'showBottom'">
      <div v-if="currentInteraction=='emoji'" :class="(menuOnTop)?'content_interaction_top':'content_interaction_bottom'">
         <Emoji :menuOnTop="menuOnTop"  @onStop="closeInteractionChild()" @onEmoji="showEmoji()" @onBackward="playBackward()"  @onForward="playFowrard()" @onStopPlay="stopForward()"/>
      </div>
      </transition>
   
      <transition :name="(menuOnTop)?'showTop':'showBottom'">
      <div v-if="currentInteraction=='rate'" :class="(menuOnTop)?'content_interaction_top':'content_interaction_bottom'">
         <Rating :menuOnTop="menuOnTop"  @onStop="closeInteractionChild()" @onBackward="playBackward()"  @onForward="playFowrard()" @onStopPlay="stopForward()"/>
      </div>
      </transition>

    
      <transition name="showTop">
      <div v-if="!currentInteraction" class="header">
           <ion-fab-button class='back_button' 
           
             >
           <ion-icon  :icon="chevronBackOutline" />
           </ion-fab-button>

            <p class="ion-margin-horizontal">José Vásquez</p>
           <ion-avatar class="ion-margin-horizontal" ><img :src="currentItem.avatarSrc"></ion-avatar>
       </div>
       </transition>

          
        <video id="video" @click="checkCursorPosition"  webkit-playsinline playsinline ref="videoRef" v-videoCursor="udateInteractionType" >
        <source :src="`${currentItem.videoSrc}#t=0.1`" type="video/mp4">
        </video>
       
     <ion-fab  ref="cursorRef"  id="cursor" >
            <ion-fab-button @click.prevent="closeInteraction()"  class="cursor_button" >
              <ion-icon :icon="radioButtonOnOutline"></ion-icon>
            </ion-fab-button>
           
            <ion-fab-list side="top">
              <ion-fab-button v-if="!data.top" @click="udateInteractionType('message')" ><ion-icon :icon="chatboxEllipsesOutline"></ion-icon></ion-fab-button>
              <ion-fab-button v-if="data.bottom" @click="udateInteractionType('question')"><ion-icon :icon="helpOutline"></ion-icon></ion-fab-button>
              
            </ion-fab-list>
            <ion-fab-list side="bottom">
              <ion-fab-button v-if="!data.bottom" @click="udateInteractionType('question')"><ion-icon :icon="helpOutline"></ion-icon></ion-fab-button>
              <ion-fab-button v-if="data.top" @click="udateInteractionType('message')" ><ion-icon :icon="chatboxEllipsesOutline"></ion-icon></ion-fab-button>
              
            </ion-fab-list>
              <ion-fab-list side="start">
              <ion-fab-button v-if="!data.left" @click="udateInteractionType('rate')"><ion-icon :icon="heartOutline" ></ion-icon></ion-fab-button>
              <ion-fab-button v-if="data.right" @click="udateInteractionType('emoji')"  ><ion-icon :icon="happyOutline"></ion-icon></ion-fab-button>
            
            </ion-fab-list>
            <ion-fab-list side="end">
              <ion-fab-button v-if="!data.right" @click="udateInteractionType('emoji')" ><ion-icon :icon="happyOutline"></ion-icon></ion-fab-button>
              <ion-fab-button v-if="data.left" @click="udateInteractionType('rate')"><ion-icon :icon="heartOutline" ></ion-icon></ion-fab-button>
           </ion-fab-list>
        </ion-fab>       
     
  </div>
</div>



  </ion-page>


</template>
<script>
import {IonIcon, IonAvatar, IonFabButton, IonFab,  IonFabList, IonPage } from '@ionic/vue';
import {radioButtonOnOutline,chevronBackOutline,chatboxEllipsesOutline,happyOutline,heartOutline,helpOutline } from 'ionicons/icons';
import {useStore} from 'vuex'
import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import videoDescription from "../components/video_player_components/videoDescription.vue"
import Message from "../components/Message.vue"
import Emoji from "../components/Emoji.vue"
import Rating from "../components/Rating.vue"
import Menu from "../components/Menu.vue"
import Question from "../components/Question.vue"


export default {
  
  components: {IonIcon, IonAvatar, IonFab, IonFabButton, IonFabList, IonPage, videoDescription, Message, Menu, Emoji,Question, Rating},
  
  setup() {

 
    //variables
  const descriptionRef =ref(null)
  const cursorRef = ref(null)
  const videoRef = ref(null)
  const emojiRef = ref(null)
  const emoji = ref(false)
  const menuOnTop = ref(false)
  const currentPosition = ref({x:'',y:''})
  const router = useRouter()
  const store = useStore()
  const timeInterval= ref (null)

  const data = ref({isTrackable:true,right:false,left:false,bottom:false,top:false})
  //vuex state variables
  const currentInteraction = computed({
        get: () => store.state.app.currentInteraction,
        set: (val) => store.commit('updateCurrentInteraction', val)
        })
  const currentEmoji = computed({
        get: () => store.state.app.currentEmoji,
        set: (val) => store.commit('updateCurrentEmoji', val)
        })
  const currentVideoTime = computed({
        get: () => store.state.app.currentVideoTime,
        set: (val) => store.commit('updateCurrentVideoTime', val)
        })
  
  const formatedTime = computed({
        get: () => store.state.app.formatedTime,
        set: (val) => store.commit('updateFormatedTime', val)
        })
  //computed functions
  const emojiClass = computed(()=>{
    var classEmoji
    switch (currentEmoji.value) {
       case 'thumbUp': classEmoji='emojiTu'; break;
       case 'cryingSmile': classEmoji='emojiCs'; break;
       case 'astonished': classEmoji='emojiA'; break;
       case 'crying': classEmoji='emojiC'; break;
       case 'angry': classEmoji='emojiAn'; break;
       case 'thumbDown': classEmoji='emojiTd'; break;
     }

     console.log(currentEmoji.value,classEmoji)
     return classEmoji
   })
   //functions
  function udateInteractionType(val){store.commit('updateCurrentInteraction', val)} 


  function formatTime(time) {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

  function closeInteraction() {
                   if(cursorRef.value.$el.activated)
                   {
                    store.commit('updateCurrentInteraction','')
                    cursorRef.value.$el.style.transform="translate(-50%,-50%) scale(0)"
                    cursorRef.value.$el.style.background="rgba(0, 0, 0, 0)" 
                    videoRef.value.style.pointerEvents="all"
                    cursorRef.value.$el.style.pointerEvents="none"
                    cursorRef.value.$el.style.borderStyle="none"
                    videoRef.value.style.transform="translate(0,-50%) scale(1)"
                    videoRef.value.style.cursor="none"
                    videoRef.value.play()
                    }
                    else
                    {
                      store.commit('updateCurrentInteraction','menu')
                    }
    } 

  function closeInteractionChild() {
                    store.commit('updateCurrentInteraction','')
                    cursorRef.value.$el.style.transform="translate(-50%,-50%) scale(0)"
                    cursorRef.value.$el.style.background="rgba(0, 0, 0, 0)" 
                    videoRef.value.style.pointerEvents="all"
                    cursorRef.value.$el.style.pointerEvents="none"
                    cursorRef.value.$el.style.borderStyle="none"
                    cursorRef.value.$el.activated=false
                    videoRef.value.style.transform="translate(0,-50%) scale(1)"
                    videoRef.value.style.cursor="none"
                    videoRef.value.play()
                    } 

  
  function playFowrard(){
       videoRef.value.currentTime+=0.03
       timeInterval.value= setInterval(() => {
       currentVideoTime.value=videoRef.value.currentTime
       formatedTime.value=formatTime(videoRef.value.currentTime)
       videoRef.value.currentTime+=0.03
     }, 33);
  }
  function playBackward() {
    videoRef.value.currentTime-=0.03
    timeInterval.value= setInterval(() => {
       currentVideoTime.value=videoRef.value.currentTime
       formatedTime.value=formatTime(videoRef.value.currentTime)
       videoRef.value.currentTime-=0.03
     }, 33);
  }

  function stopForward() {
    clearInterval(timeInterval.value)
  }
  
  function goBack() { router.go(-1)}
  
  function showEmoji() { if(!emoji.value) {setTimeout(() => {
       emoji.value=true
       setTimeout(() => { emoji.value=false}, 2500);
       }, 700);
  }}
  
  function startVideo() {
    store.commit('hideVideoDescription') 
    setTimeout(() => {
       videoRef.value.play()
       descriptionRef.value.style.zIndex='-1'
    }, 500)}
 
  function checkCursorPosition(e){
                        currentPosition.value.x = e.clientX
                        currentPosition.value.y = e.clientY
                        var videoRect = videoRef.value.getBoundingClientRect()
                        var CursorRect = cursorRef.value.$el.getBoundingClientRect()
                        currentVideoTime.value=videoRef.value.currentTime
                        formatedTime.value=formatTime(videoRef.value.currentTime)
                      
        if( videoRect.right - CursorRect.right < 111){ data.value.right=true } else {data.value.right=false}
        if( CursorRect.left - videoRect.left < 111 ){ data.value.left=true } else {data.value.left=false}
        if( videoRect.bottom - CursorRect.bottom < 111){ data.value.bottom=true } else { data.value.bottom=false }
        if( CursorRect.top - videoRect.top < 160){ data.value.top=true } else {data.value.top=false}
        if( videoRect.bottom - CursorRect.bottom < 284){ menuOnTop.value=true } else { menuOnTop.value=false }
   }



       return {
         checkCursorPosition,
         currentPosition,
         closeInteractionChild,
         playFowrard,
         playBackward,
         videoRef,
         emojiRef,
         emojiClass,
         currentInteraction,
         udateInteractionType,
         cursorRef,
         showEmoji,
         emoji,
         currentEmoji,
         descriptionRef,
         stopForward,
         data,
         goBack,
         menuOnTop,
         heartOutline,
         radioButtonOnOutline,
         chevronBackOutline,
         chatboxEllipsesOutline,
         closeInteraction,
         happyOutline,
         helpOutline,
         startVideo,
         currentItem: computed(() => store.state.app.currentItem),
         videoDescriptionActive: computed(() => store.state.app.videoDescriptionActive),
         }
  },

  directives:{
				videoCursor(el,binding){
                 var timer;
                 var xOffset,yOffset;                
                 let cursor = document.getElementById('cursor');
                 function trackMouse(event) {
                        clearTimeout(timer);
                        timer=setTimeout(()=>{
                        if(!cursor.activated){cursor.style.transform = "translate(-50%,-50%) scale(0)"}
                        },1000);
                        var x = event.clientX
                        var y = event.clientY
                        cursor.style.left= x  +"px" ;
                        cursor.style.top = y +"px";
                        cursor.style.transform = "translate(-50%,-50%) scale(1)";
                        }

                el.onclick=function () {
                     const videoRect =  el.getBoundingClientRect()
                     const CursorRect = cursor.getBoundingClientRect()
                     xOffset= CursorRect.left - videoRect.left
                     yOffset=  CursorRect.top - videoRect.top  
                  if(!cursor.activated){
                    el.pause()
                    binding.value('menu')
                    el.style.transformOrigin=`${xOffset}px ${yOffset}px 0`
                    cursor.activated=true;
                    cursor.style.background="rgba(0, 0, 0, .3)" 
                    cursor.style.borderStyle="solid"
                    cursor.style.borderWidth="2px"
                    cursor.style.borderRadius= "50%"
                    cursor.style.transform="translate(-25%,-25%) scale(1.3)"
                    el.style.transform="translate(0,-50%) scale(1.5)"
                    el.style.pointerEvents="none"
                    cursor.style.pointerEvents="all"
                   }
           
                 
                }
                
                el.onmousemove = function (event) {
                  if(!cursor.activated){trackMouse(event);}
                 
                }
                   
                   el.onmouseout = function () {
                       
                      
                      if(!cursor.activated){cursor.style.transform = "translate(-50%,-50%) scale(0)";}
                    
                    }
              }
			},
}
</script>

<style scoped>
ion-fab-list ion-fab-button {
  --background:rgba(0, 0, 0, .5);
  z-index: 3;
  border-style: solid;
  border-color: white;
  border-radius: 50%;
  border-width: 1px;
}

ion-fab-button {
  cursor: pointer;
  z-index: 3;
}


ion-fab-list ion-fab-button ion-icon{
  color:white;
 
}

 ion-avatar {
  width: 54px;
  height: 54px;
    
  }

  .container {
    background: white;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

.content_interaction_bottom {
  position: absolute;
  width: 100%;
  bottom: -1%;
  left: 0%;
  max-height: 33vh;
  z-index: 1;  
}

.content_interaction_top {
  position: absolute;
  width: 100%;
  top: 0%;
  left: 0%;
  max-height: 33vh;
  z-index: 1;  
}  
.intro_content{
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cursor_button{
  --background:transparent;
  --box-shadow:none;
  border-style: none;
  border-color: white;
  border-radius: 50%;
  border-width: 2px;


}

.back_button{
  --box-shadow:none;
  --background:transparent;

}

#video{
cursor:none;
 max-width: 100%;
 max-height: 100%;
 top: 50%;
 position:absolute;
 transform: translateY(-50%);
 z-index: -1;
 transition: transform 0.6s ease-in-out 0.3s, transform-origin 0.3s;
 
 
}

#cursor {
z-index: 3;
 color: white;
 font-size: 33px;
 opacity: 0.7;
 position: absolute;
 transition:  transform 0.7s ease-in-out;
 transform: translate(-50%,-50%) scale(0);
 pointer-events: none;}

 .content {
   border-radius: 24px;
   overflow: hidden;
   max-width: 414px;
   height: 100%;
   width: 100%;
   max-height: 736px;
   position: relative;
   display: flex;
   flex-wrap: wrap;
   z-index: 0;
   justify-content: center;

 }

 .header{
   z-index: 2;
   max-height: 64px;
   width: 100%;
   display: flex;
   justify-content: space-evenly;
   
   flex-wrap: wrap;
   flex-direction: row;
   padding: 12px;
   position: absolute;
   top: 0;
   left:0;

 }
 .profile{
   display: inherit;
   align-content:center;
 }


.show-enter-active,
.show-leave-active {
    transform: translateY(0);
    transition: all .7s ease-out;
    opacity: 1;
}
.show-enter-from {
    transform: translateY(33%);
    opacity: 0;
}

.show-leave-to {
    transform: translateY(-33%);
    opacity: 0;
}




.showBottom-enter-active,
.showBottom-leave-active {
    transform: translateY(0%);
    transition: all .7s ease-out;
    opacity: 1;
}
.showBottom-enter-from,
.showBottom-leave-to {
    transform: translateY(33%);
    opacity: 0;
}


.showTop-enter-active,
.showTop-leave-active {
    transform: translateY(0);
    transition: all .7s ease-out;
    opacity: 1;
}
.showTop-enter-from,
.showTop-leave-to {
    transform: translateY(-33%);
    opacity: 0;
}


.emojiTu {
  position: absolute;
  font-size: 32px;
  animation: xAxis1 2.5s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
 
}

.emojiTu::after {
  position: inherit;
  content: '👍';
  display: block;
  animation: yAxis1 2.5s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
  transform:scale(0);
  opacity: 0;
}

.emojiCs {
  position: absolute;
  font-size: 32px;
  animation: xAxis2 2.5s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
 
}

.emojiCs::after {
  position: inherit;
  content: '😂';
  display: block;
  animation: yAxis2 2.5s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
  transform:scale(0);
  opacity: 0;
}


.emojiA {
  position: absolute;
  font-size: 32px;
  animation: xAxis3 2.5s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
 
}

.emojiA::after {
  position: inherit;
  content: '😮';
  display: block;
  animation: yAxis3 2.5s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
  transform:scale(0);
  opacity: 0;
}




.emojiC {
  position: absolute;
  font-size: 32px;
  animation: xAxis4 2.5s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
 
}

.emojiC::after {
  position: inherit;
  content: '😢';
  display: block;
  animation: yAxis4 2.5s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
  transform:scale(0);
  opacity: 0;
}


.emojiAn {
  position: absolute;
  font-size: 32px;
  animation: xAxis1 2.5s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
 
}

.emojiAn::after {
  position: inherit;
  content: '😡';
  display: block;
  animation: yAxis1 2.5s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
  transform:scale(0);
  opacity: 0;
}

.emojiTd {
  position: absolute;
  font-size: 32px;
  animation: xAxis3 2.5s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
 
}

.emojiTd::after {
  position: inherit;
  content: '👎';
  display: block;
  animation: yAxis3 2.5s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
  transform:scale(0);
  opacity: 0;
}


@keyframes yAxis1 {
  5% {
    animation-timing-function: ease;
    transform: scale(1);
    opacity: 1;
  }
    15% {
    animation-timing-function: ease;
    transform: scale(1.5);}

       25% {
    animation-timing-function: ease;
    transform: scale(0.9);
    opacity: 1;
  }
  

  100% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(-300px) scale(2);
    opacity: 0;
  }
}

@keyframes xAxis1 {
  5% {
    animation-timing-function: ease;
    transform: scale(1);
    opacity: 1;
  }
  
    15% {
    animation-timing-function: ease;
    transform: scale(1.5);
  }
  
      25% {
    animation-timing-function: ease;
    transform: scale(0.9) ;
  }


  100% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(300px) scale(2) ;
    opacity: 0;
  }
}

@keyframes yAxis2 {
  5% {
    animation-timing-function: ease;
    transform: scale(1);
    opacity: 1;
  }
    15% {
    animation-timing-function: ease;
    transform: scale(1.5);}

       25% {
    animation-timing-function: ease;
    transform: scale(0.9);
    opacity: 1;
  }
  

  100% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(300px) scale(2);
    opacity: 0;
  }
}

@keyframes xAxis2 {
  5% {
    animation-timing-function: ease;
    transform: scale(1);
    opacity: 1;
  }
  
    15% {
    animation-timing-function: ease;
    transform: scale(1.5);
  }
  
      25% {
    animation-timing-function: ease;
    transform: scale(0.9) ;
  }


  100% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(300px) scale(2) ;
    opacity: 0;
  }
}



@keyframes yAxis3 {
  5% {
    animation-timing-function: ease;
    transform: scale(1);
    opacity: 1;
  }
    15% {
    animation-timing-function: ease;
    transform: scale(1.5);}

       25% {
    animation-timing-function: ease;
    transform: scale(0.9);
    opacity: 1;
  }
  

  100% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(-300px) scale(2);
    opacity: 0;
  }
}

@keyframes xAxis3 {
  5% {
    animation-timing-function: ease;
    transform: scale(1);
    opacity: 1;
  }
  
    15% {
    animation-timing-function: ease;
    transform: scale(1.5);
  }
  
      25% {
    animation-timing-function: ease;
    transform: scale(0.9) ;
  }


  100% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(-300px) scale(2) ;
    opacity: 0;
  }
}


@keyframes yAxis4 {
  5% {
    animation-timing-function: ease;
    transform: scale(1);
    opacity: 1;
  }
    15% {
    animation-timing-function: ease;
    transform: scale(1.5);}

       25% {
    animation-timing-function: ease;
    transform: scale(0.9);
    opacity: 1;
  }
  

  100% {
    animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
    transform: translateY(300px) scale(2);
    opacity: 0;
  }
}

@keyframes xAxis4 {
  5% {
    animation-timing-function: ease;
    transform: scale(1);
    opacity: 1;
  }
  
    15% {
    animation-timing-function: ease;
    transform: scale(1.5);
  }
  
      25% {
    animation-timing-function: ease;
    transform: scale(0.9) ;
  }


  100% {
    animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
    transform: translateX(-300px) scale(2) ;
    opacity: 0;
  }
}
</style>

