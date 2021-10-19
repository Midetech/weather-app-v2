import { useState } from "react";
import { IoClose } from "react-icons/all";
import "../style/info.styles.css";

const Note = () => {
  const [note, setNote] = useState([]);

  const [noteIndex, setNoteIndex] = useState(-1);

  const [text, setText] = useState("");

  const handleSaveNote = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (noteIndex > -1) {
        note[noteIndex] = text;
        setNote(note);
        setNoteIndex(-1);
      } else {
        setNote([...note, text]);
      }
      setText("");
    }
  };

  const onSelectNote = (index) => {
    setNoteIndex(index);
    setText(note[index]);
  };

  const removeNote = (index) => {
    note.splice(index, 1);
    setNote([...note]);
  };
  return (
    <div>
      <textarea
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleSaveNote}
        value={text}
        placeholder="Note"
      ></textarea>

{
            note.length ? <p>Click on added note to edit</p> : ''
          }
      {note.map((nt, i) => (
        <div className="notes">
          <IoClose onClick={() => removeNote(i)} style={{position: 'relative', left: '230px'}} />

          <p onClick={() => onSelectNote(i)} key={i}>
            {" "}
            {nt}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Note;
