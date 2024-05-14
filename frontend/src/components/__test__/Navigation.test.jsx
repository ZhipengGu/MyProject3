import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../Navigation';

describe('Navigation component', () => {
  it('renders navigation items correctly', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    
describe('Navigation component', () => {
    it('renders home navigation item', () => {
      render(<Navigation />);
      const homeNavItem = screen.getByText('Home');
      expect(homeNavItem).toBeInTheDocument();
    });
  
    it('renders map navigation item', () => {
      render(<Navigation />);
      const mapNavItem = screen.getByText('Map');
      expect(mapNavItem).toBeInTheDocument();
    });
  
    it('renders add navigation item', () => {
      render(<Navigation />);
      const addNavItem = screen.getByText('');
      expect(addNavItem).toBeInTheDocument();
    });
  
    it('renders search navigation item', () => {
      render(<Navigation />);
      const searchNavItem = screen.getByText('Search');
      expect(searchNavItem).toBeInTheDocument();
    });
  
    it('renders me navigation item', () => {
      render(<Navigation />);
      const meNavItem = screen.getByText('Me');
      expect(meNavItem).toBeInTheDocument();
    });
  });
  });
});
