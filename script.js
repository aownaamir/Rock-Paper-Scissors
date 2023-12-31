let Buttons = {
  Border: "50%",
};
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    game("rock");
  } else if (event.key === "p") {
    game("paper");
  } else if (event.key === "s") {
    game("scissors");
  } else if (event.key === "a") {
    autoplay();
  } else if (event.key === "Backspace") {
    reset();
  }
});
document.querySelector(".rock").addEventListener("click", () => {
  game("rock");
});
document.querySelector(".paper").addEventListener("click", () => {
  game("paper");
});
document.querySelector(".scissors").addEventListener("click", () => {
  game("scissors");
});

document.querySelector(".r-button").addEventListener("click", () => {
  reset();
});
document.querySelector(".auto-play").addEventListener("click", () => {
  autoplay();
});

function changeButton(tvalue) {
  if (tvalue === "t1") {
    document.querySelector(".t1").style.borderRadius = "50%";
    document.querySelector(".t2").style.borderRadius = "50%";
    document.querySelector(".t3").style.borderRadius = "50%";
    document.querySelector(".rock").style.borderRadius = "50%";
    document.querySelector(".paper").style.borderRadius = "50%";
    document.querySelector(".scissors").style.borderRadius = "50%";
    document.querySelector(".r-button").style.borderRadius = "50%";
    document.querySelector(".auto-play").style.borderRadius = "50%";
    document.querySelector(".yes").style.borderRadius = "50%";
    document.querySelector(".no").style.borderRadius = "50%";
  } else if (tvalue === "t2") {
    document.querySelector(".t1").style.borderRadius = "3px";
    document.querySelector(".t2").style.borderRadius = "3px";
    document.querySelector(".t3").style.borderRadius = "3px";
    document.querySelector(".rock").style.borderRadius = "10px";
    document.querySelector(".paper").style.borderRadius = "10px";
    document.querySelector(".scissors").style.borderRadius = "10px";
    document.querySelector(".r-button").style.borderRadius = "10px";
    document.querySelector(".auto-play").style.borderRadius = "10px";
    document.querySelector(".yes").style.borderRadius = "10px";
    document.querySelector(".no").style.borderRadius = "10px";
  } else if (tvalue === "t3") {
    document.querySelector(".button").style.borderRadius = "15px";
  }
}

function doms() {
  document.querySelector(".js-score").innerHTML =
    "Wins: " + score.Wins + " Losses: " + score.Losses + " Ties: " + score.Ties;
}

let score = localStorage.getItem("score")
  ? JSON.parse(localStorage.getItem("score"))
  : { Wins: 0, Losses: 0, Ties: 0 };

function reset() {
  document.querySelector(".warning").innerHTML =
    "Are you sure you want to reset the score? " +
    `<button class="reset2 yes">Yes</button>` +
    " " +
    `<button class="reset2 no">No</button>`;
  document.querySelector(".yes").addEventListener("click", () => {
    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;
    document.querySelector(".warning").innerHTML = "";
    doms();
  });
  document.querySelector(".no").addEventListener("click", () => {
    document.querySelector(".warning").innerHTML = "";
  });
}

function computerMove() {
  let val = Math.random();
  let comp;

  if (val < 1 && val >= 2 / 3) {
    comp = "rock";
  } else if (val < 2 / 3 && val >= 1 / 3) {
    comp = "paper";
  } else if (val < 1 / 3 && val >= 0) {
    comp = "scissors";
  }
  return comp;
}

function game(myMove) {
  let compMove = computerMove(); //comp is saved in compMove

  let result;

  if (myMove === "rock") {
    if (compMove === "rock") result = "It's a tie!";
    else if (compMove === "paper") {
      result = "Computer Wins!";
    } else if (compMove === "scissors") {
      result = "You Win!";
    }
  } else if (myMove === "paper") {
    if (compMove === "rock") result = "You Win!";
    else if (compMove === "paper") {
      result = "It's a tie!";
    } else if (compMove === "scissors") {
      result = "Computer Wins!";
    }
  } else if (myMove === "scissors") {
    if (compMove === "rock") result = "Computer Wins!";
    else if (compMove === "paper") {
      result = "You Win!";
    } else if (compMove === "scissors") {
      result = "It's a tie!";
    }
  }

  if (result == "You Win!") {
    score.Wins += 1;
  } else if (result == "Computer Wins!") {
    score.Losses += 1;
  } else if (result == "It's a tie!") {
    score.Ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-statement").innerHTML =
    "You " +
    `<img src="images/${myMove}-emoji.png"class="icon">` +
    " " +
    " Computer " +
    `<img src="images/${compMove}-emoji.png"class="icon">`;
  doms();
}

let isAutoPlaying = false;
let intervalID;

function autoplay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const myMove = computerMove();
      game(myMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".auto-play").innerHTML = "Stop Playing";
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector(".auto-play").innerHTML = "Auto Play";
  }
}
