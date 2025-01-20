// DOM ELEMENTS
const inputText = document.querySelector(".input");
const deleteTextButton = document.querySelector(".delete-text-button");
const uppercaseButton = document.querySelector(".uppercase-button");
const lowercaseButton = document.querySelector(".lowercase-button");
const capitalizeButton = document.querySelector(".capitalize-button");
const outputText = document.querySelectorAll(".output-text");
const copyButtons = document.querySelectorAll(".copy-button");

// UPDATE OUTPUT TEXT
function updateOutputText(index, convertFunction) {
  copyButtons[index].style.display = inputText.value.length > 0 ? "flex" : "none";
  outputText[index].innerText = convertFunction(inputText.value);
}

// INPUT
inputText.addEventListener("input", () => {
  updateOutputText(0, convertToSpecialFont1); // Sans Serif Negrita
  updateOutputText(1, convertToSpecialFont2); // Serif Negrita
  updateOutputText(2, convertToSpecialFont3); // Monoespaciado
  updateOutputText(3, convertToSpecialFont4); // Doble
  updateOutputText(4, convertToSpecialFont5); // Escritura
  updateOutputText(5, convertToSpecialFont6); // Escritura Negrita
  updateOutputText(6, convertToSpecialFont7); // Subrayado Simple
  updateOutputText(7, convertToSpecialFont8); // Subrayado Doble
  updateOutputText(8, convertToSpecialFont9); // Burbuja 1 
  updateOutputText(9, convertToSpecialFont10); // Burbuja 2 
  updateOutputText(10, convertToSpecialFont11); // Cuadrado 1
  updateOutputText(11, convertToSpecialFont12); // Cuadrado 2
});

// RESET ALL VALUES
deleteTextButton.addEventListener("click", () => {
  // Clear the input text value
  inputText.value = "";

  // Focus on the input
  inputText.focus();

  // Clear the inner text of each output paragraph
  outputText.forEach(output => {
    output.innerText = "";
  });

  copyButtons.forEach(btn => {
    // Hide the copy button
    btn.style.display = "none";

    // Remove the "copied" class of each button
    btn.classList.remove("copied")

    // Reset the text of the small tag
    const smallTag = btn.querySelector("small");
    if (smallTag) {
      smallTag.innerText = "Copiar";
    }
  })
})

// UPPERCASE BUTTON
uppercaseButton.addEventListener("click", () => {
  inputText.value = inputText.value.toUpperCase();
  inputText.dispatchEvent(new Event("input"));
  inputText.focus();
})

// LOWERCASE BUTTON
lowercaseButton.addEventListener("click", () => {
  inputText.value = inputText.value.toLowerCase();
  inputText.dispatchEvent(new Event("input"));
  inputText.focus();
})

// CAPITALIZE BUTTON
capitalizeButton.addEventListener("click", () => {
  const text = inputText.value.toLowerCase();
  inputText.value = text.charAt(0).toUpperCase() + text.slice(1);
  inputText.dispatchEvent(new Event("input"));
  inputText.focus();
})

// COPY TEXT
copyButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Get the text content to copy from the corresponding output paragraph
    const textToCopy = outputText[index].innerText;

    // Create a temporary text input field for copying
    const tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;

    // Set the text input field as absolute position and off-screen
    tempInput.style.position = "absolute";
    tempInput.style.left = "-9999px";

    // Add the text input field to the body of the document
    document.body.appendChild(tempInput);

    // Select and copy the text into the text entry field
    tempInput.select();
    document.execCommand("copy");

    // Delete the temporary text input field
    document.body.removeChild(tempInput);

    // Reset the text and classes of all buttons
    copyButtons.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        // Reset the text of the small tag within other buttons to "Copy"
        const smallTag = otherBtn.querySelector("small");
        if (smallTag) {
          smallTag.innerText = "Copiar";

          // Remove the "copied" class from other buttons
          otherBtn.classList.remove("copied");
        }
      }
    });

    // Assign "Copied" to the current button and add the "copied" class
    const currentSmall = btn.querySelector("small");
    if (currentSmall) {
      currentSmall.innerText = "Copiado";
      btn.classList.add("copied");
    }
  });
});