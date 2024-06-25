import { useState, useEffect, useRef } from "react";
import { handleDelete } from "./MongoDB";
import Preview from "./Preview";

function SeeBookmarksSection({ dataArray, setDataArray, handleWindowChange }) {
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [popUpCodeSnippet, setPopUpCodeSnippet] = useState("");
  const [popUpDescribe, setPopUpDescribe] = useState("");
  const [popUpTags, setPopUpTags] = useState([]);
  const [outputGenerated, setOutputGenerated] = useState(false);
  const [describe, setDescribe] = useState("");

  const [deletionMode, setDeletionMode] = useState(false);

  // Model loading
  const [ready, setReady] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [progressItems, setProgressItems] = useState([]);

  // Create a reference to the worker object.
  const worker = useRef(null);

  const [alikeArray, setAlikeArray] = useState([]);

  function openCodeSnippit(id) {
    console.log(id);
  }

  function createAlikeArray() {
    setAlikeArray([]);
    dataArray.map((data) => classify(describe, data.describe, data));
  }

  function deleteFromDataArray(id) {
    console.log(id);
    setDataArray((prevValue) => {
      let temp = [];
      for (let i = 0; i < prevValue.length; i++) {
        if (prevValue[i].id !== id) {
          temp.push(prevValue[i]);
        }
      }
      return temp;
    });
    handleDelete(id);
  }

  // console.log(alikeArray);

  const classify = (inputOne, inputTwo, obj) => {
    setDisabled(true);
    worker.current.postMessage({
      sentence1: inputOne,
      sentence2: inputTwo,
      obj: obj,
    });
  };

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    }

    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case "initiate":
          // Model file start load: add a new progress item to the list.
          setReady(false);
          setProgressItems((prev) => [...prev, e.data]);
          break;

        case "progress":
          // Model file progress: update one of the progress items.
          setProgressItems((prev) =>
            prev.map((item) => {
              if (item.file === e.data.file) {
                return { ...item, progress: e.data.progress };
              }
              return item;
            })
          );
          break;

        case "done":
          // Model file loaded: remove the progress item from the list.
          setProgressItems((prev) =>
            prev.filter((item) => item.file !== e.data.file)
          );
          break;

        case "ready":
          // Pipeline ready: the worker is ready to accept messages.
          setReady(true);
          break;

        case "update":
          // Generation update: update the output text.
          setOutput(e.data.output);
          break;

        case "complete":
          let value = JSON.stringify(e.data.output);
          setAlikeArray((preValue) => [...preValue, JSON.parse(value)]);
          setOutputGenerated((prevValue) => !prevValue);
          // console.log(e.data.output);
          // Generation complete: re-enable the "Translate" button
          setDisabled(false);
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  useEffect(() => {
    if (alikeArray.length) {
      let x = alikeArray.toSorted((a, b) => {
        console.log(a.alike - b.alike);
        return b.alike - a.alike;
      });

      setDataArray(() => {
        return x.map((data) => data.obj);
      });
    }
  }, [outputGenerated]);

  return (
    <>
      {popUpIsOpen && (
        <div className="codeSnippetPopUp">
          <div className="codeSnippetPopUpContainer">
            <button
              className="closing-button"
              onClick={() => {
                setPopUpIsOpen(false);
              }}
            >
              <svg
                width="59.32"
                height="64"
                viewBox="0 0 1216 1312"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68"
                />
              </svg>
            </button>

            <div className="popUpContainer">
              <div className="popUpCodeSnippet">
                <p>Code Snippit</p>
                <p className="popUpCodeSnippetOutput">
                  <Preview content={popUpCodeSnippet} />
                </p>
              </div>

              <div className="popUpTags">
                <p>Tags</p>
                <p>
                  {popUpTags.map((tag, index) => {
                    let stringToReturn = tag.value;
                    if (index !== popUpTags.length - 1) {
                      stringToReturn += ", ";
                    }
                    return stringToReturn;
                  })}
                </p>
              </div>

              <div className="popUpDescribe">
                <p>Describe</p>
                <p>{popUpDescribe}</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
      <div className="seeBookmarksSection">
        <div className="options-container">
          <div className="options-inner-container">
            <div className="options-describe-wrapper">
              <textarea
                autoFocus
                id="options-describe"
                name=""
                placeholder="describe what you are looking for ..."
                rows="1"
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              ></textarea>
            </div>
            <div className="options-tags-wrapper">
              <input type="text" id="options-tags" placeholder="tags" />
            </div>
            <div id="options-created-tags-wrapper"></div>
            <div className="options-button-wrapper">
              <div className="search-button-wrapper">
                <button id="search-button" onClick={() => createAlikeArray()}>
                  Search
                </button>
              </div>
              <div className="edit-button-wrapper">
                <button
                  id="edit-button"
                  onClick={() => setDeletionMode((prevValue) => !prevValue)}
                >
                  Edit CodeMarks
                </button>
                {deletionMode && <p>Click on Any Bookmark to delete it</p>}
              </div>
              <div id="edit-message-wrapper">
                Click on Any Bookmark to delete it
              </div>
            </div>
            <hr className="first-hr" />
            <div className="options-bookmarks">
              <div className="grid">
                <div className="titles">
                  <div className="hash" id="hash">
                    #
                  </div>
                  <div>Code</div>
                  <div>Tags</div>
                  <div>Describe</div>
                  <div>Preview</div>
                </div>
                <hr />
                <div id="bookmark-table-content">
                  {dataArray.map((data, index) => {
                    return (
                      <div
                        key={data.id}
                        onClick={(e) => {
                          deletionMode && deleteFromDataArray(data.id);
                        }}
                      >
                        <div className="titles-content" data-id={data.id}>
                          <div className="hash" id="num">
                            {index + 1}
                          </div>
                          <div>{`${data.codeSnippit.substring(
                            0,
                            100
                          )} ...`}</div>
                          <div>
                            {data.tags.map((tag, index) => {
                              let stringToReturn = tag.value;
                              if (index !== data.tags.length - 1) {
                                stringToReturn += ", ";
                              }
                              return stringToReturn;
                            })}
                          </div>
                          <div>{data.describe}</div>
                          <div id="options-link-wrapper">
                            <button
                              id="options-link"
                              onClick={() => {
                                openCodeSnippit(data.id);
                                setPopUpIsOpen(true);
                                setPopUpCodeSnippet(data.codeSnippit);
                                setPopUpDescribe(data.describe);
                                setPopUpTags(data.tags);
                              }}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24">
                                <path
                                  vectorEffect="non-scaling-stroke"
                                  d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <footer className="footer">
              <hr className="footer-first-hr" />
              <p># 2024 SnippetSafe</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default SeeBookmarksSection;
