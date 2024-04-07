import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/common/services/note.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public url: string;
  public notesList: Array<any>;
  public notesForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  })

  constructor(
    private router: Router,
    private noteService: NoteService,
  ) {
    this.notesList = this.noteService.getAllNotes();
    this.url = this.router.url
  }

  ngOnInit(): void { }

  public checkForErrorsIn(): string {
    if (this.notesForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.notesForm.hasError('email') ? 'Not a valid email' : '';
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }

  public onSubmit(): void {
    const { title, text } = this.notesForm.value;
    this.noteService.createNote(title, text);
  }

}
