import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllMachinesPage } from './all-machines.page';

const routes: Routes = [
  {
    path: '',
    component: AllMachinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllMachinesPageRoutingModule {}
