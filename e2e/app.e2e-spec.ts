import { EpicFrontendPage } from './app.po';

describe('epic-frontend App', function() {
  let page: EpicFrontendPage;

  beforeEach(() => {
    page = new EpicFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ef works!');
  });
});
