import { styled } from 'styled-components';
import { colors } from '../styles';
import Icon from './Icon';

function FormItem({ children, icon, style={color: colors.main} }) {
    return (
        <Container>
            <Icon style={style}>{icon}</Icon>
            {children}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`
export default FormItem;