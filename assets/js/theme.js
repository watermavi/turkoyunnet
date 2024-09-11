window.addEventListener("load", () => {
  const showNav = document.querySelector("#show-nav");
  const mainNav = document.querySelector("#main-nav-ul");
  const dropdownMenuLi = document.querySelectorAll(".dropdown-menu-li");
  const dropdownMenuSubUl = document.querySelectorAll(".sub-nav");
  let device = null;
  const modalBtnOk = document.querySelector("#modalBtnOk");

  modalBtnOk.addEventListener("click", () => {
    location.href = "https://teknodc.net/colocation";
  });
  const modalBtnOk2 = document.querySelector("#modalBtnOk2");

  modalBtnOk2.addEventListener("click", () => {
    location.href = "https://teknodc.net/dedicated";
  });


  showNav.addEventListener("click", (e) => {
    if (mainNav.getAttribute("data-is-open") === "true") {
      mainNav.style.display = "none";
      mainNav.setAttribute("data-is-open", "false");
    } else {
      mainNav.style.display = "flex";
      mainNav.setAttribute("data-is-open", "true");
    }
  });

  Array.from(dropdownMenuLi).forEach((link, index) => {
    link.addEventListener("click", (event) => {
      if (device === "mobile") {
        Array.from(dropdownMenuLi).forEach((cleanLink, cleanIndex) => {
          if (index === cleanIndex) {
            if (dropdownMenuSubUl[cleanIndex].getAttribute("style")?.includes("flex")) {
              dropdownMenuSubUl[cleanIndex].style.display = "none";
            } else {
              dropdownMenuSubUl[cleanIndex].style.display = "flex";
            }
          } else {
            dropdownMenuSubUl[cleanIndex].style.display = "none";
          }
        });
      } else {
        // event.preventDefault();
        Array.from(dropdownMenuLi).forEach((_, _index) => {
          dropdownMenuSubUl[_index].removeAttribute("style");
        });
      }
    });
  });

  const setNavStyleStatus = () => {
    if (mainNav.getAttribute("data-is-open") === "true") {
      mainNav.setAttribute("data-is-open", "false");
      mainNav.removeAttribute("style");
    } else {
      mainNav.removeAttribute("data-is-open");
      mainNav.removeAttribute("style");
    }
  };

  const checkDeviceSize = () => {
    if (window.innerWidth >= 990) {
      setNavStyleStatus();
      device = "desktop";
      Array.from(dropdownMenuLi).forEach((_, _index) => {
        dropdownMenuSubUl[_index].removeAttribute("style");
      });
    } else {
      device = "mobile";
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 990) {
        setNavStyleStatus();
        device = "desktop";
        Array.from(dropdownMenuLi).forEach((_, _index) => {
          dropdownMenuSubUl[_index].removeAttribute("style");
        });
      } else {
        device = "mobile";
      }
    });
  };

  /*
    LANG. SUPPORT.
  */

  const langLinks = document.querySelectorAll(".langLink");
  for (const langLink of langLinks) {
    langLink.addEventListener("click", (e) => {
      e.preventDefault();

      if (document.cookie.includes("googtrans")) {
        if (
          document.cookie
            .split(";")
            .filter((item) => item.includes("googtrans"))[0]
            .split("/")[2] === langLink.getAttribute("id")
        ) {
          return false;
        } else {
          if (langLink.getAttribute("id").toLowerCase() !== document.getElementsByTagName("html")[0].getAttribute("lang").toLowerCase()) {
            googleTranslateElementInit(langLink.getAttribute("id"));
          }
        }
      } else {
        if (langLink.getAttribute("id").toLowerCase() !== document.getElementsByTagName("html")[0].getAttribute("lang").toLowerCase()) {
          googleTranslateElementInit(langLink.getAttribute("id"));
        }
      }
    });
  }

  const googleTranslateElementInit = (lang) => {
    new google.translate.TranslateElement({ pageLanguage: "tr" }, "google_translate_element");

    setTimeout(() => {
      let select = document.querySelector("select.goog-te-combo");
      select.value = lang;
      select.dispatchEvent(new Event("change"));

      document.body.removeAttribute("style");
      document.body.removeAttribute("class");
      document.querySelectorAll(".skiptranslate")[0].style.display = "none";

      if (lang === "tr") {
        Array.from(document.getElementById("tr").children).forEach((childElem) => {
          if (childElem.tagName === "img" || childElem.tagName === "IMG") {
            document.getElementsByClassName("currentFlag")[0].children[0].setAttribute("src", childElem.getAttribute("src"));
          }
        });
      } else {
        Array.from(document.getElementById("en").children).forEach((childElem) => {
          if (childElem.tagName === "img" || childElem.tagName === "IMG") {
            document.getElementsByClassName("currentFlag")[0].children[0].setAttribute("src", childElem.getAttribute("src"));
          }
        });
      }
    }, 1000);
  };

  if (document.cookie.includes("googtrans")) {
    if (
      document.cookie
        .split(";")
        .filter((item) => item.includes("googtrans"))[0]
        .split("/")[2] === "en"
    ) {
      googleTranslateElementInit("en");
    } else {
      googleTranslateElementInit("tr");
    }
  } else {
    googleTranslateElementInit("tr");
  }

  /*
    CURRENCY
  */

  const currencyLinks = document.getElementsByClassName("currencyLink");
  Array.from(currencyLinks).forEach((currencyLink) => {
    currencyLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (document.cookie.includes("currentCurrency")) {
        if (
          document.cookie
            .split(";")
            .filter((item) => item.includes("currentCurrency"))[0]
            .split("=")[1] === currencyLink.getAttribute("id")
        ) {
          return false;
        } else {
          if (
            document.cookie
              .split(";")
              .filter((item) => item.includes("currentCurrency"))[0]
              .split("=")[1] !== currencyLink.getAttribute("id")
          ) {
            changeCurrency(currencyLink.getAttribute("id"));
            location.reload();
          }
        }
      } else {
        if (
          document.cookie
            .split(";")
            .filter((item) => item.includes("currentCurrency"))[0]
            .split("=")[1] !== currencyLink.getAttribute("id")
        ) {
          changeCurrency(currencyLink.getAttribute("id"));
          location.reload();
        }
      }
    });
  });

  const changeCurrency = (currencyType) => {
    if (currencyType === "tl") {
      document.cookie = "currentCurrency=tl";
      Array.from(document.getElementById("tl").children).forEach((childElem) => {
        if (childElem.tagName === "img" || childElem.tagName === "IMG") {
          document.getElementsByClassName("currentCurrency")[0].children[0].setAttribute("src", childElem.getAttribute("src"));
        }
      });
    } else {
      document.cookie = "currentCurrency=usd";
      Array.from(document.getElementById("usd").children).forEach((childElem) => {
        if (childElem.tagName === "img" || childElem.tagName === "IMG") {
          document.getElementsByClassName("currentCurrency")[0].children[0].setAttribute("src", childElem.getAttribute("src"));
        }
      });
    }
  };

  if (document.cookie.includes("currentCurrency")) {
    if (
      document.cookie
        .split(";")
        .filter((item) => item.includes("currentCurrency"))[0]
        .split("=")[1] === "tl"
    ) {
      changeCurrency("tl");
    } else {
      changeCurrency("usd");
    }
  } else {
    document.cookie = "currentCurrency=tl";
    changeCurrency("tl");
  }

  checkDeviceSize();
  AOS.init();
});