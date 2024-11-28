import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../src/pages/dashboard/dashboard';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import OfflineNav from '../src/common/offlineNav';
import Nav from '../src/common/nav';
import { UserContext } from '../src/contexts/user_context';


// Mocking the API calls
// jest.mock('../src/server/get_api_client', () => ({
//   getApiClient: () => ({
//     createGroup: jest.fn().mockResolvedValue({ data: { id: 90 } }),
//     getOwnedGroups: jest.fn().mockResolvedValue({ data: [] }),
//   }),
//   makeStandardApiErrorHandler: jest.fn(),
// }));
jest.mock('../src/permissions/RequireUserAccess', () => (Component) => (props) => <Component {...props} />);

describe('Groups', () => {

  test('Inspect that search bar is present', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: { name: 'John Doe' } }}>
          <Dashboard />
        </UserContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});
