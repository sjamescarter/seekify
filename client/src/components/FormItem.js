import styled from 'styled-components';

function FormItem({ children, icon, style }) {
    return (
        <Container>
            <I className='material-symbols-rounded' style={style}>{icon}</I>
            {children}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`
const I = styled.i`
    color: #8AA29E;
    margin: 0 5px;
`
export { I };
export default FormItem;