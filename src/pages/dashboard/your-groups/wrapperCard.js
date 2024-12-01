import { Card, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

function WrapperCard(props) {
    const group = props.group;
    return (
        <NavLink to={`/group-overview/${group.id}`}>
        <Card key={group.id} fluid color='blue' style={{ marginBottom: '20px', background: '#F4F4F4' }}>
            <Card.Content>
                <a href='#' style={{ fontSize: '20px' }}>
                    <Card.Header><strong>{group.name}</strong>{group.type === 'private' && <Icon name='lock' style={{ padding: '10px' }} />}</Card.Header>
                </a>
                <Card.Meta>
                    <span>{group.topic}</span>
                </Card.Meta>
                <Card.Description style={{ wordWrap: 'break-word', }}>
                    {group.description.slice(0, 200)}{group.description.length > 300 ? '...' : ''}
                </Card.Description>
            </Card.Content>
        </Card>
        </NavLink>
    );
}

export default WrapperCard;
