export interface UseServiceOptions<T = any> {
  service: () => Promise<any>;
  validateEmpty?: (data: T) => boolean;
  defaultData?: T;
}
