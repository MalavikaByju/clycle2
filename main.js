/* main.js — SPA loader (robust; drop-in for all pages)
   - Put <script defer src="main.js?v=2"></script> on every page
   - Works with files served directly (direct load) and when navigating within the site
   - Replaces only <main> or #page-content from fetched pages (keeps header/footer)
*/

(function () {
  "use strict";

  console.log("SPA loader: starting"); // initial indicator (check console)

  document.addEventListener("DOMContentLoaded", () => {
    const ROOT_ID = "page-content"; // prefer element with this id; else fallback to first <main>
    const pageRoot = document.getElementById(ROOT_ID) || document.querySelector("main");
    if (!pageRoot) {
      console.warn("SPA loader: no <main> or #page-content found on this page. SPA will still try to work.");
    }

    // Utility: determine if a link is same-origin and internal (we will handle)
    function shouldHandleLink(link) {
      if (!link || !link.getAttribute) return false;
      const href = link.getAttribute("href");
      if (!href) return false;
      // Ignore anchors (same page) — let default behavior unless anchor on same page should be handled
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
      if (link.target === "_blank") return false;
      if (link.hasAttribute("download")) return false;
      // Hostname check — same origin
      try {
        const url = new URL(href, location.href);
        return url.origin === location.origin;
      } catch (e) {
        return false;
      }
    }

    // Fetch and replace main content
    async function fetchAndReplace(url, addToHistory = true) {
      try {
        console.log("SPA loader: navigating to", url);
        const res = await fetch(url, { headers: { "X-Requested-With": "SPA" } });
        if (!res.ok) {
          console.error("SPA loader: fetch failed", res.status);
          // fall back to full navigation if fetch fails
          location.href = url;
          return;
        }

        const text = await res.text();
        const doc = new DOMParser().parseFromString(text, "text/html");

        // pick new main content: prefer id=page-content, else the first <main>
        const newRoot = doc.getElementById(ROOT_ID) || doc.querySelector("main");
        if (!newRoot) {
          console.warn("SPA loader: fetched page has no <main>; performing full navigation");
          location.href = url;
          return;
        }

        // Replace the current pageRoot's innerHTML (if pageRoot exists)
        if (pageRoot) {
          pageRoot.innerHTML = newRoot.innerHTML;
        } else {
          // If no pageRoot on current (rare), insert new main after header or at body start
          const header = document.querySelector("header");
          const container = document.createElement("main");
          container.id = ROOT_ID;
          container.innerHTML = newRoot.innerHTML;
          if (header && header.parentNode) header.parentNode.insertBefore(container, header.nextSibling);
          else document.body.insertBefore(container, document.body.firstChild);
        }

        // Update document title if present
        const fetchedTitle = doc.querySelector("title");
        if (fetchedTitle) document.title = fetchedTitle.textContent;

        // Optionally update meta description (helpful)
        const fetchedMetaDesc = doc.querySelector('meta[name="description"]');
        if (fetchedMetaDesc) {
          let meta = document.querySelector('meta[name="description"]');
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "description");
            document.head.appendChild(meta);
          }
          meta.setAttribute("content", fetchedMetaDesc.getAttribute("content") || "");
        }

        // scroll to top on navigation
        window.scrollTo({ top: 0, behavior: "instant" });

        // push history
        if (addToHistory) history.pushState({ spa: true, url }, "", url);

        // Run page-specific code
        runPageScripts(url);
        announceForA11y(`Loaded ${document.title || url}`);
      } catch (err) {
        console.error("SPA loader: unexpected error", err);
        // final fallback
        location.href = url;
      }
    }

    // Intercept clicks on links
    document.body.addEventListener("click", (ev) => {
      const a = ev.target.closest("a");
      if (!a) return;
      if (!shouldHandleLink(a)) return;
      const href = a.getAttribute("href");
      // if href starts with '#', handle as same-page anchor
      if (href.startsWith("#")) {
        // default anchor behavior
        return;
      }
      ev.preventDefault();
      fetchAndReplace(href, true);
    });

    // Handle back/forward navigation
    window.addEventListener("popstate", (ev) => {
      // if SPA state present, load the url without pushing
      const url = location.pathname + location.search + location.hash;
      fetchAndReplace(url, false);
    });

    // Accessibility announcer
    let announcer = document.getElementById("spa-announcer");
    if (!announcer) {
      announcer = document.createElement("div");
      announcer.id = "spa-announcer";
      announcer.setAttribute("aria-live", "polite");
      announcer.style.position = "absolute";
      announcer.style.left = "-9999px";
      announcer.style.width = "1px";
      announcer.style.height = "1px";
      announcer.style.overflow = "hidden";
      document.body.appendChild(announcer);
    }
    function announceForA11y(msg) {
      announcer.textContent = "";
      setTimeout(() => (announcer.textContent = msg), 50);
    }

    // Page-specific script runner
    function runPageScripts(url) {
      // Normalize url to filename
      let path = url.split("/").pop() || "index.html";
      // If the url looks like '/some/path/' handle as index.html equivalent
      if (path === "") path = "index.html";
      console.log("SPA loader: running scripts for", path);

      // Minimal delay to allow DOM to settle (images etc. can still load)
      setTimeout(() => {
        switch (path) {
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
          case "index.html":
          case "home.html":
          default:
            initHomePage();
            break;
        }
      }, 10);
    }

    /* -------------------------
       Page initializers
       Put page-specific DOM wiring here.
       These are intentionally conservative (null-checks) so they won't crash.
       Move your real page JS inside the relevant function below.
    ------------------------- */

    function initListingsPage() {
      console.log("initListingsPage()");
      // Re-attach any event listeners for listing filters, sorters, cards
      document.querySelectorAll(".filter-btn").forEach((btn) => {
        // remove duplicate listeners if present by cloning node (safe simple approach)
        const clone = btn.cloneNode(true);
        btn.parentNode.replaceChild(clone, btn);
        clone.addEventListener("click", () => {
          const f = clone.dataset.filter || "all";
          console.log("Filter clicked:", f);
          // Do filtering logic as required
        });
      });

      // Example: attach click to product links if needed (not necessary - links are intercepted)
    }

    function initProductPage() {
      console.log("initProductPage()");
      const addToCart = document.getElementById("add-to-cart");
      if (addToCart) {
        addToCart.addEventListener("click", () => {
          // safe placeholder — replace with your actual code
          console.log("Product add-to-cart clicked");
          // show a short visual feedback
          addToCart.disabled = true;
          setTimeout(() => (addToCart.disabled = false), 700);
        });
      }
    }

    function initCartPage() {
      console.log("initCartPage()");
      document.querySelectorAll(".remove-item").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const item = btn.closest(".cart-item");
          if (item) item.remove();
        });
      });
      const checkout = document.getElementById("checkout-btn");
      if (checkout) {
        checkout.addEventListener("click", () => {
          alert("Checkout placeholder");
        });
      }
    }

    function initProfilePage() {
      console.log("initProfilePage()");
      const edit = document.getElementById("edit-profile");
      if (edit) edit.addEventListener("click", () => alert("Edit profile (placeholder)"));
      const logout = document.getElementById("logout-btn");
      if (logout) logout.addEventListener("click", () => alert("Logout (placeholder)"));
    }

    function initRepairReusePage() {
      console.log("initRepairReusePage()");
      document.querySelectorAll(".service-contact").forEach((btn) => {
        btn.addEventListener("click", () => {
          alert(`Contacting ${btn.dataset.service}`);
        });
      });
    }

    function initAuthPage() {
      console.log("initAuthPage()");
      const login = document.getElementById("login-form");
      const signup = document.getElementById("signup-form");
      const showSignup = document.getElementById("show-signup");
      const signupSection = document.getElementById("signup-section");
      if (showSignup && signupSection) {
        showSignup.addEventListener("click", (e) => {
          e.preventDefault();
          signupSection.style.display = "block";
        });
      }
      if (login) {
        login.addEventListener("submit", (e) => {
          e.preventDefault();
          alert("Login placeholder");
        });
      }
      if (signup) {
        signup.addEventListener("submit", (e) => {
          e.preventDefault();
          alert("Signup placeholder");
        });
      }
    }

    function initHomePage() {
      console.log("initHomePage()");
      // Put any home page logic here (carousels, counters etc.)
    }

    /* -------------------------
       Kickoff: if we loaded a page directly, run its scripts
    ------------------------- */
    const currentPath = location.pathname.split("/").pop() || "index.html";
    runPageScripts(currentPath);

    // Expose a small debug function for you to test from console
    window.__spa_debug = {
      fetchAndReplace,
      runPageScripts,
    };

    console.log("SPA loader: ready");
    announceForA11y("Application ready");
  }); // DOMContentLoaded
})(); 
