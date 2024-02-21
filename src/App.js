import Quote from "./components/Quote";
import Footer from "./components/Footer";
import About from "./components/About";
import { useState, useEffect } from "react";
import PanelButtons from "./components/PanelButtons";
import Score from "./components/Score";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [points, setPoints] = useState(0);
  const AUTHTOKEN = "8Wp-OGyTs8mLXdxhXqVj";

  useEffect(() => {
    const getQuote = async () => {
      const quoteFromServer = await fetchQuote();
      setQuote(quoteFromServer.dialog);
      const characterFromServer = await fetchCharacter(
        quoteFromServer.character
      );

      setAuthor(characterFromServer.name);
    };

    getQuote();
  }, []);

  const fetchCharacter = async (id) => {
    const api = "https://the-one-api.dev/v2/character/" + id;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + AUTHTOKEN,
    };

    const response = await fetch(api, {
      headers: headers,
    });
    const data = await response.json();

    return data.docs[0];
  };

  const fetchQuote = async () => {
    const randomQuoteKey = Math.floor(Math.random() * 1000);

    const api =
      "https://the-one-api.dev/v2/quote?limit=1&offset=" + randomQuoteKey;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + AUTHTOKEN,
    };
    const response = await fetch(api, {
      headers: headers,
    });
    const data = await response.json();

    return data.docs[0];
  };

  const newRandomQuote = async () => {
    const newQuote = await fetchQuote();
    setQuote(newQuote.dialog);
    const characterFromServer = await fetchCharacter(newQuote.character);

    setAuthor(characterFromServer.name);
  };

  const rightAnswer = () => {
    //console.log("ok");
    setPoints(points + 1);
    newRandomQuote();
  };
  const wrongAnswer = () => {
    //console.log("ko");
    setPoints(points - 1);
    newRandomQuote();
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Score points={points} />

                <Quote text={quote} author="Someone" />
                <PanelButtons
                  right={rightAnswer}
                  wrong={wrongAnswer}
                  author={author}
                />
                <Footer />
              </>
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
