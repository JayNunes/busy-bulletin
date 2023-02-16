// styles
import "./Avatar.css";

export default function Avatar({ src }) {
  return (
    <div className="avatar">
      <div className="avatar-inner-wrapper">
        <img src={src} alt="user avatar" />
      </div>
    </div>
  );
}
