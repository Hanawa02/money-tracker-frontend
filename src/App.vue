<template>
  <div class="w-full min-h-screen h-full max-w-md mx-auto">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMainStore } from "~/stores/main.store";

const mainStore = useMainStore();

onMounted(() => {
  mainStore.loadData();
});
</script>
