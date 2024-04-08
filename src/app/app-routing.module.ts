import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/authorization/authorization.module').then((m) => m.AuthorizationModule),
  },
  {
    path: 'board',
    loadChildren: () => import('./modules/board/board.module').then((m) => m.BoardModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'board',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
