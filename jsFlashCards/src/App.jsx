import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import FlashCardList from "./Components/FlashCardList";
import axios from "axios";


function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  //useEffect to fetch data by category
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  useEffect(() => {
    //placeholder url

  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
    // this will help us ensure we get the amount of q's related to that category selected
    .get("https://opentdb.com/api.php",{
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then((res) => {
      setFlashCards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];

          return {
            //this will put a timestamp to ensure we are generating new questions each time, and does not repeat
            id: `${index}-${Date.now()}`,
            question: questionItem.question,
            answer: decodeString(questionItem.correct_answer),
            //this will help randomize our order of correct answers
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
      
    })




  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          {/* form group to select category from dropdown */}
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* form group to have an input value */}
        <div className="form-group">
          <label htmlFor='amount'>Number Of Questions</label>
          <input type='number' id='amount' min='1' step='1' defaultValue={10} ref={amountEl}/>
        </div>

        {/* form group to submit number of questions */}
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashCards={flashCards} />
      </div>
    </>
  );
}

export default App;
