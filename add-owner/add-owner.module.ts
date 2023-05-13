import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOwnerPageRoutingModule } from './add-owner-routing.module';

import { AddOwnerPage } from './add-owner.page';

import { SharedModule } from "src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOwnerPageRoutingModule,
    SharedModule
  ],
  declarations: [AddOwnerPage]
})
export class AddOwnerPageModule {}
