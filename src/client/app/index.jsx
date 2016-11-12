import React from 'react';
import {render} from 'react-dom';
import Dropzone from 'react-dropzone';
import html2canvas from 'html2canvas';


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
  
  renderCanvas() {
    html2canvas(document.getElementById('images'), {
    onrendered: function(canvas) {
      document.body.appendChild(canvas);
    }
    });
  }

  render () {
    return (
        <div>
          <Dropzone className='drop-zone' onDrop={this.onDrop} accept='image/*'>
            <div className='drop-zone-text'>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          
          <button type="button" onClick={this.renderCanvas}>Generate Spritesheet</button>
          
          <div className="image-list" id="images" style={{
            display: 'table'
          }}>
            {this.state.list}
          </div>
        </div>
    );
  }
}


render(<DropzoneGallery/>, document.getElementById('app'));