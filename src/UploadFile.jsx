import React, { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';

const UploadFile = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

  };

  const handleUpload = async () => {

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    const blobSasUrl = "https://audiofilestestforevan.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-01-10T12:12:32Z&st=2024-01-04T04:12:32Z&spr=https&sig=wWXmMa55b21CcAbunMl%2FNavB%2BSm0SgQcB5h6jd5la74%3D";
    const blobServiceClient = new BlobServiceClient(blobSasUrl);
    
    var containerClient = blobServiceClient.getContainerClient("songs");


    const blobName = selectedFile.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadBrowserData(selectedFile);
      props.setUpdateSongs(true);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;
