import { useAddNote, useNotes } from "../hooks/useNotes";
import { useUser } from "../hooks/useUser";
import { useLogout } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import ListItem from "../components/ListItem";
import { useNoteStore } from "../store/useNoteStore";

const HomePage = () => {
  const { title, description, dueDate, showCalendar, setTitle, setDescription, setDueDate, toggleCalendar, reset } = useNoteStore();

  const { data: user } = useUser();
  const { isPending, isError, data, error } = useNotes();
  const addNote = useAddNote();
  const logout = useLogout();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-error">
          Error: {error?.response?.data?.message}
        </span>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isoDate = dueDate ? new Date(dueDate).toISOString() : null;

    addNote.mutate({ title, description, dueDate: isoDate });
    reset()
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="font-semibold">
            Welcome, {user ? user.name : "Guest..."}
          </p>
          <button className="btn btn-sm btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-100 border border-base-300 rounded-box p-4 shadow-md">
            <legend className="fieldset-legend font-bold">Notes App</legend>

            <label className="label">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button
              popoverTarget="rdp-popover"
              className="input input-bordered w-full mt-2"
              type="button"
              onClick={toggleCalendar}
            >
              {dueDate ? formatDate(dueDate) : "Pick a date"}
            </button>

            {showCalendar && (
              <div className="mt-2 flex justify-center">
                <DayPicker
                  className="react-day-picker bg-base-100 p-2 rounded-lg shadow"
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => {
                    setDueDate(date);
                    toggleCalendar();
                  }}
                />
              </div>
            )}

            <button className="btn btn-neutral w-full mt-4" type="submit">
              Submit
            </button>
          </fieldset>
        </form>

        {/* Notes list */}
        <ul className="list bg-base-100 rounded-box shadow-md divide-y">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            List Notes
          </li>
          {data?.data?.map((note) => (
            <ListItem key={note.id} note={note} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
