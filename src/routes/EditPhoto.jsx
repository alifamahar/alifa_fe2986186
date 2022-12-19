import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState(0);
  const [captions, setCaptions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/photos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: imageUrl,
        captions:  captions,
        updatedAt: Date().toString(),
      })
    })
    .then((json) => {
      if (json.error === undefined) {
        navigate("/photos");
      } else {
        alert(json?.error);
      }
    })
    
  };
  
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/photos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCaptions(data.captions);
        setImageUrl(data.imageUrl);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "30px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="editPhoto-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="editPhoto-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="editPhoto-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="btn-submit" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
