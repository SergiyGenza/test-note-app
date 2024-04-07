import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

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

  getNoteById(id: string) {
    this.notesArray = this.getAllNotes();
    return this.notesArray.find(note => note.id === id);
  }

  getAllNotes(): [] {
    const noteArray = localStorage.getItem('notes');
    if (noteArray) {
      return JSON.parse(noteArray);
    } else {
      return [];
    }
  }

  editNote(id: string, title: string | null | undefined, text: string | null | undefined) {
    this.notesArray = this.getAllNotes();
    const index = this.notesArray.findIndex(note => note.id === id);
    this.notesArray[index] = {
      id: id,
      title: title,
      text: text,
    }

    localStorage.setItem('notes', JSON.stringify(this.notesArray));

  }

  deleteNote(id: string) {
    this.notesArray = this.getAllNotes();

    this.notesArray = this.notesArray.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(this.notesArray));
    console.log();
  }

}
