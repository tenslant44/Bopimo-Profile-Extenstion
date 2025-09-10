(function () {
  function addProfileLink() {
    // Ensure the nav structure exists in body
    const ul = document.querySelector("#app.content nav.navbar div.container ul.left");
    if (!ul) return;

    // Get the username from the meta tag inside <head>
    const metaUser = document.head.querySelector('meta[name="user"]');
    if (!metaUser) return;

    let metaContent = metaUser.getAttribute("resource");
    if (!metaContent) return;

    try {
      // Decode JSON-like string safely
      metaContent = metaContent.replace(/&quot;/g, '"');
      const userData = JSON.parse(metaContent);
      const username = userData.username;
      if (!username) return;

      const profileURL = `/users/${username}`;

      // Check if profile link already exists
      if (!ul.querySelector(`a[href="${profileURL}"]`)) {
        // Duplicate the last li
        const lastLi = ul.lastElementChild;
        if (!lastLi) return;

        const newLi = lastLi.cloneNode(true);
        const a = newLi.querySelector("a");
        if (a) {
          a.href = profileURL;
          a.textContent = "Profile"; // Change link text
        }

        // Insert at the end
        ul.appendChild(newLi);
      }

    } catch (err) {
      console.error("Failed to parse user meta tag:", err);
    }
  }

  // Run immediately
  addProfileLink();

  // Observe body for dynamic changes
  const observer = new MutationObserver(addProfileLink);
  observer.observe(document.body, { childList: true, subtree: true });
})();
