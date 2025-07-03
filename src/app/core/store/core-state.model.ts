export interface CoreStateModel {
  categories: Array<any>;
  customerId: string;
  customerToken: string;

  address: string;
  telephone: string;
  mobile: string;
}

export interface VerifyEmailResponse {
  hash: string;
  status: boolean;
  error: string;
}

export interface RegisterEmailResponse {
  status: boolean;
  error: string;
}

export interface GetPersonalDataResponse {
  status: boolean;
  person: {
    attributes: {
      address: string;
      telephone: string;
      mobile: string;
    };
  };
}

export interface UpdatePersonalDataRequest {
  attributes: {
    address: string;
    telephone: string;
    mobile: string;
  };
}
