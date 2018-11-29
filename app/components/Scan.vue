<template>
  <Page>
    <ActionBar title="BLE Scanner"/>
    <StackLayout>
      <Label class="message" :text="bleStatus" color="blue"/>
      <Button text="Scan" @tap="onButtonTap"/>
      <ListView for="item in items" @itemTap="onItemTap">
        <v-template>
          <Label class="list-item" :text="item.text"/>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>
<script>
import bluetooth from "nativescript-bluetooth";
export default {
  data() {
    return {
      msg: "Scan for BLE devices",
      bleStatus: "Unknown",
      items: []
    };
  },
  methods: {
    onItemTap(event) {
      console.log(event.item.text);
    },
    onButtonTap() {
      this.items = []
      bluetooth
        .startScanning({
          serviceUUIDs: [],
          seconds: 4,
          onDiscovered: peripheral => {
            console.log("Periperhal found with UUID: " + peripheral.UUID);
            this.items.push({text:peripheral.UUID + '-' + peripheral.name})
          }
        })
        .then(
          function() {
            console.log("scanning complete");
          },
          function(err) {
            console.log("error while scanning: " + err);
          }
        );
    }
  },
  mounted() {
    bluetooth.isBluetoothEnabled().then(enabled => {
      console.log("Enabled? " + enabled);
      if (enabled) this.bleStatus = "BLE is enabled";
      else this.bleStatus = "BLE is disable";
    });
  }
};
</script>
<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}
.list-item {
  margin: 15px;
  font-size: 20;
}
.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>