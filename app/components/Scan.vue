<template>
  <Page>
    <ActionBar title="BLE Scanner">
      <ActionItem
        @tap="onTapShare"
        ios.systemIcon="9"
        ios.position="left"
        android.systemIcon="ic_menu_share"
        android.position="actionBar"
      />
    </ActionBar>
    <StackLayout>
      <Label class="message" :text="bleStatus" color="blue"/>
      <Button text="Scan" @tap="onScanTap"/>
      <ListView class="list-group" for="(item, index) in items" @itemTap="onItemTap">
        <v-template>
          <FlexboxLayout flexDirection="row" class="list-group-item">
            <Label :text="item.UUID" class="list-group-item-heading" style="width: 40%"/>
            <Label :text="item.name" class="list-group-item-heading" style="width: 40%"/>
            <Label :text="item.distance" class="list-group-item-heading" style="width: 20%"/>
          </FlexboxLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>
<script>
import bluetooth from "nativescript-bluetooth";

function calculateDistance(rssi) {
  var txPower = -86; //hard coded power value. Usually ranges between -59 to -65

  if (rssi == 0) {
    return -1.0;
  }

  var ratio = (rssi * 1.0) / txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio, 10);
  } else {
    var distance = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
    return distance;
  }
}

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
      console.log(event.item.UUID);
    },
    onScanTap() {
      this.items = [];
      bluetooth
        .startScanning({
          serviceUUIDs: [],
          seconds: 4,
          onDiscovered: peripheral => {
            console.log("Periperhal found with UUID: " + peripheral.UUID);
            peripheral.distance = calculateDistance(peripheral.RSSI).toFixed(2);
            this.items.push(peripheral);
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