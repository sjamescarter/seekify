import styled from 'styled-components';
import FormItem from './FormItem';
import { colors } from '../styles';

function Errors({ errors }) {
    return(
        <List>
            <Legend>Errors</Legend>
            {errors.map(err => 
                <FormItem 
                    key={err} 
                    icon='error' 
                    style={{color: colors.red}}
                >
                    <Item>{err}</Item>
                </FormItem>)
            }
        </List>
    )
}

const List = styled.fieldset`
    border: 2px solid ${colors.red};
    border-radius: 10px;
    background-color: #FBEEEF;
    font-weight: 600;
`
const Legend = styled.legend`
    color: ${colors.red};
`
const Item = styled.li`
    color: ${colors.red};
    list-style-type: none;
`
export default Errors;