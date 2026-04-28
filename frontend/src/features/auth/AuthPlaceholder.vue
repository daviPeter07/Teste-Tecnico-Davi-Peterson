<template>
  <VApp>
    <VMain class="auth-main">
      <VContainer class="fill-height" fluid>
        <VRow align="center" justify="center" class="fill-height">
          <VCol cols="12" sm="8" md="5" lg="4">
            <VCard rounded="xl" elevation="4">
              <VCardTitle class="text-h6">{{ title }}</VCardTitle>
              <VCardText>{{ subtitle }}</VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
}>();
</script>

<style scoped>
.auth-main {
  background: linear-gradient(135deg, #f7f9fc 0%, #e7eef8 100%);
}
</style>
