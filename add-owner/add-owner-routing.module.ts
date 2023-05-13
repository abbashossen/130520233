import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOwnerPage } from './add-owner.page';

const routes: Routes = [
  {
    path: '',
    component: AddOwnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOwnerPageRoutingModule {}
