export interface OptionsState {
  options: OptionsItem
  sapOptions: any
}
interface OptionsItem {
  WrapperType: itemType[]
  WrapperInName: itemType[]
  WrapperOutName: itemType[]
  WrapperTier: itemType[]
  SealType: itemType[]
  PlacementLocation: itemType[]
  ShapeType: itemType[], // 外形状态
  InPackWay: itemType[], // 内包袋包装方式
  InSealWay: itemType[], // 内包材封口方式
  StorageRequirements: itemType[], // 贮存要求
  DesiccantType: itemType[], // 干燥剂类型
  DeoxidantType: itemType[], // 除氧剂类型  
  TruCoolWrapperType: itemType[], // 控温包材类型  
  PacketWay: itemType[], // 打托方式  
  PhotoWay: itemType[], // 拍照方式  
  ProductType: itemType[], // 产品类别  
  ProjectPhaseType: itemType[], // 商业化产品阶段  
}
interface itemType{
  id: string | number
  name: string
}