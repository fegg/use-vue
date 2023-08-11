import { describe, it, expect } from 'vitest';
import { useService } from '../index';

describe('useService', () => {
  it('useService service ok', () => {
    expect(useService).toBeDefined();
  });
});
