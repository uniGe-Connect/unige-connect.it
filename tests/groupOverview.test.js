import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../src/contexts/user_context';
import GroupOverview from '../src/pages/group-overview/groupOverview';
import { LoaderContext } from '../src/contexts/loader_context';

// Mocking the API calls
jest.mock('../src/server/get_api_client', () => ({
  getApiClient: () => ({
    getGroups: jest.fn().mockResolvedValue({ data: [] }),
    getGroupInfo: jest.fn().mockResolvedValue({ data: [] }),
  }),
  makeStandardApiErrorHandler: jest.fn(),
}));

jest.mock('../src/permissions/RequireUserAccess', () => (Component) => (props) => <Component {...props} />);

function CommonNav() {
  const mockSetLoader = jest.fn();

  return (
    <LoaderContext.Provider value={{ setLoader: mockSetLoader }}>
      <BrowserRouter>
        <UserContext.Provider value={{ user: { name: 'John Doe' } }}>
          <GroupOverview />
        </UserContext.Provider>
      </BrowserRouter>
    </LoaderContext.Provider>
  );
}

describe('GroupOverview', () => {

  test('Assert that Dashboard title is present', async () => {
    render(<CommonNav />);
    await waitFor(() => {
      expect(screen.getByText("Dashboard >")).toBeInTheDocument();
    });
  });

  test('Assert that Message Board section is present', async () => {
    render(<CommonNav />);
    await waitFor(() => {
      expect(screen.getAllByText("Message Board")[0]).toBeInTheDocument();
    });
  });

  test('Assert that Members section is present', async () => {
    render(<CommonNav />);
    await waitFor(() => {
      expect(screen.getByText("Members")).toBeInTheDocument();
    });
  });

  test('Assert that Settings section is present', async () => {
    render(<CommonNav />);
    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });
});
