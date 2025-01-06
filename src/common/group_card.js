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
import CheckIcon from '../svgs/CheckMarkBlack.svg';
import deleteIcon from '../svgs/deleteIcon.png';
import { UserContext } from '../contexts/user_context';
import { USER_TYPE } from '../Enum/userType';

function GroupCard(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [buttonProps, setButtonProps] =
    useState({ is_member: props.is_member, type: props.type, deleted_at: props.deleted_at });
    const [memberCount, setMemberCount] = useState(props.member_count);
    const { setLoader } = useContext(LoaderContext);
    const { user } = useContext(UserContext);
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
            setButtonProps({
                is_member: true,
            });
            setMemberCount(memberCount + 1);
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
    }, [props.groupId, memberCount, setMemberCount, setLoader]);

    const button = (props) => {
        if (props.deleted_at) {
            return (
                <Label aria-label='deleted-group'>
                    <img width={30} src={deleteIcon} />Group is deleted
                </Label>);
        } else if (props.is_member && props.deleted_at === null) {
            return (
                <Label aria-label='already-a-member'>
                    <img src={CheckIcon} />Already a Member
                </Label>);
        } else {
            switch (props.type) {
                case 'public_closed':
                    return (
                        <StatusButton color='var(--black)'>
                            Group At Capacity
                        </StatusButton>);
                case 'public_open':
                    return (
                        <>
                            {user && user.type === USER_TYPE.STUDENT &&
                            <StatusButton aria-label='become-a-member-button' color='var(--blue)' onClick={handleOnClick}>Become A Member</StatusButton>}
                            <Modal size='tiny' open={isOpen} onClose={() => setIsOpen(false)}>
                                <ModalContent aria-label='become-a-member-modal'>
                                    <CustomModalDescription>
                                        <p> Are you sure joining to this group?</p>
                                        <Button aria-label='cancel-modal-button' color='black' onClick={handleClose}>No</Button>
                                        <Button style={{ background: 'var(--blue)' }} aria-label='become-a-member-modal-button' onClick={joinGroup} positive>Become a Member</Button>
                                    </CustomModalDescription>
                                </ModalContent>
                            </Modal>
                        </>
                    );
                case 'private':
                    return (
                        <InvitationOnlyElement aria-label='invitation-only'>
                            <img src={LockIcon} />Invitation Only
                        </InvitationOnlyElement>);
                default:
                    break;
            }
        }
    };
    return (
        <Container aria-label='group-card'>
            <TopSection aria-label='group-top-section'>
                <RowContainer>
                    <Header deleted={props.deleted_at} type={props.type}>
                        {props.header}
                    </Header>
                    {button(buttonProps)}
                </RowContainer>

                <RowContainer>
                    <Flex>
                        {props.course && (
                            <Tag key={props.course}>
                                {`${props.course}`}
                            </Tag>)}
                    </Flex>
                </RowContainer>
                <RowContainer>
                    <Flex>
                        <SubFlex><Icon src={UsersIcon} /><IconText>{memberCount === 1 ? '1 Member' : `${memberCount} Members`}</IconText></SubFlex>
                        <SubFlex><Icon src={DateIcon} /><IconText>{props.date ? props.date.split('T')[0] : 'N/A'}</IconText></SubFlex>
                    </Flex>
                </RowContainer>

            </TopSection>
            <Text aria-label='group-description'>
                {props.text}
            </Text>
            {feedback.visible && (<Message aria-label='message' success={feedback.type === 'success'}
                error={feedback.type === 'error'}
                content={feedback.message} />)}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: var(--light-gray);
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
    opacity: ${props => props.type === 'private' || props.deleted ? 0.5 : 1};
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
    color: black;
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

const Label = styled.div`
    display: flex;
    gap: 10px;
    font-size: 16px;
    align-items: center;
    color: black;
`;

export default GroupCard;
