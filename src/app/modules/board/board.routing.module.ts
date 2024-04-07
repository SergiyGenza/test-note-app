import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';



const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
  },
  {
    path: 'form',
    component: BoardComponent,
  },
  {
    path: 'list',
    component: BoardComponent,
  },
  {
    path: 'edit',
    component: BoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule { }
