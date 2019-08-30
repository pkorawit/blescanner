<template>
  <Page>
    <ActionBar title="Firebase Integration" />
    <StackLayout>
      <Label class="message" text="Firebase" col="0" row="0" />
      <Button text="Print" @tap="onButton1Tap()" />
    </StackLayout>
  </Page>
</template>
<script>
import Vue from "nativescript-vue";

export default {
  data() {
    return {
      printers: []
    };
  },

  methods: {
    onButton1Tap: () => {
 
    }
  }
};
</script>