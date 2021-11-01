<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <p>Explore <a target="_blank" rel="noopener noreferrer" style="color:black;" href="https://ionicframework.com/docs/components">UI Components</a></p>
     <ion-button>
      <ion-button href="/tabs/video" size="large">Play-video</ion-button>
     </ion-button>
  </div>
</template>

<script >
import {IonButton } from '@ionic/vue';



export default {
  components: { IonButton },
  name: 'ExploreContainer',
  props: {
    name: String
  }
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>