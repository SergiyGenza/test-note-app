import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/common/services/note.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  key: string;
  note: any;
  id: string
  public notesForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private noteService: NoteService
  ) {
    this.key = this.activatedRoute.snapshot.paramMap.get('key') as string;
    this.id = this.key.slice(1);
    this.note = this.noteService.getNoteById(this.id);
    this.notesForm.controls['title'].setValue(this.note.title);
    this.notesForm.controls['text'].setValue(this.note.text);
  }

  public checkForErrorsIn(): string {
    if (this.notesForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.notesForm.hasError('email') ? 'Not a valid email' : '';
  }

  public onSubmit(): void {
    const { title, text } = this.notesForm.value;
    this.noteService.editNote(this.id, title, text);
  }
}
