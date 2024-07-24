import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/navbar'
import useCreateFolder from '../hooks/useCreateFolder';
import useGetFileFolders from '../hooks/useGetFileFolders';
import useUploadFile from '../hooks/useUploadFile';

const HomePage = () => {
  const [newFolder, setNewFolder] = useState("");
  const inputRef = useRef(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const {createFolder} = useCreateFolder();
  const {getFileFolders, fileFolders} = useGetFileFolders();
  const [folderStructure, setFoldersStructure] = useState([{_id:null}]);

  const parentFolder = folderStructure[folderStructure.length - 1];

  const handleDoubleClick = (elem) => {
    if(elem.type == "folder") {
      setFoldersStructure([...folderStructure, elem]);
    } else {
      window.open(elem.link, '_blank');
    }
  }

  const handleAllowCreateFolder = () => {
    setShowCreateFolder(true);
  }

  const handleCreateFolder = async () => {
    if(newFolder.length > 0) {
      await createFolder({
        name: newFolder,
        parentId: parentFolder._id
      });
      getFileFolders(parentFolder._id);
      setShowCreateFolder(false);
    }
  }

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIdx);
    setFoldersStructure(newFolderStructure);
  }

  const {isUploadAllowed, uploadFile} = useUploadFile();

  const handleFileUpload = async (e) => {
    if(isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({file : file[0], parentId : parentFolder._id});
      getFileFolders(parentFolder._id);
    } else{
      alert("Upload is already in progress. Please wait....");
    }

  }

  useEffect(() => {
    getFileFolders(parentFolder._id);
  }, [folderStructure])

  return (
    <>
      <Navbar />
     <div className="homepage-main-container">
     <h3>Welcome, User</h3>
     <div className="buttons">
     <button onClick={handleAllowCreateFolder} className='file-create'>Create Folder</button>
          <input className="file-upload-input" ref={inputRef} type="file" onChange={handleFileUpload} />
     <ul style={{ display: "flex", padding: "24px", gap: "24px"}}>
     {folderStructure.map((elem, idx)=>{
       return <li onClick={()=>{
        handleBackClick(idx)
       }}>{elem.name}</li>
     })}
     </ul>
     </div>
     <div className="create-folder-container">
        {
          showCreateFolder && (
            <div className='create-folder'>
            <input type="text" value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
            <button onClick={handleCreateFolder} className='yes-no'>Yes</button>
            <button onClick={() => setShowCreateFolder(false)} className='yes-no'>No</button>
            </div>
          )
        }
     </div>
     <div className="get-file-folders">
     {
       fileFolders.map((elem) => (
         <div key={elem._id} className="file-folder" onDoubleClick={() => handleDoubleClick(elem)}>
           <p>
           {elem.name}
           </p>
         </div>
       ))
     }
     </div>
     </div> 

    </>
  )
}

export default HomePage
