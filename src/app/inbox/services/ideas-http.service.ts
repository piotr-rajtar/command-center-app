import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Idea } from '../typings';

@Injectable({
  providedIn: 'root',
})
export class IdeasHttpService {
  private httpClient = inject(HttpClient);

  createIdea(idea: string): Observable<Idea> {
    return this.httpClient
      .post<{ name: string }>(
        'https://angular-command-center-default-rtdb.europe-west1.firebasedatabase.app/ideas.json',
        JSON.stringify(idea),
      )
      .pipe(
        map(response => ({ id: response.name, content: idea }))
      );
  }

  deleteIdea(ideaId: string): Observable<{ ideaId: string }> {
    return this.httpClient.delete<{ ideaId: string }>(
      `https://angular-command-center-default-rtdb.europe-west1.firebasedatabase.app/ideas/${ideaId}.json`,
    )
  }

  readIdeas(): Observable<Idea[]> {
    return this.httpClient.get<Record<string, string>>(
      'https://angular-command-center-default-rtdb.europe-west1.firebasedatabase.app/ideas.json'
    ).pipe(
      map(response => Object.entries(response).map(([id, content]) => ({ id, content }))),
    );
  }

  updateIdea(idea: Idea): Observable<string> {
    return this.httpClient.put<string>(
      `https://angular-command-center-default-rtdb.europe-west1.firebasedatabase.app/ideas/${idea.id}.json`,
      JSON.stringify(idea.content),
    );
  }
}
