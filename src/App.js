import './App.css';
import Songs from './Songs.jsx';
import UploadFile from './UploadFile.jsx';
import React, {useState} from 'react';
function App() {
  const [updateSongs, setUpdateSongs] = useState(false);
  return (

    <>
    <h1>Songs</h1>
    <UploadFile setUpdateSongs={setUpdateSongs}></UploadFile>
    <Songs updateSongs={updateSongs}></Songs>
    </>
  );
}

export default App;
