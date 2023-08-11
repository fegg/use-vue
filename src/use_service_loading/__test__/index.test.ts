import { describe, it, expect } from 'vitest';
import { useServiceLoading } from '../index';

describe('useServiceLoading', () => {
  it('useServiceLoading service ok', () => {
    expect(useServiceLoading({
      service: () => {
        return Promise.resolve(1);
      },
    })).toBeDefined();
  });

  it('useServiceLoading service loading ok', async () => {
    const { loading, service } = useServiceLoading({
      service: () => {
        expect(loading.value).toBe(true);
        return Promise.resolve(1);
      },
    });

    await service();

    expect(loading.value).toBe(false);
  });
});
