import React from 'react';
import {render} from 'react-dom';
import Dropzone from 'react-dropzone';
import html2canvas from 'html2canvas';

var imageList = [];

class DropzoneGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      rowSize: 1
    }
    
    this.onDrop = this.onDrop.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  onDrop(acceptedFiles, rejectedFiles) {
    if(rejectedFiles.length > 0) {
      console.log('uploaded an invalid file');
      return ;
    }
    
    let count = 0;
    
    imageList = [];
    
    acceptedFiles.forEach((file) => {
      this.renderImage(file, count++);
    });
    
    this.setState({list: imageList});
  }
  
  renderImage(file,key) {
    var reader = new FileReader();
  
    reader.onload = function(event) {
       imageList.push(<img src={event.target.result} id={key} key={key} title={file.name}/>);
       //do this some other way. is bad hack
       this.setState({list: imageList})
    }
    
    reader.onload = reader.onload.bind(this);
    
    reader.readAsDataURL(file);
  }
  
  renderCanvas() {
    html2canvas(document.getElementById('images'), {
      onrendered: function(canvas) {
        document.getElementById('spritesheet-wrapper').appendChild(canvas);
      }
    });
  }
  
  handleChange(event) {
    this.setState({rowSize: event.target.value});
  }

  render () {
    let imageWidth = 0;
    for(let i = 0; i < this.state.rowSize; i++) {
      if(document.getElementById(i) == null) break;
      imageWidth += document.getElementById(i).offsetWidth;
      console.log(imageWidth);
    }
    return (
        <div>
          <Dropzone className='drop-zone' onDrop={this.onDrop} accept='image/*'>
            <div className='drop-zone-text'>Try dropping some images here, or click to select files to upload.</div>
          </Dropzone>
          
          <button type="button" onClick={this.renderCanvas}>Generate Image Sheet</button>
          
          <span> Row Size: </span>
          
          <input type='text' onChange={this.handleChange} />
          
          <div className="image-list" id="images" style={{width: imageWidth}}>
            {this.state.list}
          </div>
          
          <div id="spritesheet-wrapper">
            <div className='spritesheet-header'> Generated Image Sheets: </div>
          </div>
        </div>
    );
  }
}



render(<DropzoneGallery/>, document.getElementById('app'));