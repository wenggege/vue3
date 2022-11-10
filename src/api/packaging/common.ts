import request from '../request'
export const GetToken = (data: unknown) => {
  return request({
    url: `/api/Auth/GetToken`,
    method: 'post',
    data,
    isLoading: true,
  })
}

// 获取树型组织架构
export const GetTreeUserInfo = () => {
  return request({
    url: `/api/UserInfo/GetTreeUserInfo`,
    method: 'GET',
  })
}
// 获取所有人员
export const GetUserAll = (data) => {
  return request({
    url: `/api/UserInfo/GetUserAll`,
    method: 'post',
    data
  })
}
// 附件保存
export const UpdateTaskFileState = (data: unknown) => {
  return request({
    url: `/api/Task/UpdateTaskFileState`,
    method: 'POST',
    data,
    isLoading: true
  })
}
// 根据taskGUID 获取所有附件列表信息
export const GetAllFile = (data: unknown) => {
  return request({
    url: `/api/Files/GetFileAll`,
    method: 'GET',
    params: data,
  })
}

// 附件上传
export const UploadFile = (data: unknown) => {
  return request({
    url: `/api/Files/UploadFiles`,
    method: 'POST',
    data,
    isLoading: true,
  })
}
// 删除附件
export const DeleteFile = (data: unknown) => {
  return request({
    url: `/api/Files/DeleteFile`,
    method: 'get',
    params:data
  })
}
// 获取日志
export const GetLogAll = (data: unknown) => {
  return request({
    url: `/api/Logs/GetLogAll`,
    method: 'GET',
    params: data
  })
}

// 获取选项
export const GetOptions = (data: unknown) => {
  return request({
    url: `/api/Options/GetOptions`,
    method: 'GET',
    params: data
  })
}
// 获取SAP物料信息
export const GetSAPMaterialList = (data: unknown) => {
  return request({
    url: `/api/SAP/GetSAPMaterialList`,
    method: 'get',
    params: data,
    isLoading: true
  })
}

// 获取表格配置
export const GetTableConfig = (data: unknown) => {
  return request({
    url: `/ConfigPageLayout/GetListLayout`,
    method: 'GET',
    params: data,
    isConfig: true
  })
}
