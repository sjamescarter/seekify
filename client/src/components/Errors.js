import styled from 'styled-components';
import FormItem from './FormItem';

function Errors({ errors }) {
    return(
        <List>
            {errors.map(err => 
                <FormItem 
                    key={err} 
                    icon='error' 
                    style={{color: "#DB5461"}}
                >
                    <Item>{err}</Item>
                </FormItem>)
            }
        </List>
    )
}

const List = styled.ul`
`
const Item = styled.li`
    color: #DB5461;
    list-style-type: none;
`
export default Errors;