import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

// styles
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "other", label: "Other" },
];

export default function Create() {
  const { addDocument, response } = useFirestore("projects");
  const navigate = useNavigate();
  const { documents } = useCollection("users");
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!category) {
      setError("Please select a category.");
      return;
    }
    if (assignedUsers.length < 1) {
      setError("Please assign the project to at lease one user.");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (!response.error) {
      navigate("/");
    }
  };

  const selectColorStyles = {
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: "var(--bg-color)",
      border: "1px solid var(--highlight-color)",
      outline: isFocused ? "4px solid var(--highlight-color)" : "none",
    }),
    menu: (styles) => ({ ...styles, backgroundColor: "var(--bg-color)" }),
    placeholder: (styles) => ({ ...styles, color: "var(--heading-color)" }),
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        color: isFocused ? "var(--heading-color)" : "var(--highlight-color)",
        backgroundColor:
          isFocused || isSelected ? "var(--primary-color)" : "var(--bg-color)",
      };
    },
    singleValue: (styles) => ({ ...styles, color: "var(--heading-color)" }),
    multiValue: (styles) => ({
      ...styles,
      color: "var(--bg-color)",
      backgroundColor: "var(--heading-color)",
    }),
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            type="text"
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Due date:</span>
          <input
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
            styles={selectColorStyles}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
            styles={selectColorStyles}
          />
        </label>
        <button className="btn">Add Project</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
