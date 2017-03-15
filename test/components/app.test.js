import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

describe('App', () => {
  const component = renderComponent(App);

  it('has a class of "app"', () => {
    expect(component).to.have.class('app');
  });

  it('has 2 child divs when first loaded', () => {
    expect(component.find('div')).to.have.lengthOf(2);
  });

  it('has the filter panel', () => {
    expect(component.find('div')).to.have.class('filter-panel');
  });

  it('has the grid panel', () => {
    expect(component.find('div')).to.have.class('grid-panel');
  });

});
