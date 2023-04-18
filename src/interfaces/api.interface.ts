export interface IApiResponse <T>{
  ok    : boolean;
  data  : T
  msg?  : string;
  error : string
}