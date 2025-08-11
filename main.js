document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("page-content");

  // ========= SPA Loader =========
  async function loadPage(url, addToHistory = true) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const html = await response.text();
      const temp = document.createElement("div");
      temp.innerHTML = html;

      const newContent = temp.querySelector("main");
      if (newContent) {
        pageContent.innerHTML = newContent.innerHTML;

        if (addToHistory) {
          history.pushState({ url }, "", url);
        }

        // Run any page-specific scripts after content loads
        runPageScripts(url);
      }
    } catch (err) {
      console.error("Error loading page:", err);
      pageContent.innerHTML = `<p>Sorry, something went wrong loading this page.</p>`;
    }
  }

  // ========= Intercept Internal Links =========
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.hostname === window.location.hostname && !link.target && !link.hasAttribute("data-no-spa")) {
      e.preventDefault();
      const url = link.getAttribute("href");
      loadPage(url);
    }
  });

  // ========= Handle Browser Back/Forward =========
  window.addEventListener("popstate", (e) => {
    if (e.state?.url) {
      loadPage(e.state.url, false);
    }
  });

  // ========= Page-specific Script Loader =========
  function runPageScripts(url) {
    // Extract filename
    const page = url.split("/").pop();

    switch (page) {
      case "listings.html":
        initListingsPage();
        break;
      case "product.html":
        initProductPage();
        break;
      case "cart.html":
        initCartPage();
        break;
      case "profile.html":
        initProfilePage();
        break;
      case "repair-reuse.html":
        initRepairReusePage();
        break;
      case "auth.html":
        initAuthPage();
        break;
      default:
        initHomePage();
    }
  }

  // ========= Page-specific Functions =========
  function initListingsPage() {
    console.log("Listings page loaded.");
    // TODO: Move your listings-specific JS here from listings.html
  }

  function initProductPage() {
    console.log("Product page loaded.");
    // TODO: Move your product-specific JS here from product.html
  }

  function initCartPage() {
    console.log("Cart page loaded.");
    // TODO: Move your cart-specific JS here from cart.html
  }

  function initProfilePage() {
    console.log("Profile page loaded.");
    // TODO: Move your profile-specific JS here from profile.html
  }

  function initRepairReusePage() {
    console.log("Repair & Reuse page loaded.");
    // TODO: Move your repair-reuse-specific JS here from repair-reuse.html
  }

  function initAuthPage() {
    console.log("Auth page loaded.");
    // TODO: Move your auth-specific JS here from auth.html
  }

  function initHomePage() {
    console.log("Home page loaded.");
    // Optional: JS for your home page
  }

  // ========= Load Default Page =========
  loadPage("listings.html", false); // Change to your preferred default
});
