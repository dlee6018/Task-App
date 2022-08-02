import React,{useState, useEffect} from 'react'
import download from 'downloadjs'
import axios from 'axios'
import './fileStyles.scss'
import { useSelector, useDispatch} from 'react-redux'
import { Button } from 'react-bootstrap'
import { deleteFile } from '../actions/fileActions'

const FilesList = ({match}) => {
    

    const dispatch = useDispatch()

    const taskSubmit = useSelector((state) => state.taskSubmit)
    const {loading: loadingSubmit, success: successSubmit, error: errorSubmit} = taskSubmit

    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const [deleted, setDeleted] = useState(false);

    const taskDetails = useSelector((state) => state.taskDetails)
    const {task} = taskDetails

    const taskUpload = useSelector((state) => state.taskUpload)
    const {success: successUpload} = taskUpload

    const fileDelete = useSelector((state) => state.fileDelete)
    const {loading: loadingDelete, success: successDelete} = fileDelete

    useEffect(() => {
        const getFilesList = async () => {
          try {
            const { data } = await axios.get(`/api/file/${taskDetails.task._id}`);
            setErrorMsg('');
            setFilesList(data);
          } catch (error) {
            console.log('error')
            error.response && setErrorMsg(error.response.data);
          }
        };
    
        getFilesList();
      }, [successSubmit, successUpload, successDelete]);

      const downloadFile = async (id, path, mimetype) => {
        try {
            const result = await axios.get(`/api/file/download/${id}`, {
              responseType: 'blob'
            });
            const split = path.split('/');
            const filename = split[split.length - 1];
            setErrorMsg('');
            return download(result.data, filename, mimetype);
          } catch (error) {
            if (error.response && error.response.status === 400) {
              setErrorMsg('Error while downloading file. Try again later');
            }
          }
      }

    const deleteFileHandler = (id) => {
      dispatch(deleteFile(id))
    }
    return (
        <div className="files-container">
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <table className="files-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Download File</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filesList.length > 0 ? (
              filesList.map(
                ({ _id, title, description, file_path, file_mimetype }) => (
                  <tr key={_id}>
                    <td className="file-title">{title}</td>
                    <td className="file-description">{description}</td>
                    <td>
                      <a
                        href="#/"
                        onClick={() =>
                          downloadFile(_id, file_path, file_mimetype)
                        }
                      >
                        Download
                      </a>
                    </td>
                    <td><Button onClick = {() => deleteFileHandler(_id)}>Delete</Button></td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={3} style={{ fontWeight: '300' }}>
                  No files found. Please add some.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
}

export default FilesList
