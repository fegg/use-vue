import { describe, it, expect } from 'vitest';
import { useServiceLoading } from '../index';

describe('useServiceLoading', () => {
  it('useServiceLoading service ok', () => {
    expect(useServiceLoading).toBeDefined();
  });
});
