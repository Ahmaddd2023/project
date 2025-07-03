import {Injectable} from '@angular/core';
import {Capacitor} from "@capacitor/core";
import { Clipboard } from '@capacitor/clipboard';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class CrossPlatformServiceService {
  constructor() {
  }
  get getPlatform():string{
    return Capacitor.getPlatform()
  }
    copyMessageToClipboard(id: string):void {
    if (this.getPlatform === 'web'){
      this.copyMessageWeb(id);
    }else{
      this.copyMessageApps(id)
    }

  }

  private copyMessageWeb(id: string) {

  }
  private  copyMessageApps(id: string) {

  }
}
