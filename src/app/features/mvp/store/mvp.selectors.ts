import {Selector} from "@ngxs/store";
import {MvpState} from "./mvp.state";
import {MvpStateModel} from "./mvp-state.model";


export class MvpSelectors {
  @Selector([MvpState])
  static messageStatus(state: MvpStateModel): boolean {
    return state.status;
  }

}
