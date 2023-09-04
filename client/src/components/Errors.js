import styled from 'styled-components';
import FormItem from './FormItem';

function Errors({ errors }) {
    return(
        <List>
            <Legend>Errors</Legend>
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

const List = styled.fieldset`
    border: 2px solid #DB5461;
    border-radius: 10px;
    background-color: #FBEEEF;
    font-weight: 600;
`
const Legend = styled.legend`
    color: #DB5461;
`
const Item = styled.li`
    color: #DB5461;
    list-style-type: none;
`
export default Errors;