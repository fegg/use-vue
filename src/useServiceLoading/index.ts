import { ref } from 'vue';
import { UseServiceLoadingOptions } from './types';

export function useServiceLoading(options: UseServiceLoadingOptions) {
  if (!options || !options.service) {
    throw new Error('请检查 useServiceLoading 参数');
  }

  const loading = ref(false);

  const service = () => {
    loading.value = true;
    return options.service().finally(() => {
      loading.value = false;
    });
  };

  return {
    loading,
    service,
  };
}
