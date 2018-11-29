<template>
  <Page>
    <ActionBar title="BLE Scanner"/>
    <StackLayout>
      <Label class="message" :text="msg" col="0" row="0"/>
      <Button text="Button" @tap="onButtonTap"/>
    </StackLayout>
  </Page>
</template>

<script>
import Scan from './Scan.vue'
import Vue from 'nativescript-vue'
export default {
  data() {
    return {
      msg: "Open Scan Page",
      scanPage: Scan
    };
  },
  methods: {
    onButtonTap() {
        console.log('Open Scan Page');        
        this.$navigateTo(this.scanPage);
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
