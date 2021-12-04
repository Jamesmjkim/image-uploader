import React from 'react';

const UploadedFilesBody = ({
  imagePath,
  imageName,
  uploadDate,
  trashIcon,
  fileDelete,
  noPhotos,
}) => {
  return (
    <div>
      {noPhotos ? (
        <p className='fs-4 fw-light m-3'>No Uploaded Files Yet...</p>
      ) : (
        <div className='d-flex justify-content-between ms-3 me-3'>
          <a href={imagePath} target='_blank' rel='noreferrer'>
            {imageName}
          </a>
          <span>
            uploaded on {uploadDate}
            <button onClick={fileDelete}>
              <img
                src={trashIcon}
                alt='trash icon'
                style={{ width: '30px', height: '20px' }}
                value={imageName}
              />
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default UploadedFilesBody;
