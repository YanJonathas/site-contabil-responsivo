function openTab(tabId) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tablink");

    tabs.forEach(tab => {
        tab.style.display = "none";
    });

    buttons.forEach(btn => {
        btn.classList.remove("active-tab");
    });

    document.getElementById(tabId).style.display = "block";
    event.currentTarget.classList.add("active-tab");
}

// function menu 

  let menu = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
      menu.classList.toggle('bx-x');
      navbar.classList.toggle('open');
  }

// cadastro e cliente

document.getElementById("bt-cadastro").addEventListener("click", function () {
  openTab("area-cadastro");
});

document.getElementById("bt-login").addEventListener("click", function () {
  openTab("area-login");
});

function openTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.style.display = "none");

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// perguntas frequentes

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", function () {
    const faqItem = this.parentElement;
    const faqAnswer = faqItem.querySelector(".faq-answer");

    // Fecha todos os outros itens abertos
    document.querySelectorAll(".faq-item").forEach(item => {
      if (item !== faqItem && item.classList.contains("active")) {
        item.classList.remove("active");
        item.querySelector(".faq-answer").style.maxHeight = null;
        item.querySelector(".faq-answer").style.padding = "0 10px";
      }
    });

    // Alterna o item clicado
    faqItem.classList.toggle("active");

    if (faqItem.classList.contains("active")) {
      faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 20 + "px"; // +20 para garantir espaço adicional
      faqAnswer.style.padding = "10px";
    } else {
      faqAnswer.style.maxHeight = null;
      faqAnswer.style.padding = "0 10px";
    }
  });
});





