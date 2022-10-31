<template>
  <div class="w-full min-h-screen h-full">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/stores/main.store";

const mainStore = useMainStore();
mainStore.loadData();
</script>
