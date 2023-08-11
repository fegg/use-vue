<script setup>
import { useServiceLoading } from '../index';
import { onMounted } from 'vue-demi';

const { loading, service } = useServiceLoading({
  service: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: '<NAME>',
          },
          {
            id: 2,
            name: '<NAME>',
          },
          {
            id: 3,
            name: '<NAME>',
          },
        ]);
      }, 1000);
    });
  },
});

onMounted(() => {
  service();
});
</script>

<template>
  <div>
    <h1>{{ loading ? '加载中' : '加载完成' }}</h1>
  </div>
</template>

<style scoped lang="less"></style>
