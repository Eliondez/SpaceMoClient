<template>
  <div>
    <div>
    <b-tabs>
      <b-tab title="Tier" active>
        <b-table striped hover :items="tierItems" :small='small' @row-clicked="selectTier"></b-table>
      </b-tab>
      <b-tab title="Frame">
        <b-table striped hover :items="frameItems" :small='small' @row-clicked="selectFrame"></b-table>
      </b-tab>
      <b-tab title="Power Core">
        <b-table striped hover :items="powerCoreItems" :small='small' @row-clicked="selectPowerCore"></b-table>
      </b-tab>
      <b-tab title="Thrusters">
        <b-table striped hover :items="thrusterItems" :small='small' @row-clicked="selectThrusters"></b-table>
      </b-tab>
      <b-tab title="Armor">
        <b-table striped hover :items="armorItems" :small='small' @row-clicked="selectArmor"></b-table>
      </b-tab>
      <b-tab title="Computer">
        <b-table striped hover :items="computerItems" :small='small' @row-clicked="selectComputer"></b-table>
      </b-tab>
    </b-tabs>
    </div>
    <div>
      Total</br>
      Tier: <span v-if="current.tier">{{ current.tier.Tier }}</span><br>
      Point total: <span v-if="current.tier">{{ current.tier.starshipBuildPoints }}</span><br>
      Points left: <span v-if="current.tier">{{ current.tier.starshipBuildPoints }}</span><br>
      Frame: <span v-if="current.frame">{{ current.frame.name }}</span><br>
      Size: <span v-if="current.frame">{{ current.frame.size }}</span><br>
    </div>
  </div>
</template>

<script>
  import consData from "./shipConstructorData.js";

  export default {
    data () {
      return {
        small: true,
        title: "Shop Constructor!",
        tierItems: consData.tierItems,
        frameItems: consData.frameItems,
        powerCoreItems: consData.powerCoreItems,
        thrusterItems: consData.thrusterItems,
        armorItems: consData.armorItems,
        computerItems: consData.computerItems,
        current: {
          tier: null,
          frame: null,
          powerCore: null,
          thrusters: null,
          armor: null,
          computer: null
        }
      }
    },
    methods: {
      selectTier: function(item, index){
        this.current.tier = item;
      },
      selectFrame: function(item, index){
        this.current.frame = item;
      },
      selectPowerCore: function(item, index){
        this.current.powerCore = item;
      },
      selectThrusters: function(item, index){
        this.current.thrusters = item;
      },
      selectArmor: function(item, index){
        this.current.armor = item;
      },
      selectComputer: function(item, index){
        this.current.computer = item;
      }
    }
  }
</script>



<style>

</style>