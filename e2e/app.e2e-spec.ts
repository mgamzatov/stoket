import { LocalMarketPage } from './app.po';

describe('local-market App', () => {
  let page: LocalMarketPage;

  beforeEach(() => {
    page = new LocalMarketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
