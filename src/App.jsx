import { useEffect, useRef, useState } from "react";
import HeroSection from "./HeroSection";
import SnippitSection from "./SnippitSection";
import SeeBookmarksSection from "./SeeBookmarksSection";
import { v4 as uuidv4 } from "uuid";
import { search } from "./MongoDB";
import "./App.css";

function App() {
  const [selectedWindow, setSelectedWindow] = useState("home");
  const [dataArray, setDataArray] = useState(function () {
    return getData();
  });

  function getData() {
    search().then((data) => setDataArray(data));
    return [];
  }


  function addToDataArray(id, codeSnippit, describe, tags) {
    setDataArray((prevValue) => {
      return [
        ...prevValue,
        {
          id: id,
          codeSnippit: codeSnippit,
          describe: describe,
          tags: tags,
        },
      ];
    });
  }

  function handleWindowChange(pageName) {
    setSelectedWindow(pageName);
  }
  return (
    <>
      {/* <button
        style={{ position: "absolute" }}
        onClick={() =>
          setDataArray([
            {
              id: "a8a870c0-5f76-4b14-b824-c1236acc153a",
              codeSnippit:
                "```js\nimport { pipeline } from '@xenova/transformers';\n\n// Allocate a pipeline for sentiment-analysis\nlet pipe = await pipeline('sentiment-analysis');\n\nlet out = await pipe('I love transformers!');\n// [{'label': 'POSITIVE', 'score': 0.999817686}]\n```",
              describe: "How to initialize a Xenova model",
              tags: [],
            },
            {
              id: "30db6167-74b6-4e42-a9f4-05bf39e0ddf2",
              codeSnippit:
                '```css\n\n.lexend-deca-<uniquifier> {\n  font-family: "Lexend Deca", sans-serif;\n  font-optical-sizing: auto;\n  font-weight: <weight>;\n  font-style: normal;\n}```',
              describe: "How to import google font families",
              tags: [],
            },
            {
              id: "204283df-01e7-4e65-82a9-a44afa379e7f",
              codeSnippit:
                "```js\nconst months = [\"Mar\", \"Jan\", \"Feb\", \"Dec\"];\nconst sortedMonths = months.toSorted();\nconsole.log(sortedMonths); // ['Dec', 'Feb', 'Jan', 'Mar']\nconsole.log(months); // ['Mar', 'Jan', 'Feb', 'Dec']\n\nconst values = [1, 10, 21, 2];\nconst sortedValues = values.toSorted((a, b) => a - b);\nconsole.log(sortedValues); // [1, 2, 10, 21]\nconsole.log(values); // [1, 10, 21, 2]```",
              describe: 'JS code snippit about "toSortedFunction"',
              tags: [],
            },
          ])
        }
      >
        Test Data
      </button> */}
      {selectedWindow === "home" && (
        <HeroSection handleWindowChange={handleWindowChange} />
      )}
      {selectedWindow === "addSnippits" && (
        <SnippitSection
          addToDataArray={addToDataArray}
          handleWindowChange={handleWindowChange}
        />
      )}
      {selectedWindow === "seeBookmarks" && (
        <SeeBookmarksSection
          dataArray={dataArray}
          setDataArray={setDataArray}
          handleWindowChange={handleWindowChange}
        />
      )}
    </>
  );
}

export default App;
