import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

var firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
  onMessageReceivedCallback: function(message) {
    console.log("Title: " + message.title);
    console.log("Body: " + message.body);
    // if your server passed a custom property called 'foo', then do this:
    console.log("Value of 'foo': " + message.data.foo);
  }
}).then(
    function () {
      console.log("firebase.init done");
      firebase.subscribeToTopic("news").then(() => console.log("Subscribed to topic"));
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);

new Vue({
  render: h => h('frame', [h(App)])
}).$start()
