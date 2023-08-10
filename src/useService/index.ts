import { reactive } from 'vue';
import type { UseServiceOptions } from './types';

export function useService(options: UseServiceOptions) {
  if (!options) {
    throw new Error('options is required');
  }

  if (!options.service) {
    throw new Error('options.service is required');
  }

  const validateEmpty =
    options.validateEmpty ??
    function (data) {
      return data === null;
    };
  const defaultData = options.defaultData || null;

  const state = reactive({
    loading: false,
    error: null,
    empty: false,
    data: defaultData,
  });

  async function service() {
    state.loading = true;
    try {
      state.data = await options.service();
      state.empty = validateEmpty(state.data);
      state.error = null;
    } catch (e) {
      state.error = e;
    }
    state.loading = false;
  }

  return {
    state,
    service,
  };
}
