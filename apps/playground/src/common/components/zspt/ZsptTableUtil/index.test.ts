import { FormatStyle } from '@/common/libs';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TableUtil } from './index';

describe('TableUtil', () => {
  let tableUtil: TableUtil<any>;

  beforeEach(() => {
    tableUtil = new TableUtil();
  });

  it('should initialize with default options', () => {
    expect(tableUtil).toBeDefined();
  });

  it('should create columns correctly', () => {
    const columns = {
      col1: vi.fn(),
      col2: vi.fn(),
    };
    tableUtil.createColumns({ sence: 'test', columns });
    expect(tableUtil['columns']['test']['col1']).toBe(columns['col1']);
    expect(tableUtil['columns']['test']['col2']).toBe(columns['col2']);
  });

  it('should copy columns correctly', () => {
    const columns = {
      col1: vi.fn(),
      col2: vi.fn(),
    };
    const targetColumns = {
      col1: vi.fn(),
      col2: vi.fn(),
    };
    tableUtil.createColumns({ sence: 'target', columns: targetColumns });
    tableUtil.copyColumns({ sence: 'test', targetScene: 'target', copyIds: ['col1', 'col2'] });
    expect(tableUtil['columns']['test']['col1']).toBe(targetColumns['col1']);
    expect(tableUtil['columns']['test']['col2']).toBe(targetColumns['col2']);
  });

  it('should extend column correctly', () => {
    const handler = vi.fn(() => ({})) as any;
    const columns = {
      col1: handler,
    };
    tableUtil.createColumns({ sence: 'target', columns });
    tableUtil.extendsColumn({ sence: 'test', targetScene: 'target', extendId: 'col1', handler });
    expect(handler).toHaveBeenCalledWith(columns['col1']);
  });

  it('should return formatted value', () => {
    expect(tableUtil.getValue({ val: null })).toBe('-');
    expect(tableUtil.getValue({ val: undefined })).toBe('-');
    expect(tableUtil.getValue({ val: 123 })).toBe(123);
  });

  it('should render range time correctly', () => {
    const startTime = Date.now();
    const endTime = Date.now() + 1000;
    const renderRangeTimeResult = tableUtil.renderRangeTime({ startTime, endTime });
    expect(renderRangeTimeResult).toBeDefined();
  });

  it('should return default range time render function', () => {
    const render = tableUtil.getDefaultRangeTimeRender({
      format: FormatStyle.YYYYMMDDHHmmss,
      rangeTime: ['start', 'end'],
    });
    expect(typeof render).toBe('function');
  });

  it('should add operations column', () => {
    const operationColumn = vi.fn();
    tableUtil.addOperations({ sence: 'test', column: operationColumn });
    expect(tableUtil['columns']['test']['operationKey']).toBe(operationColumn);
  });

  it('should get columns correctly', () => {
    const columns = {
      col1: vi.fn(() => ({ title: 'Column 1' })),
    };
    tableUtil.createColumns({ sence: 'test', columns });
    const cols = tableUtil.getColumns({ sence: 'test', context: {}, ids: ['col1'] });
    expect(cols.length).toBe(1);
    expect(cols[0].title).toBe('Column 1');
  });

  it('should throw an error if column id is not registered', () => {
    expect(() => {
      tableUtil.getColumns({ sence: 'test', context: {}, ids: ['nonExistent'] });
    }).toThrow('未注册id 为 nonExistent 的列信息');
  });
});
