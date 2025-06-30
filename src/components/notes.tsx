import React, { useContext, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import Context from "./context/index";
import { Modal } from "react-bootstrap";
import "../App.css";

import { DropzoneArea } from "mui-file-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "reactstrap";

const Notes: React.FC = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const {
    toggle,
    toggling,
    notes,
    handleNotes,
    setBaseImage,
    removeNotes,
    baseImage,
    setImage,
    Image,
    handleSeek,
    updateNotes,
    TimeStamp,
    setTimeStamp,
    id,
  } = context;

  const [addBranchModal, setAddBranchModal] = useState<boolean>(false);
  const [fileObjects, setFileObjects] = useState<File[]>([]);

  const [value, setValue] = useState<string>("");
  const [updateBranchModal, setupdateBranchModal] = useState<boolean>(false);
  const [updateId, setupdateId] = useState<string>("");

  const addNote = () => setAddBranchModal(true);
  const handleClose = () => setAddBranchModal(false);

  const uploadImage = async (file: File) => {
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    localStorage.setItem("base64", base64);
  };

  const convertBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          resolve(fileReader.result);
        } else {
          reject(new Error("FileReader result is not a string"));
        }
      };

      fileReader.onerror = (error) => reject(error);
    });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ size: [] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      [{ color: ["#000000", "#ff0000", "#ffff00", "#00ff00", "#0000ff"] }],
    ],
  };

  const formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const handleChangeQuill = (text: string) => setValue(text);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) handleNotes(value);
    if (Image) await uploadImage(Image);
    handleClose();
    setValue("");
  };

  const handleHtml = (item: string): string =>
    item
      .replace(/<[^>]*>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();

  const handleTime = (props: number | string): string => {
    const timestamp = typeof props === "string" ? parseFloat(props) : props;

    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = Math.floor(timestamp % 60);

    const timeString =
      `${hours.toString().padStart(2, "0")}hr:` +
      `${minutes.toString().padStart(2, "0")}min:` +
      `${seconds.toString().padStart(2, "0")}sec`;

    setTimeStamp(timeString);
    return timeString;
  };

  const updateNotesModal = (id: string) => {
    setupdateBranchModal(true);
    setupdateId(id);
  };

  const handleCloseUpdate = () => setupdateBranchModal(false);

  const handleChangeQuillUpdate = (text: string) => setValue(text);

  const handleSubmitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateId && value) {
      updateNotes([updateId, value]);
    }
    handleCloseUpdate();
  };

  return (
    <div className="notes-main">
      <div className="notes-addnote-main d-flex flex-column">
        <div className="d-flex notesAddNote justify-content-between col-12 col-xl-12 align-items-center">
          <div className="d-flex flex-column col-12 col-xl-10 col-lg-8 col-md-7 col-sm-6">
            <h3>My Notes</h3>
            <p>
              All your Notes at a single place. Click on any Note to go to a
              specific timestamp in the video.
            </p>
          </div>
          <div className="addnotebtn col-12 col-xl-2 col-lg-3 col-md-4 col-sm-5">
            <button onClick={addNote} className="addbtn col-12 col-xl-12">
              <CiCirclePlus style={{ color: "#344054", fontSize: "28px" }} />
              <span className="addbtntext">Add new Note</span>
            </button>
          </div>
        </div>

   
        <Modal show={addBranchModal} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Add Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <Label>Notes</Label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChangeQuill}
                modules={modules}
                formats={formats}
                style={{ marginBottom: "2rem" }}
              />
              <DropzoneArea
                filesLimit={1}
                showPreviews={true}
                showPreviewsInDropzone={false}
                useChipsForPreview
                dropzoneText="Drag and drop a file here or click"
                onChange={(files: File[]) => {
                  setFileObjects(files);
                  setImage(files[0] || null);
                }}
                fileObjects={fileObjects}
              />

              <div className="d-flex justify-content-end my-4">
                <button type="submit" className="model-addNotebtn">
                  Add Note
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>

    
        {notes?.map((item: any, index: number) => {
          if (item.videoID === id && id !== null) {
            return (
              <div key={index} className="d-flex col-12 col-xl-12 flex-column">
                <div className="mt-2">
                  <div className="d-flex flex-column col-12 col-xl-12">
                    <p>{item.currentDate}</p>
                    <a
                      href="#"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        if (item.timestamp !== undefined) {
                          handleSeek(item.timestamp);
                        }
                      }}
                    >
                      {item.timestamp !== undefined &&
                        handleTime(item.timestamp)}
                    </a>
                  </div>
                  <div className="notemaintext col-12 col-xl-12">
                    <p>{handleHtml(item.note)}</p>
                  </div>
                </div>
                <div className="col-12 col-xl-12 d-flex justify-content-end">
                  <button
                    onClick={() => removeNotes(item.useId)}
                    className="col-4 col-xl-1 col-lg-2 col-md-3 col-sm-4 delbtn"
                  >
                    Delete Note
                  </button>
                  <button
                    onClick={() => updateNotesModal(item.useId)}
                    className="col-4 col-xl-1 col-lg-2 col-md-3 col-sm-4 editbtn"
                  >
                    Edit Note
                  </button>
                </div>
              </div>
            );
          }
        })}

  
        <Modal show={updateBranchModal} onHide={handleCloseUpdate} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Update Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitUpdate}>
              <Label>Notes</Label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChangeQuillUpdate}
                modules={modules}
                formats={formats}
              />
              <div className="d-flex justify-content-end my-4">
                <button type="submit" className="model-createbtn text-white">
                  Create
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Notes;
