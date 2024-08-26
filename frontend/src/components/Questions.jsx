import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(null);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, serverError }] = useFetchQuestion();

  const questions = useSelector((state) => {
    const { queue, trace } = state.questions;
    return queue[trace] || null;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (checked !== null) {
      dispatch(updateResult({ trace, checked }));
    }
  }, [checked, trace, dispatch]);

  function onSelect(i) {
    setChecked(i);
    onChecked(i);
  }

  if (isLoading) return <h3 className="text-light">Loading...</h3>;
  if (serverError)
    return (
      <h3 className="text-light">{serverError.message || "Unknown Error"}</h3>
    );
  if (!questions) return <h3 className="text-light">No Questions Available</h3>;

  const { question, options } = questions;

  return (
    <div className="questions">
      <h2 className="text-light">{question}</h2>

      <ul key={questions.id}>
        {options.map((q, i) => (
          <li key={q}>
            {" "}
            <input
              type="radio"
              value={i}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />
            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`check ${result[trace] === i ? "checked" : ""}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
