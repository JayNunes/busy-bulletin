import { Link } from "react-router-dom";
import Avatar from "./Avatar";

// styles
import "./ProjectList.css";

export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}

      {projects.map((doc) => (
        <Link className="ind-project" to={`/projects/${doc.id}`} key={doc.id}>
          <h4>{doc.name}</h4>
          <p>Due by {doc.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {doc.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                  {/* <p>{user.displayName}</p> */}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
