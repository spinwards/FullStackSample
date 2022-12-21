import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  public isLoading: boolean = false;
  public notes: Note[] | undefined;

  constructor(private api: ApiService) {}

  private scratch?: Note;

  public editNote(ix: number, note: Note) {
    this.scratch = Object.assign({}, note) as Note;
    note.edit = true;
  }

  public cancelEdit(ix: number, note: Note) {
    if (this.scratch) {
      Object.assign(note, this.scratch);
    }
    note.edit = false;
  }

  public saveNote(ix: number, note: Note) {
    if (note.id) {
      this.api
        .updateNote(note)
        .then((note) => {
          if (this.notes) {
            this.notes[ix] = note;
          }
        })
        .finally(() => {
          note.edit = false;
        });

    } else {
      this.api
        .createNote(note)
        .then((note) => {
          if (note && this.notes) {
            this.notes[ix] = note;
          }
        })
        .finally(() => {
          note.edit = false;
        });
    }
  }

  public deleteNote(ix: number, note: Note) {
    if (note.id) {
      this.api.deleteNote(note.id).then(() => {
        this.notes?.splice(ix, 1);
      });
    }
  }

  public newNote() {
    this.api
      .createNote({ title: 'New Note', body: 'Noted' })
      .then((note) => {
        if (!this.notes) {
          this.notes = [];
        }
        if (note) {
          this.notes.push(note);
        }
      });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.api
      .getNotes()
      .then((notes) => {
        this.notes = notes;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
