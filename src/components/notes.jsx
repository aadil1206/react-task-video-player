import React, { useContext, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import Context from "./context/index";
import { Modal } from "react-bootstrap";
import "../App.css";

import { DropzoneArea } from "mui-file-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";

const Notes = () => {
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
  } = useContext(Context);
  const [addBranchModal, setAddBranchModal] = useState(false);
  const [value, setValue] = useState("");
  const [updateBranchModal, setupdateBranchModal] = useState(false);
  const [updateId, setupdateId] = useState([]);

  const addNote = () => {
    setAddBranchModal(!addBranchModal);
  };
  const handleClose = () => {
    setAddBranchModal(!addBranchModal);
  };
  const uploadImage = async (file) => {
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    localStorage.setItem("base64", baseImage);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  let modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ size: [] }],
      [{ font: [] }],

      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };
  let formats = [
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
  const handleChangeQuill = (text) => {
    setValue(text);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    (await value) && handleNotes(value);
    await uploadImage(Image[0]);
    handleClose();
  };
  const handleHtml = (item) => {
    const summary = item
      .replace(/<[^>]*>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
    return summary;
  };
  const handleTime = (props) => {
    const hours = Math.floor(props / 3600);
    const minutes = Math.floor((props - hours * 3600) / 60);
    const seconds = Math.floor((props % 60).toString().padStart(2, "0"));

    const timeString =
      hours.toString().padStart(2, "0") +
      "hr" +
      ":" +
      minutes.toString().padStart(2, "0") +
      "min" +
      ":" +
      seconds +
      "sec";
    setTimeStamp(timeString);
    return timeString;
  };
  const updateNotesModal = (id) => {
    setupdateBranchModal(true);
    
    setupdateId(id);
  };
  const handleCloseUpdate = () => {
    setupdateBranchModal(!updateBranchModal);
  };
  const handleChangeQuillUpdate = (props) => {
    setValue(props);
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setupdateId((prevUpdateId) => {
      const newUpdateId = [prevUpdateId, value];
      if (newUpdateId) {
        updateNotes(newUpdateId);
      }
      return newUpdateId;
    });
    handleCloseUpdate();
  };
  
  return (
    <div className="notes-main">
      <div className="notes-addnote-main d-flex flex-column">
        <div className="d-flex notesAddNote justify-content-between col-12 col-xl-12 align-items-center">
          <div className="d-flex flex-column col-12 col-xl-10 col-lg-8 col-md-7 col-sm-6">
            <h3>My Notes</h3>
            <p>
              All your Notes at a single place .Click on any Note to go to
              specific timestamp in the video
            </p>
          </div>
          <div className="addnotebtn col-12 col-xl-2 col-lg-3 col-md-4 col-sm-5">
            <button onClick={addNote} className="addbtn col-12 col-xl-12">
              <CiCirclePlus style={{ color: "#344054", fontSize: "28px" }} />
              <span className="addbtntext">Add new Note</span>
            </button>
          </div>
        </div>
        <Modal
          show={addBranchModal}
          onHide={handleClose}
          className="add-department-modal-main"
          size="xl"
        >
          <Modal.Header closeButton className="add-department-modal-header">
            <Modal.Title className="add-department-modal-title">
              Add Notes
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="add-department-modal-body p-3">
            <form className="modelvendorform" onSubmit={handleSubmit}>
              <Label for="exampleEmail">Notes</Label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChangeQuill}
                modules={modules}
                formats={formats}
                style={{ marginBottom: "2rem" }}
              />
              <DropzoneArea
                opens={true}
                onChange={(propertyImages) => setImage(propertyImages)}
              />
              <div className="d-flex justify-content-end my-4 ">
                <button type="submit" className="model-addNotebtn ">
                  Add Note
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {/* {baseImage&&<img src={baseImage} height="200px" />} */}
        {notes?.map((item, index) => {
          if (item.ID === id && id !== null) {
            return (
              <div className="d-flex col-12 col-xl-12 flex-column">
                <div className="mt-2">
                  <div className="d-flex flex-column col-12 col-xl-12 justify-content-start">
                    <p>{item.currentDate}</p>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSeek(item.timestamp);
                      }}
                    >
                      {handleTime(item.timestamp)}
                    </a>
                  </div>
                  <div className="notemaintext col-12 col-xl-12">
                    <p>{handleHtml(item.note)}</p>
                  </div>
                </div>
                <div className="col-12 col-xl-12 d-flex justify-content-end">
                  <button
                    onClick={() => removeNotes(item.ID)}
                    className="col-4 col-xl-1 col-lg-2 col-md-3 col-sm-4 delbtn"
                  >
                    Delete Note
                  </button>
                  <button
                    onClick={() => updateNotesModal(item.ID)}
                    className="col-4 col-xl-1 col-lg-2 col-md-3 col-sm-4 editbtn"
                  >
                    Edit Note
                  </button>
                </div>
              </div>
            );
          }
        })}
        <Modal
          show={updateBranchModal}
          onHide={handleCloseUpdate}
          className="add-department-modal-main"
          size="xl"
        >
          <Modal.Header closeButton className="add-department-modal-header">
            <Modal.Title className="add-department-modal-title">
              Update Notes
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="add-department-modal-body p-3">
            <form className="modelvendorform" onSubmit={handleSubmitUpdate}>
              <Label for="exampleEmail">Notes</Label>
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
