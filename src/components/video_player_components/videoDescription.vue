<template>
<div class="description_container">
    <div class="card">
   <ion-card-header>
      <ion-card-title color="white">Alan Wilson Watts</ion-card-title>
   </ion-card-header>

   <ion-card-content>
       “We do not "come into" this world; we come out of it, as leaves from a tree. As the ocean "waves," the universe "peoples." 
       Every individual is an expression of the whole realm of nature, a unique action of the total universe.”
    </ion-card-content>

     <ion-card-subtitle class="ion-text-center" color="white">28 march 2021</ion-card-subtitle>
  
  </div>

    <div class="item">
      
   <ion-icon  @click="play()" :icon="playCircleOutline" slot="center"></ion-icon>

    </div>
</div>
</template>
<script>
import {IonCardHeader,IonCardContent,IonCardTitle,IonCardSubtitle,IonIcon} from '@ionic/vue';
import {playCircleOutline} from 'ionicons/icons';

export default {
    components:{ IonCardHeader, IonCardContent,IonCardTitle,IonCardSubtitle,IonIcon},
    setup(props, { emit }) {
    
    function play() {
           emit('onPlay')
    }
 
    
    return{
    playCircleOutline,
    play}
    },
}
</script>

<style scoped>
.description_container{
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
}
ion-icon {
  transform: scale(1);
     transition: all .7s ease-out;
    font-size: 36px;
}
ion-icon:hover{
    transform: scale(2);
}
.card{
   padding: 24px;
   margin: 12px;
   border-radius: 50px;
   background:rgba(0, 0, 0, 0.3);
   max-width: 360px;
}
.item {
display: flex;
justify-content: center;
align-content: center;
max-width: 360px;
}
ion-card{
    max-width: 512;

}
</style>