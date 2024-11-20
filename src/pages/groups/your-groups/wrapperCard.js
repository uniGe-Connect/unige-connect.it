import { Card, Icon } from 'semantic-ui-react';

function WrapperCard(props) {
    const group = props.group;
    return (
        <Card key={group.id} fluid color='blue' style={{ marginBottom: '20px', background: '#F4F4F4' }}>
            <Card.Content>
                <a href='#' style={{ fontSize: '20px' }}>
                    <Card.Header><strong>{group.name}</strong>{group.type === 'private' && <Icon name='lock' style={{ padding: '10px' }} />}</Card.Header>
                </a>

                {/* This button is not visible if I am the owner of the group */}
                {/* <Button style={{ margin: '10px' }}
                primary
                floated='right'
                onClick={() => alert('Join me!')}>Join group</Button> */}
                <Card.Meta>
                    <span>{group.topic}</span>
                </Card.Meta>
                <Card.Description style={{ wordWrap: 'break-word', }}>
                    {group.description.slice(0, 200)}{group.description.length > 300 ? '...' : ''}
                </Card.Description>
            </Card.Content>
        </Card>
    );
}

export default WrapperCard;
