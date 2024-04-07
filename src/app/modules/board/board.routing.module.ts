import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { TestComponent } from './test/test.component';



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
    component: TestComponent,
  },
  {
    path: 'edit/:key',
    component: TestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule { }
