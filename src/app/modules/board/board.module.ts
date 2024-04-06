import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestComponent } from './test/test.component';
import { BoardRoutingModule } from './board.routing.module';



@NgModule({
  declarations: [
    BoardComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule
  ]
})
export class BoardModule { }
