import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import GroupsPage from '../src/pages/dashboard/my-groups/myGroups';
import { LoaderContext } from '../src/contexts/loader_context';

// Mock the API calls
jest.mock('../src/server/get_api_client', () => ({
  getApiClient: () => ({
    createGroup: jest.fn().mockResolvedValue({ data: { id: 90 } }),
    getOwnedGroups: jest.fn().mockResolvedValue({ data: [] }),
  }),
  makeStandardApiErrorHandler: jest.fn(),
}));

jest.mock('../src/permissions/RequireUserAccess', () => (Component) => (props) => <Component {...props} />);

describe('GroupsPage', () => {
  const mockSetLoader = jest.fn();
  const renderWithLoaderContext = (ui) => {
    return render(
      <LoaderContext.Provider value={{ setLoader: mockSetLoader }}>
        <BrowserRouter>{ui}</BrowserRouter>
      </LoaderContext.Provider>
    );
  };

  test('if there is no groups, "No groups available" is shown', () => {
    renderWithLoaderContext(<GroupsPage />);
    expect(screen.getByText('No groups available')).toBeInTheDocument();
  });

  test('should show modal when "Create Group" button is clicked', () => {
    renderWithLoaderContext(<GroupsPage />);
    const createGroupButton = screen.getByLabelText(/create-group-button/i);
    fireEvent.click(createGroupButton);
    expect(screen.getByLabelText(/create-group-button-modal/i)).toBeInTheDocument();
  });

  test('should close modal when cancel button is clicked', () => {
    renderWithLoaderContext(<GroupsPage />);
    const createGroupButton = screen.getByLabelText(/create-group-button/i);
    fireEvent.click(createGroupButton);
    expect(screen.getByLabelText(/cancel-group-button-modal/i)).toBeInTheDocument();
    const cancelButton = screen.getByLabelText(/cancel-group-button-modal/i);
    fireEvent.click(cancelButton);
    expect(screen.queryByLabelText(/create-group-button-modal/i)).not.toBeInTheDocument(); //queryByLabelText returns null if the element is not found (getByLabelText would throw an error)
  });

  test('should create a new group and display a card', async () => {
    renderWithLoaderContext(<GroupsPage />);
    const createGroupButton = screen.getByLabelText(/create-group-button/i);
    fireEvent.click(createGroupButton);
    expect(screen.getByPlaceholderText(/group name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/topic/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/group name/i), { target: { value: 'New Group' } });
    fireEvent.change(screen.getByPlaceholderText(/topic/i), { target: { value: 'JavaScript' } });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'A group for JS lovers' } });

    const createGroupButtonModal = screen.getByLabelText(/create-group-button-modal/i);
    fireEvent.click(createGroupButtonModal);

    await waitFor(() => {
      expect(screen.getByText('New Group')).toBeInTheDocument();
      expect(screen.getByText('A group for JS lovers')).toBeInTheDocument();
      expect(screen.getByText('1 Member')).toBeInTheDocument();
    });
  });
});
