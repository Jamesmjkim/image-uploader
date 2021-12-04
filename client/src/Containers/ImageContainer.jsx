import React from 'react';
import UploadedFilesBody from '../Components/UploadedFilesBody';

class ImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trashIcon: 'http://localhost:3000/static/trash-icon.png',
    };
    this.fileDelete = this.fileDelete.bind(this);
    this.updateFilesList = this.updateFilesList.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/upload', {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((imageFiles) => {
        if (!imageFiles.length) return;
        imageFiles.map((el) => {
          return (el.filePath = 'http://localhost:3000/static/' + el.filePath);
        });
        this.setState({ imageData: imageFiles });
        // console.log('this is current state', this.state.imageData);
      });
  }

  fileDelete(e) {
    const fileName = e.target.getAttribute('value');
    const formData = new FormData();
    formData.append('fileName', fileName);

    fetch('http://localhost:3000/upload', {
      method: 'DELETE',
      mode: 'cors',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('The Picture has been deleted', res);
        const currState = this.state;
        for (let i = 0; i < currState.imageData.length; i++) {
          console.log(currState.imageData[i].fileName);
          if (currState.imageData[i].fileName === fileName) {
            currState.imageData.splice(i, 1);
          }
        }

        this.setState({ ...currState });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  updateFilesList(e) {
    fetch('http://localhost:3000/upload', {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((imageFiles) => {
        if (!imageFiles.length) return;
        imageFiles.map((el) => {
          return (el.filePath = 'http://localhost:3000/static/' + el.filePath);
        });
        this.setState({ imageData: imageFiles });
      });
  }

  render() {
    const { imageData, trashIcon } = this.state;
    const UploadedFilesBodies = [];
    // console.log(imageData);
    if (imageData) {
      if (imageData.length > 0) {
        imageData.forEach((photo, i) => {
          // console.log(photo.dateUploaded.slice(0, 10));
          UploadedFilesBodies.push(
            <UploadedFilesBody
              imagePath={photo.filePath}
              imageName={photo.fileName}
              uploadDate={photo.dateUploaded.slice(0, 10)}
              trashIcon={trashIcon}
              fileDelete={this.fileDelete}
              noPhotos={false}
              key={i}
            />
          );
          // console.log(photo.dateUploaded);
        });
      } else {
        UploadedFilesBodies.push(<UploadedFilesBody noPhotos={true} key={0} />);
      }
    } else {
      UploadedFilesBodies.push(<UploadedFilesBody noPhotos={true} key={0} />);
    }

    return (
      <div className='m-3'>
        <div
          className='card mx-auto'
          style={{
            width: '35rem',
          }}
        >
          {UploadedFilesBodies}
          <button
            type='button'
            className='btn btn-secondary'
            onClick={this.updateFilesList}
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}

export default ImageContainer;
