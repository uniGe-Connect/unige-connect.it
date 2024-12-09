import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import GroupCard from '../src/common/group_card';
import Groups from '../src/pages/dashboard/groups';
import { LoaderContext } from '../src/contexts/loader_context';

jest.mock('../src/server/get_api_client', () => ({
  getApiClient: () => ({
    createGroup: jest.fn().mockResolvedValue({ data: { id: 90 } }),
    getGroups: jest.fn().mockResolvedValue({ data: [] }),
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
    renderWithLoaderContext(<GroupCard type="public_open" header="TestTitle" text="TestText" date="2024-11-25T" />);
    const becomeMemberButton = screen.getByLabelText(/become-a-member-button/i);
    fireEvent.click(becomeMemberButton);
    expect(screen.getByLabelText(/cancel-modal-button/i)).toBeInTheDocument();
    const cancelButton = screen.getByLabelText(/cancel-modal-button/i);
    fireEvent.click(cancelButton);
  });
  
  test('should show a successful message when the user clicks on "Become a member inside the modal"', () => {
    renderWithLoaderContext(<GroupCard type="public_open" header="TestTitle" text="TestText" date="2024-11-25T" />);
    const becomeMemberButton = screen.getByLabelText(/become-a-member-button/i);
    fireEvent.click(becomeMemberButton);
    expect(screen.getByLabelText(/cancel-modal-button/i)).toBeInTheDocument();
    const becomeMemberModalButton = screen.getByLabelText(/become-a-member-modal-button/i);
    fireEvent.click(becomeMemberModalButton);
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });
});
