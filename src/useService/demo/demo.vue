<script setup>
  import { useService } from '../index';
  import { onMounted } from 'vue-demi';

  const { state, service } = useService({
    defaultData: [],
    validateEmpty: data => data.length === 0,
    service: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              name: '<NAME>'
            },
            {
              id: 2,
              name: '<NAME>'
            },
            {
              id: 3,
              name: '<NAME>'
            }
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
    <h1>{{ state.data.length }}</h1>
    <button @click="service">Refresh</button>
    <ul>
      <li v-for="item in state.data" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <div>
      是否有错误：{{ !state.error ? '无' : '有' }}
    </div>
  </div>
</template>

<style scoped lang="less"></style>
