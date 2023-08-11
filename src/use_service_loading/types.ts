export interface UseServiceLoadingOptions {
  service: () => Promise<any>;
}

export interface UseServiceLoadingResult {
  loading: boolean;
  service: () => Promise<any>;
}
