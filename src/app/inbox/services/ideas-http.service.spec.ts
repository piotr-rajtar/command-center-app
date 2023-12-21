import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { Idea } from '../typings';

import { IdeasHttpService } from './ideas-http.service'

const API_URLS = {
  DELETE: 'https://angular-command-center-default-rtdb.europe-west1.firebasedatabase.app/ideas',
  POST: 'https://angular-command-center-default-rtdb.europe-west1.firebasedatabase.app/ideas.json',
  PUT: 'https://angular-command-center-default-rtdb.europe-west1.firebasedatabase.app/ideas',
  READ: 'https://angular-command-center-default-rtdb.europe-west1.firebasedatabase.app/ideas.json',
};

const TEST_IDEA: Idea = {
  id: '1',
  content: 'Test content',
}

describe('IdeasHttpService', () => {
  let ideasHttpService: IdeasHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IdeasHttpService,
      ],
    });

    ideasHttpService = TestBed.inject(IdeasHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create idea correctly', () => {
    ideasHttpService.createIdea(TEST_IDEA.content)
      .subscribe(idea => {
        expect(idea.id).toBe(TEST_IDEA.id)
        expect(idea.content).toBe(TEST_IDEA.content);
      });

    const req = httpTestingController.expectOne(API_URLS.POST);

    expect(req.request.method).toBe('POST');

    req.flush({ name: TEST_IDEA.id });
  });

  it('should delete idea correctly', () => {
    ideasHttpService.deleteIdea(TEST_IDEA.id)
      .subscribe(response => {
        expect(response).toBeNull();
      });

    const req = httpTestingController.expectOne(`${API_URLS.DELETE}/${TEST_IDEA.id}.json`);

    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });

  it('should read all ideas correctly', () => {
    ideasHttpService.readIdeas()
      .subscribe(ideas => {
        expect(ideas.length).toBe(1);
        expect(ideas[0].id).toBe(TEST_IDEA.id);
        expect(ideas[0].content).toBe(TEST_IDEA.content);
      });

    const req = httpTestingController.expectOne(API_URLS.READ);

    expect(req.request.method).toBe('GET');

    req.flush({ [TEST_IDEA.id]: TEST_IDEA.content });
  });

  it('should update idea correctly', () => {
    ideasHttpService.updateIdea(TEST_IDEA)
      .subscribe(response => {
        expect(response).toBe(TEST_IDEA.content)
      });

      const req = httpTestingController.expectOne(`${API_URLS.PUT}/${TEST_IDEA.id}.json`);

      expect(req.request.method).toBe('PUT');

      req.flush(TEST_IDEA.content);
  });
});
