import React from 'react';
import {render} from 'react-dom';
import Dropzone from 'react-dropzone';


var imageList = [];

class DropzoneGallery extends React.Component {
  
  constructor() {
    super();
    this.state = {
      list: []
    }
    
    this.onDrop = this.onDrop.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }
  
  onDrop(acceptedFiles, rejectedFiles) {
    if(rejectedFiles.length > 0) {
      console.log('uploaded an invalid file');
      return ;
    }
    imageList = [];
    
    acceptedFiles.forEach((file) => {
      this.renderImage(file);
    });
    
    this.setState({list: imageList});
  }
  
  renderImage(file) {
    var reader = new FileReader();
  
    reader.onload = function(event) {
       imageList.push(<img src={event.target.result}/>);
       
       //do this some other way. is bad hack
       this.setState({list: imageList})
    }
    
    reader.onload = reader.onload.bind(this);
    
    reader.readAsDataURL(file);
  }

  render () {
    return (
        <div>
          <Dropzone className='drop-zone' onDrop={this.onDrop} accept='image/*'>
            <div className='drop-zone-text'>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          
          <div>
            {this.state.list}
          </div>
        </div>
    );
  }
}


render(<DropzoneGallery/>, document.getElementById('app'));