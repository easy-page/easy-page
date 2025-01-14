import { describe, it, expect, vi } from 'vitest';
import { handleIdsValue } from './handleIdsValue';



describe('handleIdsValue', () => {
  it('should return undefined if val is undefined', () => {
    const result = handleIdsValue();
    console.log('result:', result)
    expect(result).toBeUndefined();
  });

  it('should return undefined if val is an empty string', () => {
    const result = handleIdsValue('');
    expect(result).toBeUndefined();
  });

  it('should return an array of numbers if val contains comma-separated numbers', () => {
    const result = handleIdsValue('1,2,3');
    expect(result).toEqual([1, 2, 3]);
  });

  it('should replace Chinese commas with English commas and return an array of numbers', () => {
    const result = handleIdsValue('1，2，3');
    expect(result).toEqual([1, 2, 3]);
  });

  it('should trim trailing commas and return an array of numbers', () => {
    const result = handleIdsValue('1,2,3,');
    expect(result).toEqual([1, 2, 3]);
  });

  it('should filter out non-numeric values and return an array of numbers', () => {
    const result = handleIdsValue('1,2,foo,3');
    expect(result).toEqual([1, 2, 3]);
  });

  it('should return undefined if all values are non-numeric', () => {
    const result = handleIdsValue('foo,bar');
    expect(result).toBeUndefined();
  });
});
