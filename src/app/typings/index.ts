export interface Card {
  id: string;
  description: string;
  img?: string;
  title: string;
  url: string;
}

export interface Idea {
  id: string;
  content: string;
}

export interface NavLink {
  id: string,
  content: string,
  routerLink: string,
  testId: string,
}
