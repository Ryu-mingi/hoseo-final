const header = document.getElementById("header");
const originalText = header.textContent;
const boxElements = document.querySelectorAll('.boxTeam');

document.addEventListener('DOMContentLoaded', function() {
  var logoElements = document.querySelectorAll('.logo');
  logoElements.forEach(function(logo) {
    logo.style.opacity = '0';
  });
});

function showLogo(element) {
  const textParts = element.querySelectorAll(".text-part");
  const logo = element.querySelector(".logo");

  for (let i = 0; i < textParts.length; i++) {
    textParts[i].style.opacity = "0";
  }
  logo.style.opacity = "1";
}

function hideLogo(element) {
  const textParts = element.querySelectorAll(".text-part");
  const logo = element.querySelector(".logo");

  for (let i = 0; i < textParts.length; i++) {
    textParts[i].style.opacity = "1";
  }
  logo.style.opacity = "0";
}


boxElements.forEach(function(box) {
  box.addEventListener('mouseover', function() {
    showLogo(this);
  });
  box.addEventListener('mouseout', function() {
    hideLogo(this);
  });
});

function changeText() {
  header.textContent = "Back";
}

function restoreText() {
  header.textContent = originalText;
}


header.addEventListener("mouseover", changeText);
header.addEventListener("mouseout", restoreText);
