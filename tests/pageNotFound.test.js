import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../src/contexts/user_context';
import PageNotFound from '../src/pages/page-not-found/page_not_found';

function FixedPageNotFound() {
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user: { name: 'John Doe' } }}>
        <PageNotFound />
      </UserContext.Provider>
    </BrowserRouter>
  )
}

describe('PageNotFound', () => {

  test('Assert that 404 heading is present', async () => {
    render(
      <FixedPageNotFound />
    );
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("The page you’re looking for can’t be found.")).toBeInTheDocument();
  });

  test('Assert that link to Home is present', async () => {
    render(
      <FixedPageNotFound />
    );
    expect(screen.getByRole('link', { name: /Go To Home/i })).toBeInTheDocument();
  });

});
