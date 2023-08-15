const ticketTitleElement = document.getElementById("summary-val");
const ticketNumberElement = document.getElementById("key-val");

const transformations = [
    [/\n/g, "-"],       // Replace newline characters with hyphens
    [/[^a-zA-Z0-9\s\-/]/g, ""], // Remove non-alphanumeric characters except space, hyphen, and slash
    [/\s/g, "-"],       // Replace spaces with hyphens
    [/\//g, "-"],       // Replace slashes with hyphens
    [/:/g, ""],         // Remove colons
    [/-+/g, "-"],       // Replace consecutive hyphens with a single hyphen
    [/^-+|-+$/g, ""]    // Remove hyphens from the beginning and end
];

if (ticketTitleElement && ticketNumberElement) {
	const buttonContainer = document.createElement("div");
	buttonContainer.style.marginTop = "10px";
	const createButton = (buttonId, buttonText) => {
		const ticketNumber = ticketNumberElement.innerText.trim();
      	const ticketTitle = ticketTitleElement.innerText.trim();

    	const button = document.createElement("button");
    	button.id = buttonId;
    	button.innerText = buttonText;
    	button.style.marginRight = "5px";
    	button.addEventListener("click", () => {
    		let string = `${ticketNumber} ${ticketTitle}`
  			for (const [regex, replacement] of transformations) {
    			string = string.replace(regex, replacement);
  			}

      		const textToCopy = `${buttonId}/${string}`;
      		navigator.clipboard.writeText(textToCopy);
   	 	});
    	return button;
  };

  buttonContainer.appendChild(createButton("feature", "Feature"));
  buttonContainer.appendChild(createButton("bugfix", "Bugfix"));
  buttonContainer.appendChild(createButton("release", "Release"));

  ticketTitleElement.insertAdjacentElement("afterend", buttonContainer);
}
