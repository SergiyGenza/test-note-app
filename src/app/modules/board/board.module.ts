import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardRoutingModule } from './board.routing.module';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CreateNoteComponent } from './create-note/create-note.component';



@NgModule({
  declarations: [
    BoardComponent,
    CardsListComponent,
    CreateNoteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BoardRoutingModule,
  ]
})
export class BoardModule { }
