<script setup async lang="ts">
import VGreenCounter from "../../components/VGreenCounter.vue";
import { island } from "../../island/vue";
import RClock from "../../components/Clock.react";

const GreenCounter = island(VGreenCounter);
const Clock = island(RClock);
</script>

<template>
  <div style="padding: 2em; padding-bottom: 20em;">
    <h1>Vue Page</h1>

    <p>We are not using Layout here, but it's possible!</p>

    <GreenCounter :count="10" />

    <div style="margin-bottom: 1000px" />

    <h2>Hydrated on Scroll</h2>
    <small>React component Hydrated on Scroll inside a +Page.vue</small>
    <Clock client:visible />
  </div>
</template>
