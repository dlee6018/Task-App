import React from 'react'
import { NavLink } from 'react-router-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FileUpload from '../components/FileUpload'
import FileUploadHeader from '../components/FileUploadHeader'

const FileUploadPage = () => {
    return (
        <BrowserRouter>
        <div className="container">
          <FileUploadHeader />
          <div className="main-content">
            <Switch>
              <Route component={FileUpload} path="/file" exact={true} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
}

export default FileUploadPage
