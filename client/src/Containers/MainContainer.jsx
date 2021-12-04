import React from 'react';
import UploadBody from '../Components/UploadBody';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploaded: false,
    };

    this.onFileLoad = this.onFileLoad.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:3000/static/sampleImage.png', {
      mode: 'cors',
    }).then((image) => {
      this.setState({ image: image.url, fileUploaded: null });
    });
  }
  onFileLoad(e) {
    const fileTypes = {
      'image/jpeg': true,
      'image/png': true,
    };
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    if (!file) {
      this.setState({ image: 'Error' });
    } else if (fileTypes[file.type]) {
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        mode: 'cors',
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.filePath);
          let fileUploaded = true;
          if (!res.filePath) {
            fileUploaded = false;
            res.filePath =
              'http://localhost:3000/static/error-image-generic.png';
          }

          this.setState({ image: res.filePath, fileUploaded: fileUploaded });
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    }
  }

  render() {
    const { image, fileUploaded } = this.state;
    return (
      <div className='m-5 mb-3'>
        {/* <div className='container text-center'> */}
        <div
          className='card mx-auto'
          style={{
            width: '35rem',
            height: '37rem',
          }}
        >
          <UploadBody
            image={image}
            fileUploaded={fileUploaded}
            onFileLoad={this.onFileLoad}
          />
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default MainContainer;
