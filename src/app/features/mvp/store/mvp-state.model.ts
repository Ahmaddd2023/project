export interface MvpStateModel {
  status: boolean
}

export interface CreateCustomerResponse {
  status: boolean;
  customer_id: string;
  token: string;
  error: string;
}
