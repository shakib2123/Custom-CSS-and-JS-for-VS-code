document.addEventListener("DOMContentLoaded", function () {
  function findCommandDialog() {
    const commandDialog = document.querySelector(".quick-input-widget");
    if (commandDialog) {
      if (commandDialog.style.display !== "none") {
        runMyScript();
      }
      observeCommandDialog(commandDialog);
    } else {
      requestAnimationFrame(findCommandDialog);
    }
  }

  // Observe changes to the commandDialog's style attribute
  function observeCommandDialog(commandDialog) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          if (commandDialog.style.display === "none") {
            handleEscape();
          } else {
            runMyScript();
          }
        }
      });
    });
    observer.observe(commandDialog, { attributes: true });
  }

  // Initialize DOM check for the command palette
  requestAnimationFrame(findCommandDialog);

  // Listen for command palette and escape key events
  document.addEventListener("keydown", function (event) {
    if ((event.metaKey || event.ctrlKey) && event.key === "p") {
      event.preventDefault();
      runMyScript();
    } else if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault();
      handleEscape();
    }
  });

  function runMyScript() {
    const targetDiv = document.querySelector(".monaco-workbench");

    // Remove existing element if it already exists
    const existingElement = document.getElementById("command-blur");
    if (existingElement) {
      existingElement.remove();
    }

    // Create and configure the new element
    const newElement = document.createElement("div");
    newElement.setAttribute("id", "command-blur");

    newElement.addEventListener("click", function () {
      newElement.remove();
    });

    // Append the new element as a child of the targetDiv
    targetDiv.appendChild(newElement);
  }

  // Remove the backdrop blur from the DOM when esc key is pressed
  function handleEscape() {
    const element = document.getElementById("command-blur");
    if (element) {
      element.click();
    }
  }
});
