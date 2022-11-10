import request from '../request'
export const GetPackPlanInfo = (data: unknown) => {
  return request({
    url: `/api/PackPlan/GetPackPlanInfo`,
    method: 'GET',
    params: data,
    isLoading: true
  })
}

export const GetListHeader = (data: unknown) => {
  return request({
    url: `/GetListHeader`,
    method: 'get',
    data,
    isLoading: true,
    isMock: true
  })
}

// 获取包装计划节点列表
export const GetPackPlanNodeList = (data: unknown) => {
  return request({
    url: `/api/PackPlan/GetPackPlanNodeList`,
    method: 'get',
    params: data,
    isLoading: true
  })
}
// 获取节点信息
export const GetPackPlanNodeInfo = (data: unknown) => {
  return request({
    url: `/api/PackPlan/GetPackPlanNodeInfo`,
    method: 'get',
    params: data,
    isLoading: true
  })
}
// 保存节点信息（含完成）
export const SavePackPlanNodeInfo = (data: unknown) => {
  return request({
    url: `/api/PackPlan/SavePackPlanNodeInfo`,
    method: 'post',
    data,
    isLoading: true
  })
}

// 获取产品列表
export const GetPackPlanProductList = (data: unknown) => {
  return request({
    url: `/api/PackPlan/GetPackPlanProductList`,
    method: 'get',
    params: data,
    isLoading: true
  })
}
// 获取包装计划列表
export const GetPackPlanList = (data: unknown) => {
  return request({
    url: `/api/PackPlan/GetPackPlanList`,
    method: 'get',
    params: data,
    isLoading: true
  })
}

// 完成节点
export const CompletePackPlanNode = (data: unknown) => {
  return request({
    url: `/api/PackPlan/CompletePackPlanNode`,
    method: 'post',
    data,
    isLoading: true
  })
}
// 重启节点
export const RestartPackPlanNode = (data: unknown) => {
  return request({
    url: `/api/PackPlan/RestartPackPlanNode`,
    method: 'post',
    data,
    isLoading: true
  })
}

// 获取前置任务列表
export const GetPrefixNodeList = (data: unknown) => {
  return request({
    url: `/api/PackPlan/GetPrefixNodeList`,
    method: 'get',
    params: data,
    isLoading: true
  })
}

// 获取包装计划详情 /api/PackPlan/GetPackPlanDetail
export const GetPackPlanDetail = (data: unknown) => {
  return request({
    url: `/api/PackPlan/GetPackPlanDetail`,
    method: 'get',
    params: data,
    isLoading: true
  })
}
// 推送包装指令
export const PushPackPlan = (data: unknown) => {
  return request({
    url: `/api/PackPlan/PushPackPlan`,
    method: 'post',
    data,
    isLoading: true
  })
}
