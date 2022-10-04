import { render, screen } from '@testing-library/react';
import App from './App';
import fetchGlossary from './utils/fetchGlossary'

test('renders the landing page', async () => {
  render(<App/>);
  
  expect(screen.getByText("Glossary")).toBeDefined();
  expect(screen.getByText("Add new Term")).toBeDefined();

  const data = await fetchGlossary();

  console.log(data)
  expect(screen.getAllByText("Edit Term").length()).toBe(3);

});