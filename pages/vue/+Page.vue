<script setup lang="ts">
import VGreenCounterVue from "~/components/VGreenCounter.island.vue";
import { withHydration } from "~/island/vue";
import RClock from "~/components/Clock.island.tsx";

const GreenCounter = withHydration(VGreenCounterVue);
const Clock = withHydration(RClock);
</script>
<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><a href="/">Access react page</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Vue page</h1>
      
      <h2>Component hydrated only on mobile</h2>
      <Clock client:media="(max-width: 576px)" />

      <h2>Vue component hydrated on load</h2>
      <GreenCounter :count="10" client:load />

      <div style="margin-bottom: 1000px" />

      <h2>Hydrated on scroll</h2>
      
      <Clock client:visible />
      <small>React component hydrated on scroll inside a +Page.vue</small>
    </main>
  </div>
</template>
