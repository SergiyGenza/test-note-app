import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from 'src/app/common/models/note.model';
import { NoteService } from 'src/app/common/services/note.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent {
  public notesList$: Observable<Note[]>;

  constructor(
    private router: Router,
    private noteService: NoteService,
  ) {
    this.notesList$ = this.noteService.notes$;
  }

  public editNote(id: string): void {
    this.router.navigate([`board/edit/:${id}`]);
  }

  public deleteNote(id: string): void {
    this.noteService.deleteNote(id);
  }
}
