import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMachinePage } from './add-machine.page';

const routes: Routes = [
  {
    path: '',
    component: AddMachinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMachinePageRoutingModule {}
