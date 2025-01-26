const addMatchButton = document.querySelector(".lws-addMatch");
const allMatchesContainer = document.querySelector(".all-matches");

addMatchButton.addEventListener("click", () => {
  const newMatch = document.createElement("div");
  newMatch.classList.add("match");

  newMatch.innerHTML = `
    <div class="wrapper">
      <button class="lws-delete">
        <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match ${
        allMatchesContainer.children.length + 1
      }</h3>
    </div>
    <div class="inc-dec">
      <form class="incrementForm">
        <h4>Increment</h4>
        <input type="number" name="increment" class="lws-increment" />
        <input class="submit" type="submit" value="submit">
      </form>
      <form class="decrementForm">
        <h4>Decrement</h4>
        <input type="number" name="decrement" class="lws-decrement" />
        <input class="submit" type="submit" value="submit">
      </form>
    </div>
    <div class="numbers">
      <h2 class="lws-singleResult">0</h2>
    </div>
  `;

  allMatchesContainer.appendChild(newMatch);

  const incrementForm = newMatch.querySelector(".incrementForm");
  const decrementForm = newMatch.querySelector(".decrementForm");
  const resultElement = newMatch.querySelector(".lws-singleResult");

  incrementForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const incrementValue =
      parseInt(incrementForm.querySelector(".lws-increment").value) || 0;
    resultElement.innerText =
      parseInt(resultElement.innerText) + incrementValue;
  });

  decrementForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const decrementValue =
      parseInt(decrementForm.querySelector(".lws-decrement").value) || 0;
    resultElement.innerText =
      parseInt(resultElement.innerText) - decrementValue;
  });

  const deleteButton = newMatch.querySelector(".lws-delete");
  deleteButton.addEventListener("click", () => {
    newMatch.remove();
  });
});

const incrementForm = document.getElementById("increment_form");
const decrementForm = document.getElementById("decrement_form");
const result = document.getElementById("result");
const dynamicResult = document.querySelector(".lws-singleResult");
const reset = document.getElementById("reset");
const mainDeleteBtn = document.querySelector(".lws-delete");

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
    if (state.value == 0) {
      return;
    }
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
  result.innerText = resultValue.value;
  dynamicResult.innerText = resultValue.value;
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
reset.addEventListener("click", () => {
  document.querySelector(".lws-increment").value = "";
  document.querySelector(".lws-decrement").value = "";
  document.getElementById("result").innerText = 0;

  mainDeleteBtn.addEventListener("click", () => {
    document.querySelector(".match").remove();
  });

  const allResults = allMatchesContainer.querySelectorAll(".lws-singleResult");
  const allIncrementFields =
    allMatchesContainer.querySelectorAll(".lws-increment");
  console.log(allIncrementFields);

  const allDecrementFields =
    allMatchesContainer.querySelectorAll(".lws-decrement");
  allResults.forEach((result) => {
    result.innerText = 0;
  });
  allIncrementFields.forEach((increment) => {
    increment.value = "";
  });
  allDecrementFields.forEach((decrement) => {
    decrement.value = "";
  });
});
