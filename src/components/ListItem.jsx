import { useDeleteNote, useUpdateNote } from "../hooks/useNotes";
import { useState } from "react";

const ListItem = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);

  const deleteNote = useDeleteNote();
  const updateNote = useUpdateNote();

  const formatedDate = new Date(note.dueDate).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote.mutate(note.id);
    }
  };

  const handleSave = () => {
    updateNote.mutate(
      { id: note.id, title: editTitle, description: editDescription, dueDate: note.dueDate },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  return (
    <li className="list-row p-4 border-b flex justify-between items-center">
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              className="input input-sm mb-1"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="textarea textarea-sm"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>
            <div>{note.title}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {note.description}
            </div>
          </>
        )}
      </div>
      <div className="text-right">
        <div>Due Date : {formatedDate}</div>

        {isEditing ? (
          <div className="flex gap-2 mt-2">
            <button className="btn btn-xs btn-success" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-xs btn-ghost"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mt-2">
            <button
              className="btn btn-xs btn-outline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-xs btn-error"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default ListItem;
