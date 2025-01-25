const incrementForm = document.getElementById("increment_form");
const decrementForm = document.getElementById("decrement_form");
const result = document.getElementById("result");

const initState = {
  value: 0,
};
const counterReducer = (state = initState, action) => {
  if (action.type == "increment") {
    return {
      ...state,
      value: state.value + action.value,
    };
  } else if (action.type == "decrement") {
    return {
      ...state,
      value: state.value - action.value,
    };
  } else {
    return state;
  }
};

const store = Redux.createStore(counterReducer);

const render = () => {
  const resultValue = store.getState();
  console.log(resultValue); 

  result.innerText = resultValue.value;
};
render();
store.subscribe(render);

incrementForm.addEventListener("submit", (e) => {
  e.preventDefault();
  store.dispatch({
    type: "increment",
    value: parseInt(document.querySelector(".lws-increment").value),
  });
});
decrementForm.addEventListener("submit", (e) => {
  e.preventDefault();
  store.dispatch({
    type: "decrement",
    value: parseInt(document.querySelector(".lws-decrement").value),
  });
});
