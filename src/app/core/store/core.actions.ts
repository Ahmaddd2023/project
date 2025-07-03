export class GetBotCategories {
  static readonly type = '[Core] Get Bot Categories';

  constructor() {}
}

export class CreateCustomer {
  static readonly type = '[Mvp] Create Customer';
  constructor(
    public login: string,
    public password: string,
    public name: string,
  ) {}
}

export class VerifyEmail {
  static readonly type = '[Core] Verify email';
  constructor(public hash: string) {}
}

export class RegisterEmail {
  static readonly type = '[Core] Register email';
  constructor(public email: string) {}
}

export class GetPersonalData {
  static readonly type = '[Core] Get personal data';
}

export class UpdatePersonalData {
  static readonly type = '[Core] Update personal data';
  constructor(
    public address: string,
    public telephone: string,
    public mobile: string,
  ) {}
}
