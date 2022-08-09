import "./textArea.scss";
import { useState } from "react";
import addFile from "../../assets/add-file.svg";
import symbols from "../../assets/symbols.svg";
import sobaka from "../../assets/sobaka.svg";

const TextArea = () => {
  const [activeTypeMessage, setActiveTypeMessage] = useState(0);

  return (
    <div className={"textarea"}>
      <div className="choose-type-message">
        <div
          className={"type-message-item"}
          style={activeTypeMessage === 0 ? { color: "#000" } : null}
          onClick={() => setActiveTypeMessage(0)}
        >
          <div>Сообщение</div>
          {activeTypeMessage === 0 ? (
            <div className="active-type-message-indicator"></div>
          ) : null}
        </div>
        <div
          className={"type-message-item"}
          style={activeTypeMessage === 1 ? { color: "#000" } : null}
          onClick={() => setActiveTypeMessage(1)}
        >
          <div>Важное сообщение</div>
          {activeTypeMessage === 1 ? (
            <div className="active-type-message-indicator"></div>
          ) : null}
        </div>
      </div>
      <form action="src/components/textArea/TextArea">
        <textarea className={"textarea-input"} />
      </form>
      <div className="additional-textarea-buttons">
        <div>
          <img src={addFile} alt="" />
        </div>
        <div style={{ display: "flex" }}>
          <img src={symbols} alt="" className={"symbols"} />
          <img src={sobaka} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TextArea;
