import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from './models/note';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http: HttpClient;
  private baseUrl: string;

  constructor(http: HttpClient) {
    this.http = http;
    this.baseUrl = environment.serviceUrl;
  }

  public getNotes(): Promise<Note[]> {
    return firstValueFrom(this.http.get<Note[]>(`${this.baseUrl}notes`));
  }

  public getNote(id: number): Promise<Note> {
    return firstValueFrom(this.http.get<Note>(`${this.baseUrl}notes/${id}`));
  }

  public createNote(note: Note): Promise<Note> {
    return firstValueFrom(this.http.post<Note>(`${this.baseUrl}notes`, note));
  }

  public updateNote(note: Note): Promise<Note> {
    return firstValueFrom(
      this.http.post<Note>(`${this.baseUrl}notes/${note.id}`, note)
    );
  }

  public async deleteNote(id: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.baseUrl}notes/${id}`));
  }
}
