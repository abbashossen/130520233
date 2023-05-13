import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MachineDetailsPageRoutingModule } from './machine-details-routing.module';

import { MachineDetailsPage } from './machine-details.page';
import { SharedModule } from 'src/app/tktFrntAdminCommon/src/app/tktFrntCommon/src/app/shared.module';
//import { TemplateFormPage } from "../../tktFrntAdminCommon/src/app/tktFrntCommon/src/app/templates/template-form/template-form.page";

@NgModule({
    declarations: [MachineDetailsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MachineDetailsPageRoutingModule,
        SharedModule,
        
    ]
})
export class MachineDetailsPageModule {}
