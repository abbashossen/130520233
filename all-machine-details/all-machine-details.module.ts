import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllMachineDetailsPageRoutingModule } from './all-machine-details-routing.module';
import { SharedModule } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/shared.module';
import { AllMachineDetailsPage } from './all-machine-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllMachineDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [AllMachineDetailsPage]
})
export class AllMachineDetailsPageModule {}
