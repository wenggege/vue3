export type listDto = {
  Id: string
  Label: string
  Path: string
  Icon: string
  Children?: Array<menu>
}

export type menu = {
  path: string
  name: string
  meta: {
    icon?: string
    title?: string
  }
}

export type route = menu & {
  Children?: Array<menu>
}

export type personType = {
  PMDomainId: string
  PMEmail?: string
  PMName?: string
  Name?: string
  Domain?: string
}

export interface IResponseData<T> {
  Code: number
  Message?: string
  Data: T
  Count?: string | number
}

// teble表头
export type Columns = {
  IsFixed?: boolean | string
  IsShow?: boolean
  Label: string
  Link: string | null
  Prop: string
  Type: string
  NeedDeal?: boolean
  Width: number
}

export type RowHandlers = {
  Api?: string
  Query?: string
  Title: string
}

export interface HeaderInfo {
  Code: string
  Columns: Array<Columns>
  Id: string
  Name: string
  RowHandlers: Array<RowHandlers>
  Selection: boolean
}

// table最新表头
export interface ColumnsType {
  Id: number
  Name: string
  Label: string
  Link: string
  IsFixed: boolean
  IsRequired: boolean
  IsDrag: boolean
  Width: string | number
  IsHidden: boolean
  IsText: boolean
  Align: string
}