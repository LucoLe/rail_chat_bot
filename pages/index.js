import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";

import { getStations, getStationDepartures } from "../utils/bvg_api_client";

export default function Home() {
  const greeting = "Welcome to Rail chat bot!";
  const helpPrompt = 'Type "/bvg" to list available options';

  const [messages, setMessages] = React.useState([greeting, helpPrompt]);
  const [inputValue, setInputValue] = React.useState("");
  const messageRef = React.useRef();
  React.useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((messages) => messages.concat(inputValue));
    handleCommand(inputValue);
  };

  const handleCommand = (command) => {
    let result;

    if (command.match(/^\/bvg$/)) {
      setMessages((messages) =>
        messages.concat([
          'Type "/bvg stations:station name" to get a list of stations that match your search term',
          'Type "/bvg stationID:station id" to get the next two departures from this station',
          'Type "/bvg" to print this message again',
        ])
      );
    } else if (
      (result = command.match(/^\/bvg stationID\:(?<stationID>\d+)/))
    ) {
      getStationDepartures(result.groups.stationID, setMessages);
    } else if ((result = command.match(/^\/bvg stations:(?<station>.+)/))) {
      getStations(result.groups.station, setMessages);
    } else
      setMessages((messages) =>
        messages.concat("Sorry, I don't know how to answer that")
      );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>BVG chat bot</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to BVG chat bot</h1>

        <div className={styles.chatWindow}>
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
          <div ref={messageRef} />
        </div>
        <form className={styles.chatForm} onSubmit={handleSubmit}>
          <input
            className={styles.chatInput}
            type="text"
            value={inputValue}
            onChange={handleChange}
          />
          <input className={styles.chatSendButton} type="submit" value="Send" />
        </form>
      </main>
    </div>
  );
}
