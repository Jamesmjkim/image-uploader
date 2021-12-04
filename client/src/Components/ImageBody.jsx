import React from 'react';

const ImageBody = ({ image, fileUploaded }) => {
  return (
    <div className='text-center'>
      {image === 'Error' ? (
        <p>Error with Uploading Image</p>
      ) : (
        <div>
          <img
            src={image}
            className='rounded'
            alt='Sample'
            style={{
              maxWidth: '25rem',
            }}
          />
          {fileUploaded ? (
            <p className='text-center m-2' style={{ color: 'blue' }}>
              Upload Successful!!
            </p>
          ) : fileUploaded === null ? null : (
            <p className='text-center m-2' style={{ color: 'red' }}>
              Upload Error
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default ImageBody;
