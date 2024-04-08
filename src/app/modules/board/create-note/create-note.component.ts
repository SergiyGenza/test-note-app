import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/common/services/note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  private key!: string | null;
  private id!: string;

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  public notesForm = this.fb.group({
    title: '',
    text: '',
  });

  ngOnInit(): void {
    this.prepareDataForEdit();
  }

  public getControlName(name: string): FormControl<string> {
    const control = this.notesForm.get(name) as FormControl;
    name === 'text'
      ? control.addValidators([Validators.required, Validators.minLength(6)])
      : control.addValidators([Validators.required]);
    return control;
  }


  public onSubmit(): void {
    const { title, text } = this.notesForm.value;
    if (title && text) {
      if (this.id) {
        this.noteService.editNote(this.id, title, text);
      }
      else {
        this.clearForm();
        this.noteService.createNote(title, text);
      }
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

  private clearForm(): void {
    this.notesForm.reset();
    for (const key in this.notesForm.controls) {
      this.notesForm.get(key)?.clearValidators();
      this.notesForm.get(key)?.updateValueAndValidity();
    }
  }
}
