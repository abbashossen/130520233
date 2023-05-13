import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMachinesOwnerPage } from './list-machines-owner.page';

const routes: Routes = [
  {
    path: '',
    component: ListMachinesOwnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMachinesOwnerPageRoutingModule {}
