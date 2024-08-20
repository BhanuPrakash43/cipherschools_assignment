// import "../styles/App.css";

// import React, { useEffect, useState } from "react";
// import Questions from "./Questions";

// import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
// import { PushAnswer } from "../hooks/setResult";

// import { useSelector, useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";

// function Test() {
//   const [check, setChecked] = useState(undefined);

//   const result = useSelector((state) => state.result.result);
//   const { queue, trace } = useSelector((state) => state.questions);
//   const dispatch = useDispatch();

//   function onNext() {
//     if (trace < queue.length) {
//       dispatch(MoveNextQuestion());

//       if (result.length <= trace) {
//         dispatch(PushAnswer(check));
//       }
//     }

//     setChecked(undefined);
//   }

//   function onPrev() {
//     if (trace > 0) {
//       dispatch(MovePrevQuestion());
//     }
//   }

//   function onChecked(check) {
//     setChecked(check);
//   }

//   if (result.length && result.length >= queue.length) {
//     return <Navigate to={"/result"} replace={true}></Navigate>;
//   }

//   return (
//     <div className="container">
//       <Questions onChecked={onChecked} />

//       <div className="grid">
//         {trace > 0 ? (
//           <button className="btn prev" onClick={onPrev}>
//             Prev
//           </button>
//         ) : (
//           <div></div>
//         )}
//         <button className="btn next" onClick={onNext}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Test;

import React, { useState } from "react";
import Questions from "./Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

function Test() {
  const [check, setChecked] = useState(undefined);
  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  function onNext() {
    if (trace < queue.length - 1) {
      // Changed to queue.length - 1
      dispatch(MoveNextQuestion());

      if (check !== undefined && result.length <= trace) {
        // Check if check is defined
        dispatch(PushAnswer(check));
      }
    }
    setChecked(undefined); // Moved to the end of the function for clarity
  }

  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    // Renamed for clarity
    setChecked(check);
  }

  // Changed to result.length === queue.length
  if (result.length === queue.length) {
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  return (
    <div className="container">
      <Questions onChecked={onChecked} />
      <div className="grid">
        {trace > 0 && (
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        )}
        <button className="btn next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Test;
