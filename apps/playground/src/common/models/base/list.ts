import { makeObservable, observable, toJS } from 'mobx'
import { BaseModel, BaseModelOptions } from './base'
import { isEqual } from 'lodash'
/**
 * - 列表类状态模型设计
 * - T：表示列表数据的类型
 * - filters、records、pageNo、pageSize
 * - 考虑分页、不分页的场景
 * */
export type ListModelOptions<V> = {
  /** 是否分页，默认是 false */
  disablePage?: boolean
  defaultPageSize?: number
  defaultPageNo?: number
  defaultFilters: V
}

export type PageInfo = {
  pageSize: number
  pageNo: number
}

export type ListModelState<T> = {
  data: T[]
  loading: boolean
  error: boolean
  msg?: string
  total?: number
  extraInfo?: any // 需要用到接口返回data以外的额外信息
}

const DEFAULT_PAGE_NO = 1
const DEFAULT_PAGE_SIZE = 10

/**
 * - T 列表数据类型
 * - V 筛选条件类型
 * - C 额外存储的全局共享上下文
 */
export class ListModel<
  T,
  V = Record<string, any>,
  C = Record<string, string>
> extends BaseModel<C> {
  private options: ListModelOptions<V>

  @observable
  public listInfo: ListModelState<T>

  @observable
  public pageInfo: PageInfo

  @observable
  public filters: V

  @observable
  public cacheFilters: V

  private promise: Promise<Partial<ListModelState<T>>> | null = null

  constructor(options: ListModelOptions<V> & BaseModelOptions<C>) {
    super(options)
    this.options = options
    const { defaultPageNo, defaultPageSize, defaultFilters } = options

    this.listInfo = {
      data: [],
      total: 0,
      loading: false,
      error: false,
    }

    this.pageInfo = {
      pageNo: defaultPageNo || DEFAULT_PAGE_NO,
      pageSize: defaultPageSize || DEFAULT_PAGE_SIZE,
    }
    this.filters = defaultFilters || ({} as V)
    makeObservable(this)
  }

  getFilters() {
    return toJS(this.filters)
  }

  getCacheFilters() {
    return toJS(this.cacheFilters)
  }

  /** 重置的时候，若是想要保留某个 key，可以传：excludeKeys */
  resetFilters(options?: { excludeKeys?: Array<keyof V> }) {
    const { excludeKeys = [] } = options || {}
    const stayFilters: Partial<V> = {}
    excludeKeys.forEach((e) => {
      stayFilters[e] = this.filters[e]
    })

    this.filters = {
      ...(this.options.defaultFilters || {}),
      ...stayFilters,
    } as V
    return this.filters
  }

  replaceFilters(filters: Partial<V>) {
    this.filters = { ...filters } as V
  }

  setCacheFilters(filters: Partial<V>) {
    this.cacheFilters = { ...filters } as V
  }

  setFilters(filters: Partial<V>) {
    this.filters = {
      ...this.filters,
      ...filters,
    }
    return toJS(this.filters)
  }

  private setListInfo(data: Partial<ListModelState<T>>) {
    this.listInfo = {
      ...this.listInfo,
      ...data,
    }
  }

  changePage = (pageInfo: Omit<PageInfo, 'total'>) => {
    this.pageInfo = {
      ...this.pageInfo,
      ...pageInfo,
    }
  }

  doRequest(
    request: () => Promise<Partial<ListModelState<T>>>,
    options?: { refresh: boolean }
  ) {
    if (this.promise && !options?.refresh) {
      return this.promise
    }
    this.promise = request()
    return this.promise
  }

  async doloadList(
    request: (
      options: V & Partial<PageInfo>
    ) => Promise<Partial<ListModelState<T>>>,
    options?: { refresh: boolean }
  ) {
    try {
      this.setListInfo({ loading: true })
      const result = await this.doRequest(
        () =>
          request({
            ...this.filters,
            ...this.pageInfo,
          }),
        options
      )

      this.promise = null

      console.log('set loading false:', result)
      this.setCacheFilters(this.filters)
      this.setListInfo({
        loading: false,
        ...result,
        msg: result.error ? result.msg : '',
      })
      return result
    } catch (error: any) {
      this.setListInfo({ loading: false, error: true })
      this.promise = null
      console.error('加载列表数据失败：', error?.message)
      return undefined
    }
  }

  async loadListWithPage(
    request: (filters: V & PageInfo) => Promise<Partial<ListModelState<T>>>,
    options?: { refresh: boolean }
  ) {
    return this.doloadList(request as any, options)
  }

  async loadList(
    request: (filters: V) => Promise<Partial<ListModelState<T>>>,
    options?: { refresh: boolean }
  ) {
    return this.doloadList(request, options)
  }

  getList(): ListModelState<T> & PageInfo & V {
    return {
      ...toJS(this.listInfo),
      ...toJS(this.filters),
      ...toJS(this.pageInfo),
    }
  }
}
