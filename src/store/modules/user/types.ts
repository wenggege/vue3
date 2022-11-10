export interface UserState {
  token?: string;
  name?: string;
  avatar?: string;
  // like [ 'sys:user:add', 'sys:user:update' ]
  userInfo?: any;
}
