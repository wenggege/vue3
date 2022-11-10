export interface tableColumns {
  Name: string
  IsHidden: boolean
  Label: string
  IsFixed: string
  Width: string
  Link: string
  align: string
}

// 节点编辑表格表头配置
export interface EditTableHeader {
  prop: string
  width: string | number
  label: string
  isRequired?: boolean
  isTooltip?: boolean
  type: string
  step?: number
  isInteger?: boolean // 整数限制
  isDisabled?: boolean 
  option?: optionType[]
  optionIn?: optionType[] // 内包材
  optionOut?: optionType[] // 外包材
}

interface optionType {
  id: string | number
  name: string
}

// 各节点数据类型
export interface Node10Type {
  DeoxidantPlacementLocation?: string // 除氧剂放置位置
  DesiccantPlacementLocation?: string // 干燥剂-放置位置
  HasDeoxidant?: string // 是否需要除氧剂，0-否 1-是
  HasDesiccant?: string // 是否需要干燥剂，0-否 1-是
  HasSample?: string //是否需要随货样品，0-否 1-是
  HasThermometer?: string // 是否需要TTUI温度计，0-否 1-是
  NodeRemark?: string // 备注
  SampleNumber?: string // 随货样品数量
  TableInfo?: { [key: string]: any } // 表格
  TemperatureRange?: string // 温度区间范围
  ThermometerNumber?: string // 温度计数量
  TransportTemperature?: string //运输温度
}
