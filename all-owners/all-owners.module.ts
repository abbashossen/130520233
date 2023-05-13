import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllOwnersPageRoutingModule } from './all-owners-routing.module';

import { AllOwnersPage } from './all-owners.page';
import { SharedModule } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllOwnersPageRoutingModule,
    SharedModule
  ],
  declarations: [AllOwnersPage]
})
export class AllOwnersPageModule {}
