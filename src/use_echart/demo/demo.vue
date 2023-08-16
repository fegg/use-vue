<script setup>
import { useEChart } from '..';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue-demi';
import _ from 'lodash';

const props = defineProps({
  eventId: {
    type: String,
    required: true,
    default: 'demo',
  },
  option: {
    type: Object,
    required: true,
    // 演示默认值
    default: () => {
      return {
        grid: {
          left: 40,
          right: 20,
          top: 30,
          bottom: 40,
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };
    },
  },
});

const width = ref('100%');
const height = ref('400px');

const { chartRef, init, autoResize, setOption } = useEChart();

let resizeEventCallback = null;

watch(
  () => props.option,
  (newValue, oldValue) => {
    if (!newValue || _.isEqual(newValue, oldValue)) {
      return;
    }

    setOption(newValue);
  },
  {
    immediate: true,
    deep: true,
  },
);

onMounted(() => {
  init().setOption(props.option);

  resizeEventCallback = autoResize(props.eventId);
});

onBeforeUnmount(() => {
  if (resizeEventCallback) {
    resizeEventCallback();
  }
});
</script>

<template>
  <div>
    <div
      ref="chartRef"
      class="chart"></div>
  </div>
</template>

<style scoped lang="less">
.chart {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
