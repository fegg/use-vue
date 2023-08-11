import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import { useService } from '../index';

describe('useService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('useService defined ok', () => {
    expect(useService).toBeDefined();
  });

  it('useService service loading ok', async () => {
    const { service, state } = useService({
      service: () => {
        expect(state.loading).toBe(true);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(1);
          }, 300);
        });
      },
    });

    expect(state.loading).toBe(false);

    vi.runAllTimersAsync();
    await service();

    expect(state.loading).toBe(false);
  });

  it('useService service resolve ok', async () => {
    const { service, state } = useService({
      service: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(1);
          }, 300);
        });
      },
    });

    expect(state.error).toBe(null);
    expect(state.data).toBe(null);
    expect(state.loading).toBe(false);

    vi.runAllTimersAsync();
    await service();

    expect(state.error).toBe(null);
    expect(state.data).toBe(1);
    expect(state.loading).toBe(false);
  });

  it('useService service reject ok', async () => {
    const { service, state } = useService({
      service: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('请求错误'));
          }, 300);
        });
      },
    });

    expect(state.error).toBe(null);
    expect(state.data).toStrictEqual(null);
    expect(state.loading).toBe(false);

    vi.runAllTimersAsync();
    await service();

    expect(state.error.message).toBe('请求错误');
    expect(state.data).toStrictEqual(null);
    expect(state.loading).toBe(false);
  });

  it('useService service empty ok', async () => {
    // 无数据的情况
    const { service, state } = useService({
      validateEmpty: (data) => {
        return data?.length === 0;
      },
      service: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([]);
          }, 300);
        });
      },
    });

    expect(state.empty).toBe(false);

    vi.runAllTimersAsync();
    await service();

    expect(state.empty).toBe(true);

    // 有数据的情况
    const { service: service2, state: state2 } = useService({
      validateEmpty: (data) => {
        return data?.length === 0;
      },
      service: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([1]);
          }, 300);
        });
      },
    });

    expect(state2.empty).toBe(false);

    vi.runAllTimersAsync();
    await service2();

    expect(state2.empty).toBe(false);
  });

  it('useService service defaultData ok', async () => {
    const { state } = useService({
      defaultData: [],
      service: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
          }, 300);
        });
      },
    });

    expect(state.data).toStrictEqual([]);
  });
});
