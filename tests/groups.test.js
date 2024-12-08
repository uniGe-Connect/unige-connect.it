import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../src/pages/dashboard/dashboard';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../src/contexts/user_context';
import GroupCard from '../src/common/group_card';
import { Container } from 'semantic-ui-react';
import { LoaderContext } from '../src/contexts/loader_context';

// Mocking the API calls
jest.mock('../src/server/get_api_client', () => ({
  getApiClient: () => ({
    getGroups: jest.fn().mockResolvedValue({ data: [{}] }),
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
          <Dashboard />
        </UserContext.Provider>
      </BrowserRouter>
    </LoaderContext.Provider>
  )
}

describe('Groups', () => {

  test('Inspect that search bar is present', () => {
    render(
      <CommonNav />
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('Insert a mock card and expect it to be shown', async () => {
    render(
      <Container>
        <CommonNav />
        <GroupCard type="public_open" header="TestTitle" text="TestText" date="2024-11-25T" member_count="2"/>
      </Container>
    );

    await waitFor(() => {
      expect(screen.getByText("TestTitle")).toBeInTheDocument();
      expect(screen.getByText("TestText")).toBeInTheDocument();
      expect(screen.getByText("2024-11-25")).toBeInTheDocument();
      expect(screen.getByText("Become A Member")).toBeInTheDocument();
      expect(screen.getByText("2 Members")).toBeInTheDocument();
    });
  });

  test('Insert a mock card of a already joined group', async () => {
    render(
      <Container>
        <CommonNav />
        <GroupCard type="public_open" header="JoinedGroup" text="JoinedGroupText" date="2024-12-07T" is_member={true}/>
      </Container>
    );

    await waitFor(() => {
      expect(screen.getByText("JoinedGroup")).toBeInTheDocument();
      expect(screen.getByText("JoinedGroupText")).toBeInTheDocument();
      expect(screen.getByText("2024-12-07")).toBeInTheDocument();
      expect(screen.getByText("Already a Member")).toBeInTheDocument();
    });
  });


  test('Insert a mock card of a not joined group', async () => {
    render(
      <Container>
        <CommonNav />
        <GroupCard type="public_open" header="NotJoinedGroup" text="NotJoinedGroupText" date="2024-12-07T" is_member={false}/>
      </Container>
    );

    await waitFor(() => {
      expect(screen.getByText("NotJoinedGroup")).toBeInTheDocument();
      expect(screen.getByText("NotJoinedGroupText")).toBeInTheDocument();
      expect(screen.getByText("2024-12-07")).toBeInTheDocument();
      expect(screen.queryByText("Already a Member")).not.toBeInTheDocument();
    });
  });


  test('Assert that Dashboard section is present', async () => {
    render(
      <CommonNav />
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test('Assert that My Groups section is present', async () => {
    render(
      <CommonNav />
    );
    expect(screen.getByText("Groups")).toBeInTheDocument();
  });

  test('Assert that Notifications section is present', async () => {
    render(
      <CommonNav />
    );
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });
});
