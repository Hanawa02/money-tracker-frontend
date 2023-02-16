<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-3xl text-center mb-8 font-bold text-dark-primary">
      {{ $t("pages.createCost.header") }}
    </h1>
    <cost-form @cost-added="goToHomePage" />
  </div>
</template>

<script setup lang="ts">
import useNavigation from "~/composables/navigation.composable";
import CostForm from "~/components/CostForm.vue";
import { useMainStore } from "~/stores/main.store";

const mainStore = useMainStore();
mainStore.loadData();

const { goToHomePage } = useNavigation();
</script>
