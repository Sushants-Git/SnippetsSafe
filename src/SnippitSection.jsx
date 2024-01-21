import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { handleSubmit, MongoDB } from "./MongoDB";

function SnippitSection({ addToDataArray, handleWindowChange }) {
  const [codeSnippit, setCodeSnippit] = useState("");
  const [describe, setDescribe] = useState("");
  const [tags, setTags] = useState([]);

  function deleteTag(id) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <div className="addSnippitsSection">
      <button className="backButton" onClick={() => handleWindowChange("home")}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2"
          />
        </svg>
      </button>
      <div className="codeSnippitEditiorWrapper">
        <label htmlFor="codeSnippitEditior">Code Snippit</label>
        <textarea
          autoFocus
          id="codeSnippitEditior"
          name="codeSnippitEditior"
          value={codeSnippit}
          onChange={(e) => setCodeSnippit(e.target.value)}
        />
      </div>

      <div className="tags-wrapper">
        <label htmlFor="tags">Tags</label>
        <div id="tags-input-wrapper">
          <div
            id="created-tags-wrapper"
            style={{
              marginBottom: tags.length > 0 ? "10px" : "0px",
            }}
          >
            {tags.map((tag) => (
              <span key={tag.id} onClick={() => deleteTag(tag.id)}>
                {tag.value}
              </span>
            ))}
          </div>
          <input
            type="text"
            id="tags"
            onChange={(e) => {
              if (e.target.value.endsWith(" ")) {
                const value = e.target.value;
                setTags((prevValue) => {
                  return [...prevValue, { value: value.trim(), id: uuidv4() }];
                });
                e.target.value = "";
              }
            }}
          />
        </div>
      </div>

      <div className="describeWrapper">
        <label htmlFor="describe">Describe this Code Snippit</label>
        <textarea
          id="describe"
          name="describe"
          value={describe}
          onChange={(e) => setDescribe(e.target.value)}
        />
      </div>

      <div className="buttonWrapper">
        <button
          id="save"
          onClick={() => {
            if (codeSnippit.trim() !== "") {
              handleSubmit({
                id: uuidv4(),
                codeSnippit: codeSnippit,
                describe: describe,
                tags: tags,
              }).then((data) => {
                addToDataArray(data, codeSnippit, describe, tags);
              });
              setCodeSnippit("");
              setDescribe("");
              setTags([]);
            }
          }}
        >
          Save
        </button>
        <button
          id="cancel"
          onClick={() => {
            setCodeSnippit("");
            setDescribe("");
            setTags([]);
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default SnippitSection;
