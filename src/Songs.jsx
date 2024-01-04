import { BlobServiceClient} from "@azure/storage-blob";
import React, { useEffect, useState } from 'react'

const blobSasUrl = "https://audiofilestestforevan.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-01-10T12:12:32Z&st=2024-01-04T04:12:32Z&spr=https&sig=wWXmMa55b21CcAbunMl%2FNavB%2BSm0SgQcB5h6jd5la74%3D";
const blobServiceClient = new BlobServiceClient(blobSasUrl);

var containerClient = blobServiceClient.getContainerClient("songs");
const Songs = (props) => {
    const [songs, setSongs] = useState([]);

    let audio = new Audio()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const blobs = await containerClient.listBlobsFlat();
            const names = [];
            for await (const blob of blobs) {
              names.push(blob.name);
            }
  

            setSongs(names);
          } catch (error) {
            console.error(error.message);
          }
        };
    
        fetchData();
      }, [, props.updateSongs]);

;

    function handleListen(songName){
        const blobClient = containerClient.getBlockBlobClient(songName);
        console.log(blobClient)
        audio = new Audio(blobClient.url)
        audio.play();
    }
    
    function handleStop(){
        audio.pause();
    }

  return (
    <>
        <ol>
            {
            songs.map(
                (song)=>
                (
                <li>{song}
                <button style={{marginLeft:'2em'}} onClick={()=>handleListen(song)}>Listen</button>
                <button style={{marginLeft:'2em'}} onClick={handleStop}>Stop</button>
                </li>))
            }

        </ol>

    </>

  )
}

export default Songs