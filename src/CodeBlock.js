import React from "react";
import { CodeBlock as Container, dracula } from "react-code-blocks";

const CodeBlock = ({ children }) => {
  return (
    <div style={{ width: "100%", padding: "2rem" }}>
      <Container
        text={children}
        language="javascript"
        showLineNumbers
        theme={dracula}
      />
    </div>
  );
};

export default CodeBlock;
