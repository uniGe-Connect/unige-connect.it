import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages/home/home';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../src/contexts/user_context';


// Mocking the API calls
jest.mock('../src/server/get_api_client', () => ({
  getApiClient: () => ({
    getGroupCount: jest.fn().mockResolvedValue({ data: 10 }),
  }),
  makeStandardApiErrorHandler: jest.fn(),
}));
jest.mock('../src/permissions/RequireUserAccess', () => (Component) => (props) => <Component {...props} />);
jest.mock('../src/pages/home/bottomPart', () => {
  return jest.fn(() => <div>Botton Part</div>);
});

describe('Home', () => {

  test('Assert that Home heading is present', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: { name: 'John Doe' } }}>
          <Home />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Connect, Collaborate, and grow.")).toBeInTheDocument();
    expect(screen.getByText(/Join a community/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Connect now/i })).toBeInTheDocument();
  });

  test('Assert that footer is present', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: { name: 'John Doe' } }}>
          <Home />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Università degli Studi di Genova")).toBeInTheDocument();
    expect(screen.getByText("Via Balbi 5, 16126 Genova")).toBeInTheDocument();
  });

});
