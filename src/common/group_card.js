import styled from 'styled-components';
import UsersIcon from '../svgs/UsersIcon.svg';
import DateIcon from '../svgs/DateIcon.svg';
import LockIcon from '../svgs/lockIcon.svg';
import React, { useCallback, useState, useContext } from 'react';
import {
    ModalDescription,
    ModalContent,
    Button,
    Modal,
    Message
  } from 'semantic-ui-react';
import { getApiClient } from '../server/get_api_client';
import { LoaderContext } from '../contexts/loader_context';
import CheckIcon from '../svgs/checkIcon.svg';

function GroupCard(props) {
    const [isOpen, setIsOpen] = useState(false);
    const { setLoader } = useContext(LoaderContext);
    const [feedback, setFeedback] = useState({ visible: false, message: '', type: '' });
    const handleOnClick = useCallback(() => {
        setIsOpen(true);
      }, [setIsOpen]);
    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);
    const joinGroup = useCallback(async () => {
        setIsOpen(false);
        setLoader(true);
        setFeedback({ visible: false, message: '', type: '' });

        try {
            await getApiClient().joinGroup(props.groupId);
            setFeedback({
                visible: true,
                message: 'You have successfully joined the group!',
                type: 'success',
            });

            setTimeout(() => {
                setFeedback({ visible: false, message: '', type: '' });
            }, 3000);
        } catch (error) {
            setFeedback({
                visible: true,
                message: error?.response?.data?.detail || 'An error occurred while joining the group.',
                type: 'error',
            });

            setTimeout(() => {
                setFeedback({ visible: false, message: '', type: '' });
            }, 3000);
        } finally {
            setLoader(false);
        }
    }, [props.groupId, setLoader]);

    const button = (props) => {
            if (props.is_member) {
            return (
                <AlreadyAMemberElement>
                    <img src={CheckIcon} />Already a Member
                </AlreadyAMemberElement>);
        } else {
        switch (props.type) {
            case 'public_closed':
                return (
                <StatusButton color='var(--black)'>
                    Group At Capacity
                </StatusButton>);
            case 'public_open' :
                return (
                    <>
                        <StatusButton color='var(--blue)' onClick={handleOnClick}>Become A Member</StatusButton>
                        <Modal size='tiny' open={isOpen} onClose={() => setIsOpen(false)}>
                            <ModalContent>
                                <CustomModalDescription>
                                    <p> Are you sure joining to this group?</p>
                                    <Button color='black' onClick={handleClose}>No</Button>
                                    <Button color='var(--blue)' onClick={joinGroup} positive>Become a Member</Button>
                                </CustomModalDescription>
                            </ModalContent>
                        </Modal>
                    </>
                );
            case 'private' :
                return (
                    <InvitationOnlyElement>
                    <img src={LockIcon} />Invitation Only
                    </InvitationOnlyElement>);
            default:
                break;
          }
        }
    };

  return (
    <Container>
        <TopSection>
            <RowContainer>
                <Header type={props.type}>
                    {props.header}
                </Header>
                {button(props)}
            </RowContainer>

            <RowContainer>
            <Flex>
                <SubFlex><Icon src={UsersIcon} /><IconText>{props.member_count === 1 ? '1 Member' : `${props.member_count} Members`}</IconText></SubFlex>
                <SubFlex><Icon src={DateIcon} /><IconText>{props.date ? props.date.split('T')[0] : 'N/A'}</IconText></SubFlex>
            </Flex>
            </RowContainer>
        </TopSection>
        <Text>
            {props.text}
        </Text>
        <Flex>
        {props.tags > 0 && props.tags.map((tag) => {
           return (
            <Tag key={tag}>
            {`#${tag}`}
            </Tag>
            );
        })}
        </Flex>
        {feedback.visible && (<Message success={feedback.type === 'success'}
                    error={feedback.type === 'error'}
                    content={feedback.message} />)}
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #F4F4F4;
    padding: 1.5vh 1.3vw;

    @media screen and (max-width: 583px) {
        padding: 1.5vh 5vw;
    }

`;

const CustomModalDescription = styled(ModalDescription)`
    text-align:center;
`;

const Header = styled.div`
    color: var(--blue);
    opacity: ${props => props.type === 'private' ? 0.5 : 1};
    font-family: "Roboto Slab";
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 38px;
`;

const Text = styled.div`
    color: black;
    font-family: "Fira Sans";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px; /* 150% */
`;

const TopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5vw;
`;

const SubFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const Icon = styled.img`
`;

const IconText = styled.div`
    color: var(--light-blue);
    font-family: "Fira Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px; /* 192.857% */
`;

const Tag = styled.div`
`;

const RowContainer = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: horizontal;
    width: 100%;
    gap: 10px;

    @media screen and (max-width: 555px) {
        justify-content: center;
    }
`;

const StatusButton = styled(Button)`
    background : ${props => props.color} !important;
    color: white !important;
    white-space: nowrap;
    @media (max-width: 600px) {
        height: auto;
        font-size: 0.8rem;
    }
`;

const InvitationOnlyElement = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const AlreadyAMemberElement = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

export default GroupCard;
