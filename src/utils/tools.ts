// 数组对象去重
export function arrayObjectDistinc(value: Array<[]>) {
  return [...new Set(value.map((item: any) => JSON.stringify(item)))].map(
    (param: any) => JSON.parse(param)
  )
}

// 通过id查找Name
export function findName(id: string | undefined, arr: any) {
  if (id) {
    const newItem = arr.find((item) => {
      if (item.id === id) {
        return item
      }
    }) as any
    if (newItem) {
      return newItem.name
    } else {
      return id
    }
  } else {
    return ''
  }
}

//按钮防抖事件
export const debounce = (fn) => {
  const delay = 800
  let timer
  return (...args) => {
    const _args = args
    if (timer) {
      clearTimeout(timer)
    }
    const callNow = !timer
    timer = setTimeout(() => {
      timer = null
    }, delay)
    if (callNow) fn.apply(this, _args)
  }
}

// 用户信息转为树型组件数据类型
export const mapTree = (org: any) => {
  const haveChildren = Array.isArray(org.Children) && org.Children.length > 0
  return {
    value: org.DomainID ? org.DomainID : org.DeptNo,
    label: org.EmpName ? org.EmpName : org.DeptName,
    children: haveChildren ? org.Children.map((i: any) => mapTree(i)) : [],
    email: org.Email || ''
  }
}
