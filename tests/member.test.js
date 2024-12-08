import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Groups from '../src/pages/dashboard/groups';
import { LoaderContext } from '../src/contexts/loader_context';

jest.mock('../src/server/get_api_client', () => ({
  getApiClient: () => ({
    createGroup: jest.fn().mockResolvedValue({ data: { id: 90 } }),
    getGroups: jest.fn().mockResolvedValue({ data: [{
        "id": "0e8a96ea-33ec-4ed5-8b64-a44a54075642",
        "name": "Olivia Carlson",
        "topic": "goal",
        "description": "Majority back share focus seven board without difficult ever sit officer spring theory less result best wide there hundred play free piece describe collection authority notice base red foot father around eye thousand stop.",
        "type": "public_open",
        "member_count": 1,
        "created_at": "2024-12-08T21:57:47"
    },] }),
  }),
  makeStandardApiErrorHandler: jest.fn(),
}));

jest.mock('../src/permissions/RequireUserAccess', () => (Component) => (props) => <Component {...props} />);

jest.mock('../src/permissions/RequireUserAccess', () => (Component) => (props) => <Component {...props} />);

describe('Groups', () => {
  const mockSetLoader = jest.fn();

  const renderWithLoaderContext = (ui) => {
    return render(
      <LoaderContext.Provider value={{ setLoader: mockSetLoader }}>
        <BrowserRouter>{ui}</BrowserRouter>
      </LoaderContext.Provider>
    );
  };


  test('should show modal when "Become a group" button is clicked', () => {
    renderWithLoaderContext(<Groups />);
    const becomeMemberButton = screen.getByLabelText(/become-a-member-button/i);
    fireEvent.click(becomeMemberButton);
    expect(screen.getByLabelText(/become-a-member-modal/i)).toBeInTheDocument();
  });


//   test('should create a new group and display a card', async () => {
//     renderWithLoaderContext(<GroupsPage />);
//     const createGroupButton = screen.getByLabelText(/create-group-button/i);
//     fireEvent.click(createGroupButton);
//     expect(screen.getByPlaceholderText(/group name/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/topic/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();

//     expect(screen.getByPlaceholderText(/group name/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/topic/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();

//     fireEvent.change(screen.getByPlaceholderText(/group name/i), { target: { value: 'New Group' } });
//     fireEvent.change(screen.getByPlaceholderText(/topic/i), { target: { value: 'JavaScript' } });
//     fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'A group for JS lovers' } });

//     const createGroupButtonModal = screen.getByLabelText(/create-group-button-modal/i);
//     fireEvent.click(createGroupButtonModal);

//     await waitFor(() => {
//       expect(screen.getByText('New Group')).toBeInTheDocument();
//       expect(screen.getByText('A group for JS lovers')).toBeInTheDocument();
//     });
//   });
});
