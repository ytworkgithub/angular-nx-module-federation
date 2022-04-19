import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'remote/Header';

const routes: Routes = [
  {
    path: 'home',
    component: HeaderComponent,
  },
  {
    path: 'asd-module-static',
    loadChildren: () => import('remote/AsdModule').then((m) => m.AsdModule),
  },
  {
    path: 'asd-module-dynamic',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        type: 'module',
        exposedModule: './AsdModule',
      }).then((m) => m.AsdModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
