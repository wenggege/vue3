import { defineStore } from 'pinia'
import { OptionsState } from './types'
import { GetOptions, GetSAPMaterialList } from '@/api/packaging/common'

export const optionsStore = defineStore('option', {
  state: (): OptionsState => {
    return {
      options: {
        WrapperType: [], // 包材类别
        WrapperInName: [], // 包材名称_内包装
        WrapperOutName: [], // 包材名称_内包装
        WrapperTier: [], // 包材层数
        SealType: [], // 密封方式
        PlacementLocation: [], // 放置位置
        ShapeType: [], // 外形状态
        InPackWay: [], // 内包袋包装方式
        InSealWay: [], // 内包材封口方式
        StorageRequirements: [], // 贮存要求
        DesiccantType: [], // 干燥剂类型
        DeoxidantType: [], // 除氧剂类型  
        TruCoolWrapperType: [], // 控温包材类型  
        PacketWay: [], // 打托方式  
        PhotoWay: [], // 拍照方式  
        ProductType: [], // 产品类别  
        ProjectPhaseType: [], // 商业化产品阶段  
      },
      sapOptions: [], // 
    }
  },
  actions: {
    async getOptions(Codes) {
      const apiParams = {
        Type: 'PackPlan',
        Codes
      }
      try {
        const result:any = await GetOptions(apiParams)
        console.log('选项列表', result)
        result.Data.forEach((item: any) => {
          this.options[item.key] = item.options
          // 节点详情后端返回的数据是string，选项是number，需要统一
          this.options[item.key].forEach((i:any) => {
            i.id = i.id + ''
          })
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getSap(Name) {
      const apiParams = {
        page: 1,
        pageSize: 999,
        Name,
      }
      try {
        const result:any = await GetSAPMaterialList(apiParams)
        console.log('选项列表', result)
        this.sapOptions = result.Data
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    WrapperTypeArr: (state) => state.options.WrapperType,
    WrapperInNameArr: (state) => state.options.WrapperInName,
    WrapperOutNameArr: (state) => state.options.WrapperOutName,
    WrapperTierArr: (state) => state.options.WrapperTier,
    SealTypeArr: (state) => state.options.SealType,
    PlacementLocationArr: (state) => state.options.PlacementLocation,
    ShapeTypeArr: (state) => state.options.ShapeType,
    InPackWayArr: (state) => state.options.InPackWay,
    InSealWayArr: (state) => state.options.InSealWay,
    StorageRequirementsArr: (state) => state.options.StorageRequirements,
    DesiccantTypeArr: (state) => state.options.DesiccantType,
    DeoxidantTypeArr: (state) => state.options.DeoxidantType,
    TruCoolWrapperTypeArr: (state) => state.options.TruCoolWrapperType,
    PacketWayArr: (state) => state.options.PacketWay,
    PhotoWayArr: (state) => state.options.PhotoWay,
    ProductTypeArr: (state) => state.options.ProductType,
    ProjectPhaseTypeArr: (state) => state.options.ProjectPhaseType,
    sapOptionsArr: (state) => state.sapOptions
  }
})
