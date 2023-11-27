const header1 = document.getElementById("header1");
const originalText = header1.textContent;

function changeText() {
    header1.textContent = "Back";
}

function restoreText() {
    header1.textContent = originalText;
}

header1.addEventListener("mouseover", changeText);
header1.addEventListener("mouseout", restoreText);