import Button from "./Button";
import { useEffect, useState } from "react";

const PanelButtons = ({ right, wrong, author }) => {
  const AUTHTOKEN = "8Wp-OGyTs8mLXdxhXqVj";
  const [randomNames, setrandomNames] = useState([]);

  useEffect(() => {
    const getRandomCharacters = async () => {
      let res = await fetchRandomCharacters(3);
      //console.log(res);
      res = res.map((char) => char.name);
      //console.log(res);
      setrandomNames(res);
    };

    getRandomCharacters();
  }, [author]);

  const fetchRandomCharacters = async (n) => {
    const api =
      "https://the-one-api.dev/v2/character?limit=" +
      n +
      "&offset=" +
      Math.floor(Math.random() * 500);
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + AUTHTOKEN,
    };

    const response = await fetch(api, {
      headers: headers,
    });
    const data = await response.json();
    //console.log(data.docs);
    return data.docs;
  };
  //console.log(randomNames);
  const buttons = [
    <Button key="1" onClick={right} text={author} />,
    <Button key="2" onClick={wrong} text={randomNames[0]} />,
    <Button key="3" onClick={wrong} text={randomNames[1]} />,
    <Button key="4" onClick={wrong} text={randomNames[2]} />,
  ].sort(() => Math.random() - 0.5);
  return <div className="answer-panel">{buttons.map((button) => button)}</div>;
};

export default PanelButtons;
