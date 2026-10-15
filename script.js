/* =========================================
   🎀 BIRTHDAY WEBSITE
   JAVASCRIPT
========================================= */


/* =========================================
   🔐 PASSCODE
========================================= */

/*
   ĐỔI DÒNG NÀY THÀNH MẬT KHẨU CỦA EM

   Ví dụ:
   "151000"
*/

const CORRECT_CODE = "151000";


let enteredCode = "";



/* =========================================
   📌 ELEMENTS
========================================= */

const lockScreen =
  document.getElementById("lock-screen");


const birthdayPage =
  document.getElementById("birthday-page");


const codeDisplay =
  document.getElementById("code-display");


const wrongCode =
  document.getElementById("wrong-code");


const enterBtn =
  document.getElementById("enter-btn");


const deleteBtn =
  document.getElementById("delete-btn");


const heartContainer =
  document.querySelector(".hearts");


const slots = [
  ...codeDisplay.querySelectorAll("span")
];


const numberButtons = [
  ...document.querySelectorAll("[data-number]")
];



/* =========================================
   🔢 UPDATE 6 Ô SỐ
========================================= */

function updateDisplay() {

  slots.forEach((slot, index) => {

    if (index < enteredCode.length) {

      // HIỆN SỐ THẬT
      slot.textContent =
        enteredCode[index];

      slot.classList.add("filled");

    } else {

      slot.textContent = "";

      slot.classList.remove("filled");

    }

  });

}



/* =========================================
   ➕ NHẬP SỐ
========================================= */

function addNumber(number) {

  // Không cho quá 6 số
  if (enteredCode.length >= 6) {

    return;

  }


  enteredCode += number;


  // Xóa thông báo sai
  wrongCode.classList.remove("show");


  updateDisplay();


  // Nhập đủ 6 số
  if (enteredCode.length === 6) {

    setTimeout(() => {

      checkCode();

    }, 250);

  }

}



/* =========================================
   ⌫ XÓA SỐ
========================================= */

function deleteNumber() {

  enteredCode =
    enteredCode.slice(0, -1);


  wrongCode.classList.remove("show");


  updateDisplay();

}



/* =========================================
   🔐 KIỂM TRA MẬT KHẨU
========================================= */

function checkCode() {

  // Nếu chưa đủ 6 số
  if (enteredCode.length !== 6) {

    return;

  }


  /* ================================
     💗 ĐÚNG MẬT KHẨU
  ================================= */

  if (enteredCode === CORRECT_CODE) {

    lockScreen.classList.add("hidden");


    birthdayPage.classList.remove("hidden");


    // Về đầu trang
    window.scrollTo(0, 0);

  }


  /* ================================
     💔 SAI MẬT KHẨU
  ================================= */

  else {

    wrongCode.classList.add("show");


    codeDisplay.classList.add("shake");


    setTimeout(() => {

      codeDisplay.classList.remove("shake");

    }, 400);


    // Xóa sau khi báo sai
    setTimeout(() => {

      enteredCode = "";

      updateDisplay();

    }, 450);

  }

}



/* =========================================
   🔢 NÚT SỐ
========================================= */

numberButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      addNumber(
        button.dataset.number
      );

    }
  );

});



/* =========================================
   ⌫ DELETE
========================================= */

deleteBtn.addEventListener(
  "click",
  deleteNumber
);



/* =========================================
   ↪ ENTER
========================================= */

enterBtn.addEventListener(
  "click",
  checkCode
);



/* =========================================
   ⌨️ BÀN PHÍM MÁY TÍNH
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    // Nhấn số
    if (/^\d$/.test(event.key)) {

      addNumber(event.key);

    }


    // Backspace
    if (event.key === "Backspace") {

      deleteNumber();

    }


    // Enter
    if (event.key === "Enter") {

      checkCode();

    }

  }
);



/* =========================================
   💗 FLOATING HEARTS
========================================= */

function createHeart() {

  // Chưa mở birthday thì không tạo
  if (
    birthdayPage.classList.contains("hidden")
  ) {

    return;

  }


  const heart =
    document.createElement("span");


  // Random ký tự
  heart.textContent =
    Math.random() > 0.5
      ? "♡"
      : "✦";


  heart.style.position =
    "fixed";


  heart.style.left =
    `${Math.random() * 100}vw`;


  heart.style.bottom =
    "-20px";


  heart.style.color =
    "#ed76a5";


  heart.style.opacity =
    "0.45";


  heart.style.fontSize =
    `${10 + Math.random() * 14}px`;


  heart.style.pointerEvents =
    "none";


  heart.style.zIndex =
    "50";


  heart.style.animation =
    "floatHeart 5s linear forwards";


  heartContainer.appendChild(
    heart
  );


  setTimeout(() => {

    heart.remove();

  }, 5000);

}



/* =========================================
   ✨ ANIMATION CSS BỔ SUNG
========================================= */

const animationStyle =
  document.createElement("style");


animationStyle.textContent = `

@keyframes floatHeart {

  0% {

    transform:
      translateY(0)
      rotate(0deg);

    opacity: .45;

  }

  100% {

    transform:
      translateY(-105vh)
      rotate(180deg);

    opacity: 0;

  }

}


.shake {

  animation:
    passcodeShake
    .4s
    ease;

}


@keyframes passcodeShake {

  0% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-7px);
  }

  40% {
    transform: translateX(7px);
  }

  60% {
    transform: translateX(-6px);
  }

  80% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0);
  }

}

`;


document.head.appendChild(
  animationStyle
);



/* =========================================
   💕 TẠO TIM MỖI 0.9 GIÂY
========================================= */

setInterval(
  createHeart,
  900
);



/* =========================================
   🚀 KHỞI ĐỘNG
========================================= */

updateDisplay();