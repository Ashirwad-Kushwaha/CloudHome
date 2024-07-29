import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/navbar';
import useCreateFolder from '../hooks/useCreateFolder';
import useGetFileFolders from '../hooks/useGetFileFolders';
import useUploadFile from '../hooks/useUploadFile';
import { FaFolderOpen } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { resetSearch } from '../store/slices/searchSlice';
import EmailModal from '../components/EmailModal';
import toast from "react-hot-toast";

const HomePage = () => {
  const dispatch = useDispatch();
  const [newFolder, setNewFolder] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const { createFolder } = useCreateFolder();
  const { getFileFolders, fileFolders, renameItem, deleteItem } = useGetFileFolders();
  const { isUploadAllowed, uploadFile } = useUploadFile();
  const { results } = useSelector((state) => state.search);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const storedFolderStructure = JSON.parse(localStorage.getItem('folderStructure')) || [{ _id: null, name: "Home" }];
  const [folderStructure, setFoldersStructure] = useState(storedFolderStructure);

  const parentFolder = folderStructure[folderStructure.length - 1];

  const handleDoubleClick = (elem) => {
    dispatch(resetSearch());
    if (elem.type === "folder") {
      const updatedStructure = [...folderStructure, elem];
      setFoldersStructure(updatedStructure);
      localStorage.setItem('folderStructure', JSON.stringify(updatedStructure));
    } else {
      window.open(elem.link, '_blank');
    }
  };

  const handleAllowCreateFolder = () => {
    setShowCreateFolder(true);
  };

  const handleCreateFolder = async () => {
    if (newFolder.length > 0) {
      await createFolder({
        name: newFolder,
        parentId: parentFolder._id
      });
      getFileFolders(parentFolder._id);
      setShowCreateFolder(false);
      setNewFolder("");
    }
  };

  const handleBackClick = (clickIdx) => {
    const newFolderStructure = folderStructure.slice(0, clickIdx + 1);
    setFoldersStructure(newFolderStructure);
    localStorage.setItem('folderStructure', JSON.stringify(newFolderStructure));
    dispatch(resetSearch());
  };

  const handleFileUpload = async (e) => {
    if (isUploadAllowed) {
      const file = e.target.files;
      await uploadFile({ file: file[0], parentId: parentFolder._id });
      getFileFolders(parentFolder._id);
    } else {
      toast.error("Upload is already in progress. Please wait...");
    }
  };

  const handleOptions = (id) => {
    setOptionsVisible((prev) => (prev === id ? null : id));
    setSelectedId(id);
  };

  const handleRename = (id) => {
    setEditingId(id);
    const item = fileFolders.find((elem) => elem._id === id);
    if (item) {
      setNewName(item.name);
    }
  };

  const handleRenameSubmit = async () => {
    if (newName.length > 0) {
      await renameItem(editingId, newName);
      getFileFolders(parentFolder._id);
      setEditingId(null);
      setNewName("");
      setOptionsVisible(null);
    }
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    getFileFolders(parentFolder._id);
    setOptionsVisible(null);
  };

  const handleShare = async () => {
    setModalOpen(true);
    setOptionsVisible(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOptionsVisible(null);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getFileFolders(parentFolder._id);
  }, [parentFolder]);

  const displayedItems = results.length > 0 ? results : fileFolders;

  return (
    <>
      <Navbar items={fileFolders} />
      <div className="homepage-main-container" ref={containerRef}>
        <div className="buttons">
          <button onClick={handleAllowCreateFolder} className='file-create'>Create Folder</button>
          <input className="file-create" ref={inputRef} type="file" onChange={handleFileUpload} />
        </div>

        <div className="create-folder-container">
          {showCreateFolder && (
            <div className='create-folder'>
              <input type="text" value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
              <button onClick={handleCreateFolder} className='yes-no'>Yes</button>
              <button onClick={() => setShowCreateFolder(false)} className='yes-no'>No</button>
            </div>
          )}
        </div>

        <ul className="folder-list">
          {folderStructure.map((elem, idx) => (
            <>
              <li key={idx} onClick={() => handleBackClick(idx)}>
                {elem.name}
              </li>
              <p>/</p>
            </>
          ))}
        </ul>

        <div className="get-file-folders">
          {displayedItems.map((elem) => (
            <div
              key={elem._id}
              className={`file-folder ${editingId === elem._id ? "expanded" : ""}`}
              onDoubleClick={() => handleDoubleClick(elem)}
            >
              <div className="file-folder-content">
                {elem.type === "folder" && <FaFolderOpen />}
                {editingId === elem._id ? (
                  <div className={`rename-input ${editingId === elem._id ? "visible" : ""}`}>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={handleRenameSubmit}
                      autoFocus
                    />
                    <button onClick={handleRenameSubmit}>Submit</button>
                  </div>
                ) : (
                  <p className="file-name">{elem.name}</p>
                )}
                <MdEdit
                  className="options-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptions(elem._id);
                  }}
                />
              </div>
              {optionsVisible === elem._id && (
                <div className="options-menu visible">
                  <button onClick={() => handleRename(elem._id)}>Rename</button>
                  <button onClick={() => handleDelete(elem._id)}>Delete</button>
                  <button onClick={() => handleShare(elem._id)}>Share</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <EmailModal id={selectedId} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </>
  );
};

export default HomePage;
