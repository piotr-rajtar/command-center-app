interface NavLink {
  id: string,
  content: string,
  routerLink: string,
  testId: string,
}

export const NAV_LINKS: NavLink[] = [
  {
    id: 'home-link-id',
    content: 'Home',
    routerLink: '/',
    testId: 'homeLink',
  },
  {
    id: 'inbox-link-id',
    content: 'Inbox',
    routerLink: '/inbox',
    testId: 'inboxLink',
  },
  {
    id: 'lists-link-id',
    content: 'Lists',
    routerLink: '/lists',
    testId: 'listsLink',
  }
];
