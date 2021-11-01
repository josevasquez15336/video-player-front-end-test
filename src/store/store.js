import {createStore} from 'vuex'
import app from './store_modules/app'
export const store = createStore({
    modules: {
        app,
      }
})