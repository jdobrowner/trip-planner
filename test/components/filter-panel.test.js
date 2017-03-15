import { renderComponent, expect } from '../test_helper';
import FilterPanel from '../../src/components/filter-panel';

describe('Filter Panel', () => {
  const component = renderComponent(FilterPanel);

  it('has a title', () => {
    expect(component.find('h2')).to.contain('Filter');
  });

  it('has a text input', () => {
    expect(component.find('input')).to.exist;
  });
});
