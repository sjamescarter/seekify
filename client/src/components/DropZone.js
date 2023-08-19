import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

function DropZone({ setState }) {
  const onDrop = useCallback(acceptedFiles => {
    setState(acceptedFiles[0])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {'image/*': []}})

  return (
    <Div {...getRootProps()} className={isDragActive ? 'active' : ""}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <P>Drop the files here ...</P> :
          <P>Drag 'n' drop an image here—or click to select file</P>
      }
    </Div>
  );
}

const Div = styled.div`
    background-color: #F1EDEE;
    border-radius: 10px;
    margin-bottom: 12px;
    text-align: center;
    width: 100%;
    &.active {
        border: 4px dashed #8AA29E;
    }
`
const P = styled.p`
    padding: 2em;
`
export default DropZone;