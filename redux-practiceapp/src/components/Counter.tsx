import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";

import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "../features/counter/counterSlice";

const Counter = () => {
  const count = useSelector(
    (state: RootState) => state.counter.value
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Redux Counter</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>
        +
      </button>

      <button onClick={() => dispatch(decrement())}>
        -
      </button>

      <button onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
};

export default Counter;