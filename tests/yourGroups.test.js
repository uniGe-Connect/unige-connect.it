import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GroupsPage from '../src/pages/groups/your-groups/yourGroups';
import '@testing-library/jest-dom/extend-expect';

// Mocking the API calls
jest.mock('../src/server/get_api_client', () => ({
  getApiClient: () => ({
    createGroup: jest.fn().mockResolvedValue({ data: { id: 4 } }),
    getOwnedGroups: jest.fn().mockResolvedValue({ data: [] }),
  }),
  makeStandardApiErrorHandler: jest.fn(),
}));

describe('GroupsPage', () => {
  test('should show modal when "Create Group" button is clicked', () => {
    render(<GroupsPage />);
    const createGroupButton = screen.getByRole('button', { name: /create group/i });
    fireEvent.click(createGroupButton);
    expect(screen.getByText(/create group/i)).toBeInTheDocument();
  });

  test('should close modal when cancel button is clicked', () => {
    render(<GroupsPage />);
    fireEvent.click(screen.getByRole('button', { name: /create group/i }));
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByText(/create group/i)).not.toBeInTheDocument();
  });

  test('should create a new group and display a card', async () => {
    render(<GroupsPage />);
    fireEvent.click(screen.getByRole('button', { name: /create group/i }));
    fireEvent.change(screen.getByPlaceholderText(/group name/i), { target: { value: 'New Group' } });
    fireEvent.change(screen.getByPlaceholderText(/topic/i), { target: { value: 'JavaScript' } });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'A group for JS lovers' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => {
      expect(screen.getByText('New Group')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('A group for JS lovers')).toBeInTheDocument();
    });
  });
});
