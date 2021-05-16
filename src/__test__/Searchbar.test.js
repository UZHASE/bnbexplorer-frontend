import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ testIdAttribute: 'id' });
// make actual Ids available as testIds


// test('renders header', () => {
//   render(<App />);
//   const linkElement = screen.getByText('BnB explorer');
//   expect(linkElement).toBeInTheDocument();
// });

//
// test('renders searchbar', () => {
//   render(<App />);
//   expect(screen.getByTestId('searchbar-component')).toBeInTheDocument();
// });
//
// test('renders filterbox', () => {
//   render(<App />);
//   expect(screen.getByTestId('filterbox-component')).toBeInTheDocument();
// });
