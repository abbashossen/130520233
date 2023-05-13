import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllOwnersPage } from './all-owners.page';

const routes: Routes = [
  {
    path: '',
    component: AllOwnersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllOwnersPageRoutingModule {}
