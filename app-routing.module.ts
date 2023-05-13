import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },

  {
    path: "changepassword",
    loadChildren: () =>
      import("./pages/changepassword/changepassword.module").then(
        (m) => m.ChangepasswordPageModule
      ),
  },
  {
    path: "add-driver",
    loadChildren: () =>
      import("./pages/add-driver/add-driver.module").then(
        (m) => m.AddDriverPageModule
      ),
  },
  {
    path: "add-machine",
    loadChildren: () =>
      import("./pages/add-machine/add-machine.module").then(
        (m) => m.AddMachinePageModule
      ),
  },
  {
    path: "add-machine-driver",
    loadChildren: () =>
      import("./pages/add-machine-driver/add-machine-driver.module").then(
        (m) => m.AddMachineDriverPageModule
      ),
  },
  {
    path: "landing",
    loadChildren: () =>
      import("./pages/landing/landing.module").then((m) => m.LandingPageModule),
  },

  {
    path: "maintenance-list",
    loadChildren: () =>
      import("./pages/maintenance-list/maintenance-list.module").then(
        (m) => m.MaintenanceListPageModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./tktFrntAdminCommon/src/app/pages/login/login.module").then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: "add-company",
    loadChildren: () =>
      import(
        "./tktFrntAdminCommon/src/app/pages/add-company/add-company.module"
      ).then((m) => m.AddCompanyPageModule),
  },
  {
    path: "trip-cost",
    loadChildren: () =>
      import(
        "./tktFrntAdminCommon/src/app/tktFrntCommon/src/app/pages/trip-cost/trip-cost.module"
      ).then((m) => m.TripCostPageModule),
  },
  {
    path: "todays-reservation",
    loadChildren: () =>
      import(
        "./tktFrntAdminCommon/src/app/pages/todays-reservation/todays-reservation.module"
      ).then((m) => m.TodaysReservationPageModule),
  },
  {
    path: 'all-drivers',
    loadChildren: () => import('./pages/all-drivers/all-drivers.module').then( m => m.AllDriversPageModule)
  },
  {
    path: 'all-machines',
    loadChildren: () => import('./pages/all-machines/all-machines.module').then( m => m.AllMachinesPageModule)
  },
  {
    path: 'all-drivers-availability',
    loadChildren: () => import('./pages/all-drivers-availability/all-drivers-avaliability.module').then( m => m.AllDriversAvaliabilityPageModule)
  },
  {
    path: 'drivers-locations',
    loadChildren: () => import('./pages/drivers-locations/drivers-locations.module').then( m => m.DriversLocationsPageModule)
  },
  {
    path: 'add-owner',
    loadChildren: () => import('./pages/add-owner/add-owner.module').then( m => m.AddOwnerPageModule)
  },
  {
    path: 'all-owners',
    loadChildren: () => import('./pages/all-owners/all-owners.module').then( m => m.AllOwnersPageModule)
  },
  {
    path: 'machine-details',
    loadChildren: () => import('./pages/machine-details/machine-details.module').then( m => m.MachineDetailsPageModule)
  },
  {
    path: 'all-machine-details',
    loadChildren: () => import('./pages/all-machine-details/all-machine-details.module').then( m => m.AllMachineDetailsPageModule)
  },
  
  {
    path: 'list-machines-owner',
    loadChildren: () => import('./pages/list-machines-owner/list-machines-owner.module').then( m => m.ListMachinesOwnerPageModule)
  },

 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
