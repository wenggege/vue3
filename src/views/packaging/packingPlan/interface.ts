export interface StateType {
  tableList: Array<object>
}

export interface IpackagingInfo {
  ProjectNo?: string
  OrderNo?: string
  ItemNumber?: string | number
  Product?: string
  ProductType?: string | number
  ProductTypeText?: string
  ProjectPhase?: string | number
  ProjectPhaseText?: string
}

export interface InodeInfo {
  PMContent?: string
  PlanFinishDateText?: string
}

export interface Istate {
  oldTitle?: string
  title?: string
  componentName?: any
  status?: number
  nodeInfo?: InodeInfo
}
