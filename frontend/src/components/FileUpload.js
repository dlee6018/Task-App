import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Col, Row, Button } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import './fileStyles.scss'
import { submitTask } from '../actions/taskActions'
import { TASK_SUBMIT_REQUEST, TASK_SUBMIT_SUCCESS, TASK_UPLOAD_RESET, TASK_UPLOAD_SUCCESS } from '../constants/taskConstants'

const FileUpload = ({history, match}) => {

  const taskSubmit = useSelector((state) => state.taskSubmit)
  const {loading: loadingSubmit, success: successSubmit, error: errorSubmit} = taskSubmit


  const taskDetails = useSelector((state) => state.taskDetails)
  const {task: task} = taskDetails

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin
  useEffect(() => {

  }, [successSubmit])
  const dispatch = useDispatch()
  
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile)

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result)
    }
    fileReader.readAsDataURL(uploadedFile)
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png|)$/))
    dropRef.current.style.border = '2px dashed #e9ebeb';
  }

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  }

//   const submitTaskHandler = () => {
//     dispatch(submitTask(match.params.id))
// }
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('user', userInfo._id)
          formData.append('description', description);

          setErrorMsg('');
          await axios.post(`/api/file/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          dispatch({type: TASK_UPLOAD_SUCCESS})
          dispatch({type: TASK_UPLOAD_RESET})
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }

  };
    return (
      <React.Fragment>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                value={state.title || ''}
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={state.description || ''}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
        <Button variant="primary" type="submit">
          Upload Files
        </Button>
      </Form>
    </React.Fragment>
    )
}

export default FileUpload
