export interface IUser {
  id: string,
  email: string,
  password: string,
  recheckPassword?: string,
  name: string,
  dept?: string,
  deptCode?: string,
  rank?: string,
  rankCode?: string,
  phoneNumber: string,
}

export interface IUserRow {
  id: string,
  email: string,
  phoneNumber: string,
  name: string,
  dept?: string,
  deptCode: string,
  rank?: string,
  rankCode: string,
}

export interface IUserListParams {
  keyword: string,
  deptCode?: string,
  rankCode?: string,
  currentPage: number,
  pageLimit: number,
}