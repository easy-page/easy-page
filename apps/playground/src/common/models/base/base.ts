import { observable, toJS } from "mobx";

export type BaseModelOptions<C> = {
  defaultContext?: C
}

export class BaseModel<C> {
  @observable
  public context: C;

  constructor(options: BaseModelOptions<C>) {
    this.context = options?.defaultContext || ({} as C)
  }

  getContext(): C {
    return toJS(this.context)
  }

  setContext(context: C) {
    this.context = {
      ...this.context,
      ...context,
    }
  }
}