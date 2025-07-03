export class UploadImage {
  static readonly type = '[Mvp] Upload image';
  constructor(public files: FormData[]) {}
}
export class ContactUs {
  static readonly type = '[Mvp] ContactUs';
  constructor(public name: string, public email: string, public message: string) {}
}

export class ChangeMessageStatus {
  static readonly type = '[Mvp] ChangeMessageStatus';
  constructor() {}
}

