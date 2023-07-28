import styled from 'styled-components';

function Errors({ errors }) {
    console.log(errors)
    return(
        <List>
            {errors.map(err => <Item key={err}>{err}</Item>)}
        </List>
    )
}

const List = styled.ul`
`
const Item = styled.li`
    color: #DB5461
`
export default Errors;