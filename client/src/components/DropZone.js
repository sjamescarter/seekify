import { useCallback } from 'react'
import {useDropzone} from 'react-dropzone'

function DropZone({ setState }) {
  const onDrop = useCallback(acceptedFiles => {
    setState(acceptedFiles[0])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {'image/*': []}})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
}

export default DropZone;