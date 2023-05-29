// Get the elements from the popup.html
const getLinksButton = document.getElementById("get-links");
const linksArea = document.getElementById("links-area");
const copyLinksButton = document.getElementById("copy-links");
const exportLinksButton = document.getElementById("export-links");

// Add a click event listener to the get links button
getLinksButton.addEventListener("click", function() {
  // Get the current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Send a message to the content script in the current tab
    chrome.tabs.sendMessage(tabs[0].id, {action: "getLinks"}, function(response) {
      // Display the links in the textarea
      linksArea.value = response?.links?.join("\n") || "There are no links on this page, If you are sure that the link exists on the page, please refresh the page";
    });
  });
});

// Add a click event listener to the copy links button
copyLinksButton.addEventListener("click", function() {
  // Copy the links to the clipboard
  navigator.clipboard.writeText(linksArea.value);
});

// Add a click event listener to the export links button
exportLinksButton.addEventListener("click", function() {
  // Create a blob object with the links as text
  const blob = new Blob([linksArea.value], {type: "text/plain"});
  // Create a URL for the blob object
  const url = URL.createObjectURL(blob);
  // Create a link element with the URL as href and download attribute
  const link = document.createElement("a");
  link.href = url;
  link.download = url.split("/").pop().slice(0,5)+".txt";
  // Append the link element to the document body
  document.body.appendChild(link);
  // Click the link element to trigger the download
  link.click();
});
