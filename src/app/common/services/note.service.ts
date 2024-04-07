import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesSubject = new BehaviorSubject<Note[]>(this.getAllNotes());
  public notes$ = this.notesSubject.asObservable();
  private notesArray: Note[];

  constructor(
    private _snackBar: MatSnackBar,
  ) {
    this.notesArray = this.getAllNotes();
  }

  public createNote(title: string, text: string): void {
    if (title && text) {
      const note = {
        id: this.uniqueId(),
        title: title,
        text: text,
      };
      this.notesArray.push(note);
      this.updateNotes();
    }
  }

  public editNote(id: string, title: string, text: string): void {
    const index = this.notesArray.findIndex(note => note.id === id);
    if (index !== -1) {
      this.notesArray[index] = {
        id: id,
        title: title,
        text: text,
      }
      this.updateNotes();
      this.openSnackBar('Note edited!', 'Ok');
    }
  }

  public deleteNote(id: string): void {
    this.notesArray = this.notesArray.filter(note => note.id !== id);
    this.updateNotes();
    this.openSnackBar('Note removed!', 'Ok');
  }

  public getNoteById(id: string): Note {
    const note = this.notesArray.find(note => note.id === id);
    return note ? note : {} as Note;
  }

  private getAllNotes(): Note[] {
    const noteArray = localStorage.getItem('notes');
    return noteArray ? JSON.parse(noteArray) : [];
  }

  private updateNotes(): void {
    localStorage.setItem('notes', JSON.stringify(this.notesArray));
    this.notesSubject.next(this.notesArray);
    this.openSnackBar('Note updated!', 'Ok');
  }

  private uniqueId(): string {
    const dateString = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2);
    return dateString + random;
  };

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
