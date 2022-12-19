import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = async (e) => {
    e.preventDefault();
    <>
     secret === "password" ? {
      await fetch("http://localhost:3001/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          captions:  captions,
          createdAt: Date().toString(),
          updatedAt: Date().toString(),
          secret: "password",
        })
      })
    } : {
      setError("You are not authorized")
    }
    </>
    navigate("/photos");
  };

  return (
    <>
      <div className="container">
      {error && <div className="error-show">{error}</div>}
        <form className="addPhoto-form"  onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="addPhoto-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="addPhoto-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="addPhoto-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
