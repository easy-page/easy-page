import * as React from 'react';
import Input from '@roo/roo/Input';
import type { FilterSearchType, TableLocale } from '../../interface';

interface FilterSearchProps<RecordType = any> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterSearch: FilterSearchType<RecordType>;
  tablePrefixCls: string;
  locale: TableLocale;
}

function FilterSearch<RecordType>({
  value,
  onChange,
  filterSearch,
  tablePrefixCls,
  locale,
}: FilterSearchProps<RecordType>) {
  if (!filterSearch) {
    return null;
  }
  return (
    <div className={`${tablePrefixCls}-filter-dropdown-search`}>
      <Input
          placeholder={locale.filterSearchPlaceholder}
          onChange={onChange}
          value={value}
          className={`${tablePrefixCls}-filter-dropdown-search-input`}
      />
    </div>
  );
}

export default FilterSearch;
