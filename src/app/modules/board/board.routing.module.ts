import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CreateNoteComponent } from './create-note/create-note.component';



const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
  },
  {
    path: 'add',
    component: CreateNoteComponent,
  },
  {
    path: 'list',
    component: CardsListComponent,
  },
  {
    path: 'edit/:key',
    component: CreateNoteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule { }
