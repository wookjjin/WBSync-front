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
