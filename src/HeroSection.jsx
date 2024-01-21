function HeroSection({ handleWindowChange }) {
  return (
    <div className="heroSection">
      <div className="heading">
        <h1>SnippetSafe</h1>
      </div>
      <div className="title">
        <p>Never loose you code snippits again</p>
      </div>
      <div className="heroSection-buttons">
        <button
          className="addSnippits"
          onClick={() => handleWindowChange("addSnippits")}
        >
          add snippits
        </button>
        <button
          className="seeBookmarks"
          onClick={() => handleWindowChange("seeBookmarks")}
        >
          see codemarks
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
