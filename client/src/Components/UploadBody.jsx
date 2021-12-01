import React from 'react';
import ImageBody from './ImageBody';

const UploadBody = ({ image, fileUploaded, onFileLoad }) => {
  return (
    <div className='card-body'>
      <h5 className='card-title m-3'>Upload Your Image</h5>
      <p className='card-text m-3'>File should be Jpeg, Png,... </p>

      <div
        className='card text-dark bg-light mb-3 mx-auto'
        style={{
          width: '27.5rem',
          height: '20rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ImageBody image={image} fileUploaded={fileUploaded} />
      </div>

      <div className='input-group mb-3'>
        <input
          type='file'
          className='form-control'
          id='inputGroupFile02'
          onChange={onFileLoad}
        />
        <label className='input-group-text' htmlFor='inputGroupFile02'>
          Upload
        </label>
      </div>
    </div>
  );
};
export default UploadBody;
