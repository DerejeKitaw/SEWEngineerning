import { SEWEngineerningPage } from './app.po';

describe('sewengineerning App', () => {
  let page: SEWEngineerningPage;

  beforeEach(() => {
    page = new SEWEngineerningPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
