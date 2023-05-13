import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllMachineDetailsPage } from './all-machine-details.page';

const routes: Routes = [
  {
    path: '',
    component: AllMachineDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllMachineDetailsPageRoutingModule {}
