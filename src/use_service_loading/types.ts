import { Ref } from 'vue-demi';

export interface UseServiceLoadingOptions {
  service: () => Promise<any>;
}

export interface UseServiceLoadingResult {
  loading: Ref<boolean>;
  service: () => Promise<any>;
}
