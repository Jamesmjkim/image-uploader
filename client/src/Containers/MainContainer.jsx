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
      this.setState({ image: image.url });
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
          console.log(res.filePath);
          this.setState({ image: res.filePath, fileUploaded: true });
        });
    }
  }

  render() {
    const { image, fileUploaded } = this.state;
    return (
      <div className='position-absolute top-50 start-50 translate-middle'>
        <div className='container text-center'>
          <div
            className='card'
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
        </div>
      </div>
    );
  }
}

export default MainContainer;
