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