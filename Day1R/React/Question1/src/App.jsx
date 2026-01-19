import { useState } from "react";

export default function App() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: "", type: "text" }
    ]);
  };

  const updateQuestion = (id, key, value) => {
    setQuestions(
      questions.map(q =>
        q.id === id ? { ...q, [key]: value } : q
      )
    );
  };

  const removeQuestion = id => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div>
      <button onClick={addQuestion}>Add Question</button>

      {questions.map(q => (
        <div key={q.id}>
          <input
            value={q.text}
            onChange={e => updateQuestion(q.id, "text", e.target.value)}
          />
          <select
            value={q.type}
            onChange={e => updateQuestion(q.id, "type", e.target.value)}
          >
            <option value="text">text</option>
            <option value="number">number</option>
            <option value="email">email</option>
          </select>
          <button onClick={() => removeQuestion(q.id)}>Remove</button>
        </div>
      ))}

      <h3>Preview</h3>
      {questions.map(q => (
        <div key={q.id}>
          {q.text} ({q.type})
        </div>
      ))}
    </div>
  );
}
