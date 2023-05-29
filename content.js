  
  // Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Check if the action is to get links
    if (request.action === "getLinks") {
      // Get all anchor elements in the document
      const anchors = document.getElementsByTagName("a");
      // Filter the anchors that have a download attribute or a href that ends with a file extension
      const downloadAnchors = Array.from(anchors).filter(a => a.hasAttribute("download") || a.href.match(/\.\w+$/));
      // Map the download anchors to their href values
      const downloadLinks = downloadAnchors.map(a => a.href);
      // Send the download links as a response
      sendResponse({links: downloadLinks});
    }
  });
  