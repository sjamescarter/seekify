import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { colors } from '../styles';
import PublicEventCard from './PublicEventCard';
import Icon from './Icon';

function InviteCard({ invite }) {
    // Context
    const { user, setUser } = useContext(UserContext)
    const { id, message, pay, event, role, host, status } = invite
    const { rehearsal_time } = event

    // State
    const [expand, setExpand] = useState()

    // Handlers
    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/invites/${invite.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: e.target.id})
        })
        .then(r => r.json())
        .then(updatedInvite => {
            setUser({
                ...user, 
                invites: [
                    ...user.invites.map(i => 
                        i.id === id 
                            ? updatedInvite
                            : i 
                    )
                ]
            });
            setExpand();
        })
    }

    return (
        <>
            <div>
                <Banner 
                    style={{ 
                        backgroundColor: 
                            status === "pending" 
                                ? colors.secondary 
                                : status === "accepted" 
                                    ? colors.main 
                                    : colors.red
                    }} 
                >
                    <Icon>                    
                        { status === "pending" 
                        ? "pending" 
                        : status === "accepted" 
                        ? "check_circle" 
                        : "cancel"
                        }
                    </Icon>
                    {role} invite {status}
                </Banner>
                <PublicEventCard event={event} onClick={() => setExpand(!expand)}>
                    { pay ? <Icon title={`Paid Gig: $${pay}`}>paid</Icon> : <div></div> }
                    { expand 
                        ? <Container>
                            <Item>
                                <H4>HOST</H4>
                                <P>{host}</P>
                            </Item>
                            <Item>
                                <H4>ROLE</H4>
                                <P>{role}</P>
                            </Item>                           
                            <Item
                                style={{gridColumn: pay ? "" : "3 / span 4"}}
                            >
                                <H4>REHEARSAL</H4>
                                <P>{rehearsal_time ? rehearsal_time : "None"}</P>
                            </Item>
                            { pay 
                                ?<Item>
                                    <H4>PAY</H4>
                                    <P>${pay}</P>
                                </Item>
                                : <div></div>
                            }
                            <Item style={{gridColumn: "1 / span 4"}}>
                                <H4>MESSAGE</H4>
                                <P>{message}</P>
                            </Item>
                            <form 
                                id='accepted' 
                                style={{gridColumn: "1 / span 2"}} 
                                onSubmit={handleSubmit}
                            >
                                <Accept type="submit" value="Accept" />
                            </form>
                            <form 
                                id='declined' 
                                style={{gridColumn: "3 / span 4"}} 
                                onSubmit={handleSubmit}
                            >
                                <Decline type="submit" value="Decline" />
                            </form>
                        </Container>
                        : null
                    }
                </PublicEventCard>
            </div>
        </>
    );
}

// Styles
const Banner = styled.div`
    display: flex;
    // justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: 24px;
    color: white;
    margin: 0 16px;
    padding: 3px 16px;
    width: 80%;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`
const Container = styled.div`
    background-color: ${colors.nuetral};
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr .5fr;
    gap: 10px;
    margin: 2px 0 0 30px;
    margin-bottom: 15px;
    border-bottom-right-radius: 12px;
    padding: 20px;
`
const Item = styled.div`
    display: grid;
    grid-template-rows: 25px 1fr;
`
const H4 = styled.h4`
    color: ${colors.gray}
`
const P = styled.p`
    font-size: 1.2em;
`
const Submit = styled.input`
    width: 100%;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 12px 0;
    font: inherit;
    font-size: 1.3em;
    font-weight: 800;
    &:hover {
        cursor: pointer;
    }
`
const Accept = styled(Submit)`
    background-color: ${colors.main};
    &:hover {
        background-color: ${colors.mainHover};
    }
`
const Decline = styled(Submit)`
    background-color: ${colors.red};
    &:hover {
        background-color: ${colors.redHover};
    }
`
export default InviteCard;