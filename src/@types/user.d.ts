export interface IUser {
  id: int;
  logged?: boolean;
  login?: string;
  token: null | string;
  roles?: [];
  name: string;
  lastname: string;
}
