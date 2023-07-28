import { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'

function DropZone() {
  const [form, setForm] = useState({})
  console.log(form)
  const onDrop = useCallback(acceptedFiles => {
    setForm({...form, logo: acceptedFiles[0]})
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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