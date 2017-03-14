import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

describe('App', () => {
  const component = renderComponent(App);

  it('has a class of "app"', () => {
    expect(component).to.have.class('app');
  });

  it('has 3 child divs', () => {
    expect(component.find('div')).to.have.lengthOf(3);
  });

  it('has the filter panel', () => {
    expect(component.find('div')).to.have.class('filter-panel');
  });

  it('has the grid panel', () => {
    expect(component.find('div')).to.have.class('grid-panel');
  });

  it('has the details', () => {
    expect(component.find('div')).to.have.class('details-panel');
  });
});
