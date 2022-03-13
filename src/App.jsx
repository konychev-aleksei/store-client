import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios({
        url: "https://google.com",
        method: "GET"
      });

      console.log("WTF?", response);
      setResponse(response);
    })();
  }, []);

  return <div className="App">{response}</div>;
}
