import { makeObservable, observable, toJS } from 'mobx'
import { BaseModel, BaseModelOptions } from './base'
import { RequestResult } from '@/common/libs'

export type MapModelState<T> = {
  data: T
  loading: boolean
  error: boolean
  msg?: string
}

/**
 * - T 列表数据类型
 * - C 是上下文
 */
export class MapModel<T, C = Record<string, string>> extends BaseModel<C> {
  @observable
  public mapInfo: MapModelState<T>

  private promise: Promise<RequestResult<T> | undefined> | null = null

  constructor(options: BaseModelOptions<C>) {
    super(options)
    this.mapInfo = { data: {} as T, loading: false, error: false }
    makeObservable(this)
  }

  getData() {
    return toJS(this.mapInfo)
  }

  resetData() {
    this.mapInfo = { data: {} as T, loading: false, error: false }
  }

  protected setMapInfo(data: Partial<MapModelState<T>>) {
    this.mapInfo = {
      ...this.mapInfo,
      ...data,
    }
  }

  doRequest(request: () => Promise<RequestResult<T> | undefined>) {
    if (this.promise) {
      console.log('return has promise')
      return this.promise
    }
    this.promise = request()
    return this.promise
  }

  async loadData(request: () => Promise<RequestResult<T> | undefined>) {
    try {
      this.setMapInfo({ loading: true })
      const result = await this.doRequest(() => request())

      if (result) {
        this.mapInfo = {
          ...this.mapInfo,
          data: result?.data,
        }
        console.log('loadData success:', this.mapInfo)
      }

      this.promise = null
      const hasError = !result.success
      this.setMapInfo({
        loading: false,
        error: hasError,
        msg: hasError ? result?.msg : '',
      })
      return result
    } catch (error) {
      console.log('加载 Map 数据失败,', error)
      this.setMapInfo({ loading: false, error: true })
      this.promise = null
      return undefined
    }
  }
}
