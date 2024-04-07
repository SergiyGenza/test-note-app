import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';
import { Data } from '../data';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesSubject = new BehaviorSubject<Note[]>(this.getAllNotes());
  public notes$ = this.notesSubject.asObservable();

  private notesArray: Note[];

  constructor() {
    this.notesArray = this.getAllNotes();
    // localStorage.setItem('notes', JSON.stringify(Data))
  }

  public createNote(title: string, text: string) {
    if (title && text) {
      const note = {
        id: this.uniqueId(),
        title: title,
        text: text,
      };
      this.notesArray.push(note);
      this.updateNotes();
      console.log('create');

    }
  }

  public editNote(id: string, title: string, text: string) {
    const index = this.notesArray.findIndex(note => note.id === id);
    if (index !== -1) {
      this.notesArray[index] = {
        id: id,
        title: title,
        text: text,
      }
      this.updateNotes();
      console.log('edit');
    }
  }

  public deleteNote(id: string) {
    this.notesArray = this.notesArray.filter(note => note.id !== id);
    this.updateNotes();
  }

  public getNoteById(id: string): Note {
    const note = this.notesArray.find(note => note.id === id);
    return note ? note : {} as Note;
  }

  private getAllNotes(): Note[] {
    const noteArray = localStorage.getItem('notes');
    return noteArray ? JSON.parse(noteArray) : [];
  }

  private updateNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notesArray));
    this.notesSubject.next(this.notesArray);
  }

  private uniqueId(): string {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };
}
