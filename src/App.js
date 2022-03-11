import React from "react";
export default function App() {
  const [selected, setSelected] = React.useState([]);
  const [directed, setDirected] = React.useState([]);
  const dictionary = ["массив", "аллигатор", "фильтр", "проверка"];
  function levenshteinDistance(s, t) {
    if (s.length === 0) return t.length;
    if (t.length === 0) return s.length;

    return Math.min(
      levenshteinDistance(s.substr(1), t) + 1,
      levenshteinDistance(t.substr(1), s) + 1,
      levenshteinDistance(s.substr(1), t.substr(1)) + (s[0] !== t[0] ? 1 : 0)
    );
  }

  const checkMethod = () => {
    let arr = [];
    for (let i = 0; i < dictionary.length; i++) {
      let result = selected[i] ? (selected[i].length / 100) * 30 : 0;
      if (
        result <
        levenshteinDistance(selected[i] ? selected[i] : "", dictionary[i])
      ) {
        arr.push(dictionary[i]);
      } else {
        arr.push(selected[i]);
      }
      setDirected([...arr]);
    }
    console.log("введенное", selected[0]);
    console.log("словарь", dictionary);
    console.log("дистанция", levenshteinDistance("", dictionary[0]));
    console.log("directed", directed);
  };
  return (
    <div className="App">
      <input onChange={(e) => setSelected(e.target.value.split(" "))} />
      <button onClick={checkMethod}>Проверить</button>
      <h3>исправленный</h3>
      <div>
        текст:{" "}
        {directed.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </div>
    </div>
  );
}
