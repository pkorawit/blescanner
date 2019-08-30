<template>
  <Page>
    <ActionBar title="BLE Scanner"/>
    <StackLayout>
      <Label class="message" :text="msgBotton1" col="0" row="0"/>
      <Button text="BLE" @tap="onButton1Tap"/>
       <Label class="message" :text="msgBotton2" col="0" row="0"/>
      <Button text="Firebase" @tap="onButton2Tap"/>
    </StackLayout>
  </Page>
</template>

<script>
import Scan from './Scan.vue'
import FBpage from './Firebase.vue'
import Vue from 'nativescript-vue'
export default {
  data() {
    return {
      msgBotton1: "Open Scan Page",
      msgBotton2: "Firebase Integration",
      scanPage: Scan,
      firebasePage: FBpage

    };
  },
  methods: {
    onButton1Tap: function() {
        console.log('Open Scan Page');        
        this.$navigateTo(this.scanPage);
    },
    onButton2Tap: function()  {
        console.log('Open Firebase Page');        
        this.$navigateTo(this.firebasePage);
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
