import { NgModule } from '@angular/core';
import {NgxsModule} from "@ngxs/store";
import {environment} from "../../environments/environment";
import {CoreState} from "./store/core.state";
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    NgxsModule.forRoot([CoreState]),
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class CoreModule {}
