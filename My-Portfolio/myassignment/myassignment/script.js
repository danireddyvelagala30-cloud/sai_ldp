let localScore = Number(localStorage.getItem("localScore")) || 0;
let sessionScore = Number(sessionStorage.getItem("sessionScore")) || 0;

document.getElementById("localScore").innerHTML = localScore;
document.getElementById("sessionScore").innerHTML = sessionScore;

const incrementScore = () => {
    localScore++;
    sessionScore++;

    localStorage.setItem("localScore", localScore);
    sessionStorage.setItem("sessionScore", sessionScore);

    document.getElementById("localScore").innerHTML = localScore;
    document.getElementById("sessionScore").innerHTML = sessionScore;
};

const resetScore = () => {
    localScore = 0;
    sessionScore = 0;

    localStorage.setItem("localScore", 0);
    sessionStorage.setItem("sessionScore", 0);

    document.getElementById("localScore").innerHTML = 0;
    document.getElementById("sessionScore").innerHTML = 0;
};