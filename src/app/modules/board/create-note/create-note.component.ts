import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/common/services/note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  key!: string | null;
  id!: string;

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
  ) { }

  public notesForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.prepareDataForEdit();
  }

  public checkForErrorsIn(): string {
    if (this.notesForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.notesForm.hasError('email') ? 'Not a valid email' : '';
  }

  public onSubmit(): void {
    const { title, text } = this.notesForm.value;
    if ((title && text)) {
      this.key
        ? this.noteService.editNote(this.id, title, text)
        : this.noteService.createNote(title, text);
    }
  }

  private prepareDataForEdit(): void {
    this.key = this.activatedRoute.snapshot.paramMap.get('key') as string;
    if (this.key) {
      this.id = this.key.slice(1);
      const note = this.noteService.getNoteById(this.id);
      this.notesForm.patchValue({
        title: note.title,
        text: note.text
      });
    }
  }
}
