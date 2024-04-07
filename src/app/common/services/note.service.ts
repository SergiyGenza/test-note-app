import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notesArray: Array<any> = [];

  constructor() { }

  createNote(title: string | null | undefined, text: string | null | undefined) {
    this.notesArray = this.getAllNotes();
    if (title && text) {
      const note = {
        id: this.uniqueId(),
        title: title,
        text: text,
      };
      this.notesArray.push(note);
      localStorage.setItem('notes', JSON.stringify(this.notesArray));
    }
  }

  uniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };

  getAllNotes(): [] {
    const noteArray = localStorage.getItem('notes');
    if (noteArray) {
      return JSON.parse(noteArray);
    } else {
      return [];
    }
  }

  editNote() {

  }

  deleteNote(id: string) {
    this.notesArray = this.getAllNotes();
    this.notesArray = this.notesArray.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(this.notesArray));
    console.log();
  }

}
