import { styled } from "styled-components";
import { colors } from "../styles";
import { camelToTitle } from "./utilities";
import DropZone from "./DropZone";
import FormItem from "./FormItem";

function ImgUploader({ id, img, setImg }) {
    return (
        <>
            <FormItem icon='image'>
                <Label htmlFor={id}>Upload {camelToTitle(id)}:</Label>
                { img 
                        ? <Div>
                            <p>{img.name}</p> 
                            <I 
                                className='material-symbols-rounded' 
                                onClick={() => setImg()}>
                                backspace
                            </I>
                        </Div> 
                        : null
                }
            </FormItem>
            {img ? null : <DropZone id={id} setState={setImg} />}
        </>
    )
}

const Label = styled.label`
    padding: 5px 10px;
    margin: 5px;
`
const Div = styled.div`
    align-items: center;
    display: flex;
`
const I = styled.i`
    color: ${colors.gray};
    padding: 5px;
    &:hover {
        cursor: pointer;
        color: ${colors.red};
    }
`
export default ImgUploader;