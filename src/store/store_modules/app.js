
const app = {
  state: {
    currentItem:{
      likes:[],
      commets:[],
      videoSrc:'../assets/provitional_assets/test.mp4',
      avatarSrc:'../assets/provitional_assets/jose.jpg',
    },
    
    currentVideoTime:0,
    formatedTime:0,
    videoComment:"",
    currentEmoji:"",
    currentInteraction:'',
    videoDescriptionActive:true,
    bottomTabActive:true,
  },
  getters:{
  },
  actions:{

  },

  mutations: {
    hideBottomTab(state){
      state.bottomTabActive=false
     },
     
    updateCurrentVideoTime(state,payload){
      state.currentVideoTime=payload
    },

    updateFormatedTime(state,payload){
      state.formatedTime=payload
    },
    
    updateCurrentEmoji(state,payload){
      state.currentEmoji=payload
     },

     showBottomTab(state){
      state.bottomTabActive=true
     },

     hideVideoDescription(state){
      state.videoDescriptionActive=false
     },

     showVideoDescription(state){
      state.videoDescriptionActive=true
     },

     updateVideoComment(state,payload){
      state.videoComment=payload
     },

     updateCurrentInteraction(state,payload){
      state.currentInteraction=payload
     }

 
  },
 
}
export default app