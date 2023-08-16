import { ref } from 'vue';
import $ from 'jquery';
import _ from 'lodash';
import * as echarts from 'echarts';
import { EChartsType } from 'echarts';
import { UseEChartOptions } from './types';

/**
 * @description 计算图表的 px，主要用于适配 grid 配置
 * @param size
 * @param defaultWidth
 */
export const fitChartSize = (size: number, defaultWidth: number = 1920) => {
  const screenWidth = $(window).width();
  if (!screenWidth) {
    return size;
  }
  const scale = screenWidth / defaultWidth;

  return Number((size * scale).toFixed(3));
};

export function useEChart() {
  // chart dom ref
  const chartRef = ref(null);
  // chart 实例
  let chart: EChartsType = null;

  /**
   * @description 初始化 echarts 实例
   */
  function init() {
    if (chartRef.value) {
      chart = echarts.init(chartRef.value);
    }

    return chart;
  }

  function autoResizeHandler() {
    if (chart) {
      chart.resize();
    }
  }

  /**
   * @description 适配 window resize
   * @param eventId 监听事件的子 id，建议设置
   * @param delay 是否延迟执行，具体延迟多少，默认 0
   * @returns 取消监听事件的钩子函数
   */
  function autoResize(eventId, delay) {
    const handler = _.isNil(delay) ? autoResizeHandler :  _.debounce(autoResizeHandler, delay);
    const eventName = _.isNil(eventId) ? 'resize' : `resize.${eventId}`;

    $(window).on(eventName, handler);

    return () => {
      $(window).off(eventName, handler);
    };
  }

  /**
   * @description 安全点的 chart.setOption
   * @param option
   */
  function setOption(option: UseEChartOptions) {
    if (!chart) {
      return chart;
    }

    chart.setOption(option);

    return chart;
  }

  return {
    chart,
    chartRef,
    init,
    setOption,
    autoResize,
    autoResizeHandler,
  };
}
