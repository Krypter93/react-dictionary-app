import { useState } from "react";
import "../assets/homepage.css";
import { FaBookmark } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { dataFetch } from "../assets/fetchData.js";

export default function HomePage() {
  const [word, setWord] = useState("");

  //localStorage random key state
  const [randomKey, setRandomKey] = useState(0);

  //HTML tags to update
  const container = document.querySelector(".container");
  const defBlock = document.querySelector(".definition");
  const text = document.querySelector(".text-def");

  //Handler input change function
  function handleInputChange(e) {
    setWord(e.target.value);
  }

  //Data Fetch
  async function handleFetch(param) {
    //Imported async function call
    const dataCall = await dataFetch(param);

    //Updating HTML tags
    container.style.filter = "blur(3px)";
    defBlock.style.visibility = "visible";
    text.innerHTML = dataCall[0].meanings[0].definitions[0].definition;

    //Adding new button below the definition
    const newButton = document.createElement("button");
    newButton.setAttribute("id", "newbutton");
    newButton.innerHTML = '<i class="fa-solid fa-book-bookmark"></i>';
    text.appendChild(newButton);

    //Adding to localStorage
    newButton.onclick = addBookmark;
  }

  //Close modal
  function handleCloseModal() {
    defBlock.style.visibility = "hidden";
    container.style.removeProperty("filter");
  }

  //Add bookmark function
  function addBookmark() {
    setRandomKey(() => randomKey + 1);
    const key = String(randomKey);
    const storageData = JSON.stringify(word);
    localStorage.setItem(key, storageData);
  }

  //Recovering from localStorage
  //TODO

  return (
    <>
      <div className="container">
        <div className="dict-image">
          <img src="/glass.png" alt="" />
        </div>

        <div className="dict-info">
          <h1>English Dictionary</h1>
          <p>Find meanings and save for quick reference</p>
          <input
            type="text"
            placeholder="🔎 Enter word"
            value={word}
            onChange={handleInputChange}
          />
          <button id="search" onClick={() => handleFetch(word)}>
            <IoSearch />
          </button>
        </div>

        <div className="bookmark">
          <button id="mark">
            {" "}
            <FaBookmark />{" "}
          </button>
        </div>
      </div>

      <div className="definition">
        <div id="close">
          <IoMdClose onClick={handleCloseModal} />
        </div>
        <div className="text-def"></div>
      </div>
    </>
  );
}
