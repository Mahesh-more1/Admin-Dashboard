// Admin Dashboard - Enterprise SPA Controller

document.addEventListener("DOMContentLoaded", () => {
  // DOM ELEMENT REFERENCES
  const appSidebar = document.getElementById("app-sidebar");
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const themeToggler = document.querySelector(".theme-toggler");
  const changeLogoColor = document.querySelector(".change-logo-color");
  const changeSloganColor = document.querySelector(".change-slogan-color");
  const headerPageTitle = document.getElementById("header-page-title");

  // Navigation Links & Sections
  const navItems = document.querySelectorAll(".sidebar-nav a[data-view]");
  const viewSections = document.querySelectorAll(".view-section");

  // Global UI Overlays
  const toastContainer = document.getElementById("toast-container");
  const globalModal = document.getElementById("global-modal");
  const modalBody = document.getElementById("modal-body-container");
  const modalCloseX = document.getElementById("modal-close-x");

  // Header Dropdown Controls
  const globalSearchInput = document.getElementById("global-search-input");
  const searchDropdown = document.getElementById("search-dropdown");
  const btnNotifToggle = document.getElementById("btn-notif-toggle");
  const notifDropdown = document.getElementById("notif-dropdown");
  const notifDotBadge = document.getElementById("notif-dot-badge");
  const notifListContainer = document.getElementById("notif-list-container");
  const btnMarkNotifsRead = document.getElementById("btn-mark-notifs-read");
  const profileTrigger = document.getElementById("profile-trigger");
  const profileDropdown = document.getElementById("profile-dropdown");

  // Load Initial Store Data
  let store = window.getStore();

  // ----------------------------------------------------
  // TOAST NOTIFICATION ENGINE
  // ----------------------------------------------------
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;

    let iconName = "info";
    if (type === "success") iconName = "check_circle";
    if (type === "warning") iconName = "warning";
    if (type === "danger") iconName = "error";

    toast.innerHTML = `<span class="material-icons-sharp">${iconName}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideInRight 300ms ease reverse forwards";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ----------------------------------------------------
  // MODAL DIALOG ENGINE
  // ----------------------------------------------------
  function openModal(contentHtml) {
    modalBody.innerHTML = contentHtml;
    globalModal.classList.remove("hidden");
  }

  function closeModal() {
    globalModal.classList.add("hidden");
    modalBody.innerHTML = "";
  }

  if (modalCloseX) modalCloseX.addEventListener("click", closeModal);
  globalModal.addEventListener("click", (e) => {
    if (e.target === globalModal) closeModal();
  });

  // ----------------------------------------------------
  // NAVIGATION CONTROLLER & PAGE TITLES
  // ----------------------------------------------------
  const pageTitles = {
    dashboard: "Dashboard",
    customers: "Customer Directory",
    orders: "Order & Fulfillment",
    analytics: "Analytics & Intelligence",
    messages: "Messages & Support Inbox",
    products: "Product Catalog & Inventory",
    reports: "Reports & Audit Exporter",
    settings: "System Preferences",
    "add-product": "Publish New Product"
  };

  function navigateToView(viewName) {
    if (viewName === "logout") {
      handleLogoutPrompt();
      return;
    }

    // Hide all view sections
    viewSections.forEach((sec) => sec.classList.remove("active"));

    // Activate target view
    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) {
      targetSection.classList.add("active");
    }

    // Update active nav link
    navItems.forEach((link) => {
      if (link.getAttribute("data-view") === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update Header Title
    if (headerPageTitle && pageTitles[viewName]) {
      headerPageTitle.textContent = pageTitles[viewName];
    }

    // Close Mobile Sidebar
    appSidebar.classList.remove("show-sidebar");

    // Close Dropdowns
    closeAllDropdowns();

    // Render Section Data
    renderViewData(viewName);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navItems.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const view = link.getAttribute("data-view");
      navigateToView(view);
    });
  });

  // Mobile menu open/close
  if (menuBtn) menuBtn.addEventListener("click", () => appSidebar.classList.add("show-sidebar"));
  if (closeBtn) closeBtn.addEventListener("click", () => appSidebar.classList.remove("show-sidebar"));

  // Clickable shortcut widgets
  document.querySelectorAll(".clickable-widget").forEach((widget) => {
    widget.addEventListener("click", () => {
      const target = widget.getAttribute("data-target-view");
      if (target) navigateToView(target);
    });
  });

  // ----------------------------------------------------
  // THEME TOGGLER CONTROLLER
  // ----------------------------------------------------
  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-theme-variables");
      themeToggler.querySelector("span:nth-child(1)").classList.remove("active");
      themeToggler.querySelector("span:nth-child(2)").classList.add("active");
      if (changeLogoColor) changeLogoColor.setAttribute("fill", "#ffffff");
      if (changeSloganColor) changeSloganColor.setAttribute("fill", "#00E5FF");
      store.settings.theme = "dark";
    } else {
      document.body.classList.remove("dark-theme-variables");
      themeToggler.querySelector("span:nth-child(1)").classList.add("active");
      themeToggler.querySelector("span:nth-child(2)").classList.remove("active");
      if (changeLogoColor) changeLogoColor.setAttribute("fill", "#111111");
      if (changeSloganColor) changeSloganColor.setAttribute("fill", "#2b3595");
      store.settings.theme = "light";
    }
    window.saveStore(store);
  }

  themeToggler.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme-variables");
    applyTheme(isDark);
    showToast(`Switched to ${isDark ? "Dark" : "Light"} Mode`, "info");
  });

  if (store.settings && store.settings.theme === "dark") {
    applyTheme(true);
  }

  // ----------------------------------------------------
  // DROPDOWNS & GLOBAL SEARCH CONTROLLER
  // ----------------------------------------------------
  function closeAllDropdowns() {
    searchDropdown.classList.add("hidden");
    notifDropdown.classList.add("hidden");
    profileDropdown.classList.add("hidden");
  }

  // Notifications Toggle
  if (btnNotifToggle) {
    btnNotifToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = notifDropdown.classList.contains("hidden");
      closeAllDropdowns();
      if (isHidden) {
        renderNotificationsList();
        notifDropdown.classList.remove("hidden");
      }
    });
  }

  if (btnMarkNotifsRead) {
    btnMarkNotifsRead.addEventListener("click", () => {
      store.notifications.forEach((n) => (n.read = true));
      window.saveStore(store);
      renderNotificationsList();
      showToast("All notifications marked read", "success");
    });
  }

  function renderNotificationsList() {
    let unreadCount = 0;
    notifListContainer.innerHTML = "";

    store.notifications.forEach((n) => {
      if (!n.read) unreadCount++;
      const div = document.createElement("div");
      div.className = `notif-item ${n.read ? "read" : ""}`;
      div.innerHTML = `
        <div class="notif-icon"><span class="material-icons-sharp">${n.icon || "notifications"}</span></div>
        <div>
          <b>${n.title}</b>
          <p style="font-size:0.78rem;">${n.text}</p>
          <small class="text-muted">${n.time}</small>
        </div>
      `;
      div.addEventListener("click", () => {
        n.read = true;
        window.saveStore(store);
        renderNotificationsList();
      });
      notifListContainer.appendChild(div);
    });

    if (notifDotBadge) {
      notifDotBadge.style.display = unreadCount > 0 ? "block" : "none";
    }
  }
  renderNotificationsList();

  // Profile Dropdown Toggle
  if (profileTrigger) {
    profileTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = profileDropdown.classList.contains("hidden");
      closeAllDropdowns();
      if (isHidden) profileDropdown.classList.remove("hidden");
    });
  }

  document.querySelectorAll(".profile-dropdown .dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const action = item.getAttribute("data-action");
      if (action === "settings-profile" || action === "settings-app") {
        navigateToView("settings");
      } else if (action === "logout") {
        handleLogoutPrompt();
      }
    });
  });

  // Global Header Search
  if (globalSearchInput) {
    globalSearchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query) {
        searchDropdown.classList.add("hidden");
        return;
      }

      let results = [];

      // Search Orders
      store.orders.forEach((ord) => {
        if (ord.productName.toLowerCase().includes(query) || ord.productNumber.includes(query) || ord.customer.toLowerCase().includes(query)) {
          results.push({
            type: "Order",
            icon: "receipt_long",
            title: `Order #${ord.productNumber} - ${ord.productName}`,
            sub: `Customer: ${ord.customer} | $${ord.price}`,
            action: () => openOrderDetailsModal(ord.productNumber)
          });
        }
      });

      // Search Products
      store.products.forEach((prod) => {
        if (prod.name.toLowerCase().includes(query) || prod.sku.toLowerCase().includes(query) || prod.category.toLowerCase().includes(query)) {
          results.push({
            type: "Product",
            icon: "inventory",
            title: prod.name,
            sub: `SKU: ${prod.sku} | $${prod.price} | Stock: ${prod.stock}`,
            action: () => {
              navigateToView("products");
              openEditProductModal(prod.id);
            }
          });
        }
      });

      // Search Customers
      store.customers.forEach((cust) => {
        if (cust.name.toLowerCase().includes(query) || cust.email.toLowerCase().includes(query) || cust.location.toLowerCase().includes(query)) {
          results.push({
            type: "Customer",
            icon: "person",
            title: cust.name,
            sub: `${cust.email} | ${cust.location}`,
            action: () => {
              navigateToView("customers");
              openCustomerDetailsModal(cust.id);
            }
          });
        }
      });

      searchDropdown.innerHTML = "";
      if (results.length === 0) {
        searchDropdown.innerHTML = `<div style="padding:1rem; text-align:center;" class="text-muted">No matches found for "${query}"</div>`;
      } else {
        results.slice(0, 8).forEach((res) => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "search-result-item";
          itemDiv.innerHTML = `
            <div class="search-icon-box"><span class="material-icons-sharp">${res.icon}</span></div>
            <div>
              <b>${res.title}</b>
              <small class="text-muted" style="display:block;">${res.sub}</small>
            </div>
          `;
          itemDiv.addEventListener("click", () => {
            res.action();
            searchDropdown.classList.add("hidden");
            globalSearchInput.value = "";
          });
          searchDropdown.appendChild(itemDiv);
        });
      }
      searchDropdown.classList.remove("hidden");
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#header-search-container") && !e.target.closest("#notif-wrapper") && !e.target.closest("#profile-wrapper")) {
      closeAllDropdowns();
    }
  });

  // ----------------------------------------------------
  // SECTION VIEW RENDERERS
  // ----------------------------------------------------
  function renderViewData(viewName) {
    store = window.getStore();

    if (viewName === "dashboard") {
      renderDashboardOrders();
      renderUpdatesFeed();
    } else if (viewName === "customers") {
      renderCustomersView();
    } else if (viewName === "orders") {
      renderOrdersView();
    } else if (viewName === "messages") {
      renderMessagesInbox();
    } else if (viewName === "products") {
      renderProductsView();
    } else if (viewName === "settings") {
      renderSettingsView();
    }

    updateUnreadBadges();
  }

  function updateUnreadBadges() {
    let unreadMsgCount = store.messages.filter((m) => m.unread).length;
    const badge = document.getElementById("sidebar-msg-badge");
    if (badge) {
      badge.textContent = unreadMsgCount;
      badge.style.display = unreadMsgCount > 0 ? "inline-block" : "none";
    }
  }

  // 1. DASHBOARD VIEW RENDERER
  function renderDashboardOrders() {
    const tbody = document.getElementById("dashboard-orders-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    store.orders.slice(0, 6).forEach((order) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><b>${order.productName}</b></td>
        <td>#${order.productNumber}</td>
        <td>${order.customer}</td>
        <td><b>$${order.price}</b></td>
        <td><span class="badge-tag ${order.paymentStatus === 'Paid' ? 'success' : order.paymentStatus === 'Refunded' ? 'danger' : 'warning'}">${order.paymentStatus}</span></td>
        <td class="${order.shipping === 'Declined' ? 'danger' : order.shipping === 'Pending' ? 'warning' : 'success'}">${order.shipping}</td>
        <td>
          <button class="btn-outline-sm btn-order-details" data-num="${order.productNumber}">Details</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".btn-order-details").forEach((btn) => {
      btn.addEventListener("click", () => openOrderDetailsModal(btn.getAttribute("data-num")));
    });
  }

  function renderUpdatesFeed() {
    const feed = document.getElementById("updates-feed-container");
    if (!feed) return;
    feed.innerHTML = "";

    store.updates.forEach((upd) => {
      const div = document.createElement("div");
      div.className = "update-row";
      div.innerHTML = `
        <div class="profile-photo" style="width:2.4rem; height:2.4rem;"><img src="${upd.avatar}" alt="${upd.name}" /></div>
        <div>
          <p style="font-size:0.83rem;"><b>${upd.name}</b> ${upd.action}</p>
          <small class="text-muted">${upd.time}</small>
        </div>
      `;
      feed.appendChild(div);
    });
  }

  const dashDateInput = document.getElementById("dashboard-date-filter");
  if (dashDateInput) {
    dashDateInput.value = new Date().toISOString().split("T")[0];
    dashDateInput.addEventListener("change", (e) => showToast(`Dashboard metrics refreshed for ${e.target.value}`, "success"));
  }

  document.getElementById("btn-dash-view-all-orders")?.addEventListener("click", () => navigateToView("orders"));

  // 2. CUSTOMERS VIEW RENDERER
  function renderCustomersView() {
    const tbody = document.getElementById("customers-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const query = document.getElementById("cust-search-input")?.value.toLowerCase().trim() || "";
    const statusFilter = document.getElementById("cust-status-filter")?.value || "all";
    const tierFilter = document.getElementById("cust-tier-filter")?.value || "all";

    const filtered = store.customers.filter((c) => {
      const matchQuery = c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query) || c.location.toLowerCase().includes(query);
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchTier = tierFilter === "all" || c.vipTier === tierFilter;
      return matchQuery && matchStatus && matchTier;
    });

    document.getElementById("cust-stat-total").textContent = store.customers.length;
    document.getElementById("cust-stat-active").textContent = store.customers.filter((c) => c.status === "Active").length;

    filtered.forEach((cust) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <div style="display:flex; align-items:center; gap:0.8rem;">
            <div class="profile-photo"><img src="${cust.image}" alt="${cust.name}" /></div>
            <div><b>${cust.name}</b><small class="text-muted" style="display:block;">Joined ${cust.joinedDate}</small></div>
          </div>
        </td>
        <td>${cust.email}<small class="text-muted" style="display:block;">${cust.phone}</small></td>
        <td>${cust.location}</td>
        <td><span class="badge-tag primary">${cust.vipTier || 'Gold'}</span></td>
        <td><b>${cust.ordersCount}</b></td>
        <td><b>$${cust.spent.toLocaleString()}</b></td>
        <td><span class="badge-tag ${cust.status === 'Active' ? 'success' : 'danger'}">${cust.status}</span></td>
        <td>
          <button class="btn-outline-sm btn-cust-view" data-id="${cust.id}">View</button>
          <button class="btn-danger-sm btn-cust-del" data-id="${cust.id}" style="margin-left:0.3rem;">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".btn-cust-view").forEach((btn) => {
      btn.addEventListener("click", () => openCustomerDetailsModal(btn.getAttribute("data-id")));
    });

    tbody.querySelectorAll(".btn-cust-del").forEach((btn) => {
      btn.addEventListener("click", () => deleteCustomer(btn.getAttribute("data-id")));
    });
  }

  document.getElementById("cust-search-input")?.addEventListener("input", renderCustomersView);
  document.getElementById("cust-status-filter")?.addEventListener("change", renderCustomersView);
  document.getElementById("cust-tier-filter")?.addEventListener("change", renderCustomersView);

  // Add Customer Modal
  document.getElementById("btn-add-customer")?.addEventListener("click", () => {
    openModal(`
      <h2>Add New Customer</h2>
      <form id="form-modal-add-cust" style="margin-top:1rem;">
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" id="m-cust-name" required placeholder="e.g. Robert Downey" />
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" id="m-cust-email" required placeholder="robert@example.com" />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="text" id="m-cust-phone" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>Location / City *</label>
            <input type="text" id="m-cust-location" required placeholder="e.g. Chicago, USA" />
          </div>
          <div class="form-group">
            <label>VIP Tier</label>
            <select id="m-cust-tier" class="custom-select">
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="Diamond">Diamond</option>
              <option value="Silver">Silver</option>
            </select>
          </div>
        </div>
        <div class="form-actions-flex">
          <button type="button" class="btn btn-outline" onclick="document.getElementById('global-modal').classList.add('hidden')">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Customer</button>
        </div>
      </form>
    `);

    document.getElementById("form-modal-add-cust")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const newCust = {
        id: `CUST-${Date.now()}`,
        name: document.getElementById("m-cust-name").value,
        email: document.getElementById("m-cust-email").value,
        phone: document.getElementById("m-cust-phone").value || "+1 (555) 123-4567",
        location: document.getElementById("m-cust-location").value,
        vipTier: document.getElementById("m-cust-tier").value,
        ordersCount: 0,
        spent: 0,
        status: "Active",
        image: "images/image1.png",
        joinedDate: new Date().toISOString().split("T")[0]
      };
      store.customers.unshift(newCust);
      window.saveStore(store);
      closeModal();
      renderCustomersView();
      showToast(`Customer ${newCust.name} added successfully!`, "success");
    });
  });

  function openCustomerDetailsModal(id) {
    const cust = store.customers.find((c) => c.id === id);
    if (!cust) return;
    openModal(`
      <div style="text-align:center; margin-bottom:1rem;">
        <div class="profile-photo" style="width:5rem; height:5rem; margin:0 auto 0.8rem;">
          <img src="${cust.image}" alt="${cust.name}" />
        </div>
        <h2>${cust.name}</h2>
        <span class="badge-tag ${cust.status === 'Active' ? 'success' : 'danger'}">${cust.status}</span>
      </div>
      <div style="background:var(--color-background); padding:1rem; border-radius:1rem; margin-bottom:1rem;">
        <p>• <b>Email:</b> ${cust.email}</p>
        <p>• <b>Phone:</b> ${cust.phone}</p>
        <p>• <b>Location:</b> ${cust.location}</p>
        <p>• <b>VIP Tier:</b> ${cust.vipTier || 'Gold'}</p>
        <p>• <b>Total Orders:</b> ${cust.ordersCount}</p>
        <p>• <b>Lifetime Spend:</b> $${cust.spent.toLocaleString()}</p>
        <p>• <b>Joined:</b> ${cust.joinedDate}</p>
      </div>
      <div class="form-actions-flex">
        <button class="btn btn-outline" onclick="document.getElementById('global-modal').classList.add('hidden')">Close</button>
        <button class="btn btn-primary" id="btn-toggle-cust-status">${cust.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
      </div>
    `);

    document.getElementById("btn-toggle-cust-status")?.addEventListener("click", () => {
      cust.status = cust.status === "Active" ? "Inactive" : "Active";
      window.saveStore(store);
      closeModal();
      renderCustomersView();
      showToast(`Customer status updated to ${cust.status}`, "info");
    });
  }

  function deleteCustomer(id) {
    if (confirm("Are you sure you want to delete this customer record?")) {
      store.customers = store.customers.filter((c) => c.id !== id);
      window.saveStore(store);
      renderCustomersView();
      showToast("Customer record deleted", "warning");
    }
  }

  // 3. ORDERS VIEW RENDERER
  let currentOrderFilter = "all";
  function renderOrdersView() {
    const tbody = document.getElementById("orders-view-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const query = document.getElementById("orders-search-input")?.value.toLowerCase().trim() || "";
    const sortVal = document.getElementById("orders-sort-select")?.value || "newest";

    let list = store.orders.filter((ord) => {
      const matchQuery = ord.productName.toLowerCase().includes(query) || ord.productNumber.includes(query) || ord.customer.toLowerCase().includes(query);
      let matchTab = true;
      if (currentOrderFilter === "Pending") matchTab = ord.shipping === "Pending";
      else if (currentOrderFilter === "Delivered") matchTab = ord.shipping === "Delivered";
      else if (currentOrderFilter === "Declined") matchTab = ord.shipping === "Declined";
      else if (currentOrderFilter === "Paid") matchTab = ord.paymentStatus === "Paid";
      else if (currentOrderFilter === "Due") matchTab = ord.paymentStatus === "Due";
      return matchQuery && matchTab;
    });

    if (sortVal === "oldest") list.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sortVal === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sortVal === "price-low") list.sort((a, b) => a.price - b.price);
    else list.sort((a, b) => new Date(b.date) - new Date(a.date));

    list.forEach((ord) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><b>#${ord.productNumber}</b></td>
        <td>${ord.productName}</td>
        <td>${ord.customer}</td>
        <td><b>$${ord.price}</b></td>
        <td><span class="badge-tag ${ord.paymentStatus === 'Paid' ? 'success' : ord.paymentStatus === 'Refunded' ? 'danger' : 'warning'}">${ord.paymentStatus}</span></td>
        <td class="${ord.shipping === 'Declined' ? 'danger' : ord.shipping === 'Pending' ? 'warning' : 'success'}">${ord.shipping}</td>
        <td>${ord.date}</td>
        <td>
          <button class="btn-outline-sm btn-ord-view" data-num="${ord.productNumber}">Receipt</button>
          <button class="btn-danger-sm btn-ord-del" data-num="${ord.productNumber}" style="margin-left:0.3rem;">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".btn-ord-view").forEach((btn) => {
      btn.addEventListener("click", () => openOrderDetailsModal(btn.getAttribute("data-num")));
    });

    tbody.querySelectorAll(".btn-ord-del").forEach((btn) => {
      btn.addEventListener("click", () => {
        const num = btn.getAttribute("data-num");
        if (confirm(`Delete order #${num}?`)) {
          store.orders = store.orders.filter((o) => o.productNumber !== num);
          window.saveStore(store);
          renderOrdersView();
          renderDashboardOrders();
          showToast(`Order #${num} deleted`, "warning");
        }
      });
    });
  }

  document.querySelectorAll("#orders-tab-filters .tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#orders-tab-filters .tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentOrderFilter = btn.getAttribute("data-filter");
      renderOrdersView();
    });
  });

  document.getElementById("orders-search-input")?.addEventListener("input", renderOrdersView);
  document.getElementById("orders-sort-select")?.addEventListener("change", renderOrdersView);

  function triggerCreateOrderModal() {
    openModal(`
      <h2>Create New Order</h2>
      <form id="form-modal-create-ord" style="margin-top:1rem;">
        <div class="form-group">
          <label>Select Product *</label>
          <select id="m-ord-prod" class="custom-select" required>
            ${store.products.map((p) => `<option value="${p.name}|${p.price}">${p.name} ($${p.price})</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label>Customer Name *</label>
          <input type="text" id="m-ord-cust" required placeholder="e.g. Mike Tyson" />
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>Payment Status</label>
            <select id="m-ord-payment" class="custom-select">
              <option value="Paid">Paid</option>
              <option value="Due">Due</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
          <div class="form-group">
            <label>Fulfillment Status</label>
            <select id="m-ord-shipping" class="custom-select">
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
        </div>
        <div class="form-actions-flex">
          <button type="button" class="btn btn-outline" onclick="document.getElementById('global-modal').classList.add('hidden')">Cancel</button>
          <button type="submit" class="btn btn-primary">Process Order</button>
        </div>
      </form>
    `);

    document.getElementById("form-modal-create-ord")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const prodSelect = document.getElementById("m-ord-prod").value.split("|");
      const num = Math.floor(10000 + Math.random() * 90000).toString();

      const newOrd = {
        id: `ORD-${num}`,
        productName: prodSelect[0],
        productNumber: num,
        customer: document.getElementById("m-ord-cust").value,
        price: parseFloat(prodSelect[1]),
        paymentStatus: document.getElementById("m-ord-payment").value,
        shipping: document.getElementById("m-ord-shipping").value,
        date: new Date().toISOString().split("T")[0]
      };

      store.orders.unshift(newOrd);
      window.saveStore(store);
      closeModal();
      renderOrdersView();
      renderDashboardOrders();
      showToast(`Order #${num} created successfully!`, "success");
    });
  }

  document.getElementById("btn-banner-new-order")?.addEventListener("click", triggerCreateOrderModal);
  document.getElementById("btn-create-order-view")?.addEventListener("click", triggerCreateOrderModal);

  function openOrderDetailsModal(num) {
    const ord = store.orders.find((o) => o.productNumber === num);
    if (!ord) return;

    openModal(`
      <h2>Order Receipt Details</h2>
      <p class="text-muted" style="margin-bottom:1rem;">Order Reference: #${ord.productNumber}</p>
      
      <div style="background:var(--color-background); padding:1.2rem; border-radius:1rem; margin-bottom:1.2rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Item:</span> <b>${ord.productName}</b>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Customer:</span> <b>${ord.customer}</b>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Date:</span> <b>${ord.date}</b>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>Total Price:</span> <b style="font-size:1.1rem; color:var(--color-primary);">$${ord.price}</b>
        </div>
      </div>

      <div class="form-group">
        <label>Update Shipping Status</label>
        <select id="m-update-shipping" class="custom-select">
          <option value="Pending" ${ord.shipping === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Delivered" ${ord.shipping === 'Delivered' ? 'selected' : ''}>Delivered</option>
          <option value="Declined" ${ord.shipping === 'Declined' ? 'selected' : ''}>Declined</option>
        </select>
      </div>

      <div class="form-group">
        <label>Update Payment Status</label>
        <select id="m-update-payment" class="custom-select">
          <option value="Paid" ${ord.paymentStatus === 'Paid' ? 'selected' : ''}>Paid</option>
          <option value="Due" ${ord.paymentStatus === 'Due' ? 'selected' : ''}>Due</option>
          <option value="Refunded" ${ord.paymentStatus === 'Refunded' ? 'selected' : ''}>Refunded</option>
        </select>
      </div>

      <div class="form-actions-flex">
        <button class="btn btn-outline" onclick="document.getElementById('global-modal').classList.add('hidden')">Close</button>
        <button class="btn btn-primary" id="btn-save-ord-status">Save Changes</button>
      </div>
    `);

    document.getElementById("btn-save-ord-status")?.addEventListener("click", () => {
      ord.shipping = document.getElementById("m-update-shipping").value;
      ord.paymentStatus = document.getElementById("m-update-payment").value;
      window.saveStore(store);
      closeModal();
      renderOrdersView();
      renderDashboardOrders();
      showToast(`Order #${num} updated`, "success");
    });
  }

  // 4. ANALYTICS PERIOD CONTROLLER
  document.querySelectorAll(".pill-toggle-group .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pill-toggle-group .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const period = btn.getAttribute("data-period");
      const revEl = document.getElementById("kpi-rev");
      const aovEl = document.getElementById("kpi-aov");

      if (period === "weekly") {
        if (revEl) revEl.textContent = "$18,450.00";
        if (aovEl) aovEl.textContent = "$310.00";
      } else if (period === "monthly") {
        if (revEl) revEl.textContent = "$83,490.00";
        if (aovEl) aovEl.textContent = "$342.50";
      } else {
        if (revEl) revEl.textContent = "$942,100.00";
        if (aovEl) aovEl.textContent = "$389.00";
      }

      showToast(`Analytics view set to ${period}`, "info");
    });
  });

  // 5. MESSAGES VIEW RENDERER
  function renderMessagesInbox() {
    const listContainer = document.getElementById("inbox-msg-list");
    if (!listContainer) return;
    listContainer.innerHTML = "";

    const query = document.getElementById("msg-search-input")?.value.toLowerCase().trim() || "";
    const filtered = store.messages.filter((m) => m.sender.toLowerCase().includes(query) || m.subject.toLowerCase().includes(query) || m.preview.toLowerCase().includes(query));

    filtered.forEach((msg) => {
      const item = document.createElement("div");
      item.className = `inbox-item ${msg.unread ? 'unread' : ''}`;
      item.innerHTML = `
        <div class="profile-photo" style="width:2.4rem; height:2.4rem;"><img src="${msg.avatar}" alt="${msg.sender}" /></div>
        <div style="flex:1; overflow:hidden;">
          <div style="display:flex; justify-content:space-between;">
            <b>${msg.sender}</b>
            <small class="text-muted">${msg.time}</small>
          </div>
          <div style="font-size:0.82rem; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${msg.subject}</div>
          <p style="font-size:0.78rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${msg.preview}</p>
        </div>
      `;

      item.addEventListener("click", () => {
        document.querySelectorAll(".inbox-item").forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        readMessageDetails(msg.id);
      });

      listContainer.appendChild(item);
    });
  }

  document.getElementById("msg-search-input")?.addEventListener("input", renderMessagesInbox);

  function readMessageDetails(id) {
    const msg = store.messages.find((m) => m.id === id);
    if (!msg) return;

    if (msg.unread) {
      msg.unread = false;
      window.saveStore(store);
      updateUnreadBadges();
      renderMessagesInbox();
    }

    const placeholder = document.getElementById("inbox-empty-state");
    const wrapper = document.getElementById("msg-content-wrapper");

    if (placeholder) placeholder.classList.add("hidden");
    if (wrapper) {
      wrapper.classList.remove("hidden");
      wrapper.innerHTML = `
        <div class="message-detail-header">
          <div style="display:flex; gap:1rem; align-items:center;">
            <div class="profile-photo" style="width:3rem; height:3rem;"><img src="${msg.avatar}" alt="${msg.sender}" /></div>
            <div>
              <h3 style="margin:0;">${msg.sender}</h3>
              <small class="text-muted">${msg.email}</small>
            </div>
          </div>
          <div style="text-align:right;">
            <small class="text-muted" style="display:block;">${msg.time}</small>
            <button class="btn-danger-sm" id="btn-del-msg" style="margin-top:0.4rem;">Delete</button>
          </div>
        </div>

        <h2 style="margin:1.4rem 0 0.6rem;">${msg.subject}</h2>
        <div class="message-body-text">${msg.body}</div>

        <div style="margin-top:2rem; padding-top:1rem; border-top:1px solid var(--color-border);">
          <h4>Quick Reply</h4>
          <textarea id="reply-text-box" rows="3" placeholder="Type your reply to ${msg.sender}..." style="width:100%; margin:0.6rem 0; padding:0.8rem; border-radius:0.6rem; border:1px solid var(--color-border); font-family:inherit; background:var(--color-background); color:var(--color-dark);"></textarea>
          <button class="btn btn-primary" id="btn-send-reply"><span class="material-icons-sharp">send</span> Send Reply</button>
        </div>
      `;

      document.getElementById("btn-del-msg")?.addEventListener("click", () => {
        store.messages = store.messages.filter((m) => m.id !== id);
        window.saveStore(store);
        wrapper.classList.add("hidden");
        if (placeholder) placeholder.classList.remove("hidden");
        renderMessagesInbox();
        showToast("Message deleted", "warning");
      });

      document.getElementById("btn-send-reply")?.addEventListener("click", () => {
        const replyText = document.getElementById("reply-text-box")?.value;
        if (!replyText) {
          showToast("Please enter a reply message", "warning");
          return;
        }
        showToast(`Reply sent to ${msg.sender}`, "success");
        document.getElementById("reply-text-box").value = "";
      });
    }
  }

  document.getElementById("btn-compose-msg")?.addEventListener("click", () => {
    openModal(`
      <h2>Compose New Message</h2>
      <form id="form-compose-msg" style="margin-top:1rem;">
        <div class="form-group">
          <label>Recipient Email *</label>
          <input type="email" id="m-msg-to" required placeholder="recipient@example.com" />
        </div>
        <div class="form-group">
          <label>Subject *</label>
          <input type="text" id="m-msg-subject" required placeholder="Enter subject line" />
        </div>
        <div class="form-group">
          <label>Message Body *</label>
          <textarea id="m-msg-body" rows="5" required placeholder="Write your message here..."></textarea>
        </div>
        <div class="form-actions-flex">
          <button type="button" class="btn btn-outline" onclick="document.getElementById('global-modal').classList.add('hidden')">Cancel</button>
          <button type="submit" class="btn btn-primary">Send Message</button>
        </div>
      </form>
    `);

    document.getElementById("form-compose-msg")?.addEventListener("submit", (e) => {
      e.preventDefault();
      closeModal();
      showToast("Message sent successfully!", "success");
    });
  });

  // 6. PRODUCTS VIEW RENDERER
  let isGridView = true;
  function renderProductsView() {
    const container = document.getElementById("products-container");
    if (!container) return;
    container.innerHTML = "";

    const query = document.getElementById("prod-search-input")?.value.toLowerCase().trim() || "";
    const category = document.getElementById("prod-category-select")?.value || "all";

    const filtered = store.products.filter((p) => {
      const matchQuery = p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
      const matchCat = category === "all" || p.category === category;
      return matchQuery && matchCat;
    });

    document.getElementById("prod-stat-total").textContent = store.products.length;
    document.getElementById("prod-stat-instock").textContent = store.products.filter((p) => p.status === "In Stock").length;
    document.getElementById("prod-stat-low").textContent = store.products.filter((p) => p.status === "Low Stock").length;
    document.getElementById("prod-stat-out").textContent = store.products.filter((p) => p.status === "Out of Stock").length;

    if (isGridView) {
      container.className = "products-grid-layout";
      filtered.forEach((prod) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <div class="product-img-wrap"><img src="${prod.image}" alt="${prod.name}" /></div>
          <div class="product-card-body">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="badge-tag ${prod.status === 'In Stock' ? 'success' : prod.status === 'Low Stock' ? 'warning' : 'danger'}">${prod.status}</span>
              <small class="text-muted">${prod.sku}</small>
            </div>
            <h3 style="margin-top:0.4rem;">${prod.name}</h3>
            <p style="font-size:0.8rem; line-height:1.4;">${prod.description}</p>
            <div class="product-card-footer">
              <h2 style="color:var(--color-primary);">$${prod.price}</h2>
              <div>
                <button class="btn-outline-sm btn-edit-prod" data-id="${prod.id}">Edit</button>
                <button class="btn-danger-sm btn-del-prod" data-id="${prod.id}" style="margin-left:0.3rem;">Delete</button>
              </div>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    } else {
      container.className = "table-responsive";
      const table = document.createElement("table");
      table.className = "data-table";
      table.innerHTML = `
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map((prod) => `
            <tr>
              <td><b>${prod.name}</b></td>
              <td>${prod.sku}</td>
              <td>${prod.category}</td>
              <td><b>$${prod.price}</b></td>
              <td>${prod.stock} units</td>
              <td><span class="badge-tag ${prod.status === 'In Stock' ? 'success' : prod.status === 'Low Stock' ? 'warning' : 'danger'}">${prod.status}</span></td>
              <td>
                <button class="btn-outline-sm btn-edit-prod" data-id="${prod.id}">Edit</button>
                <button class="btn-danger-sm btn-del-prod" data-id="${prod.id}" style="margin-left:0.3rem;">Delete</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      `;
      container.appendChild(table);
    }

    container.querySelectorAll(".btn-edit-prod").forEach((btn) => {
      btn.addEventListener("click", () => openEditProductModal(btn.getAttribute("data-id")));
    });

    container.querySelectorAll(".btn-del-prod").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Delete this product from inventory?")) {
          store.products = store.products.filter((p) => p.id !== id);
          window.saveStore(store);
          renderProductsView();
          showToast("Product deleted", "warning");
        }
      });
    });
  }

  document.getElementById("prod-search-input")?.addEventListener("input", renderProductsView);
  document.getElementById("prod-category-select")?.addEventListener("change", renderProductsView);

  document.getElementById("btn-view-grid")?.addEventListener("click", () => {
    isGridView = true;
    document.getElementById("btn-view-grid").classList.add("active");
    document.getElementById("btn-view-list").classList.remove("active");
    renderProductsView();
  });

  document.getElementById("btn-view-list")?.addEventListener("click", () => {
    isGridView = false;
    document.getElementById("btn-view-list").classList.add("active");
    document.getElementById("btn-view-grid").classList.remove("active");
    renderProductsView();
  });

  document.getElementById("btn-create-product-view")?.addEventListener("click", () => navigateToView("add-product"));

  function openEditProductModal(id) {
    const prod = store.products.find((p) => p.id === id);
    if (!prod) return;

    openModal(`
      <h2>Edit Product</h2>
      <form id="form-edit-prod" style="margin-top:1rem;">
        <div class="form-group">
          <label>Product Title</label>
          <input type="text" id="m-edit-name" value="${prod.name}" required />
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label>Price ($)</label>
            <input type="number" id="m-edit-price" value="${prod.price}" step="0.01" required />
          </div>
          <div class="form-group">
            <label>Stock Count</label>
            <input type="number" id="m-edit-stock" value="${prod.stock}" required />
          </div>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="m-edit-status" class="custom-select">
            <option value="In Stock" ${prod.status === 'In Stock' ? 'selected' : ''}>In Stock</option>
            <option value="Low Stock" ${prod.status === 'Low Stock' ? 'selected' : ''}>Low Stock</option>
            <option value="Out of Stock" ${prod.status === 'Out of Stock' ? 'selected' : ''}>Out of Stock</option>
          </select>
        </div>
        <div class="form-actions-flex">
          <button type="button" class="btn btn-outline" onclick="document.getElementById('global-modal').classList.add('hidden')">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Product</button>
        </div>
      </form>
    `);

    document.getElementById("form-edit-prod")?.addEventListener("submit", (e) => {
      e.preventDefault();
      prod.name = document.getElementById("m-edit-name").value;
      prod.price = parseFloat(document.getElementById("m-edit-price").value);
      prod.stock = parseInt(document.getElementById("m-edit-stock").value);
      prod.status = document.getElementById("m-edit-status").value;

      window.saveStore(store);
      closeModal();
      renderProductsView();
      showToast(`Product ${prod.name} updated!`, "success");
    });
  }

  // 7. ADD PRODUCT FORM CONTROLLER
  const formAddProdMain = document.getElementById("form-add-product-main");
  if (formAddProdMain) {
    formAddProdMain.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("add-prod-name").value;
      const sku = document.getElementById("add-prod-sku").value;
      const category = document.getElementById("add-prod-category").value;
      const price = parseFloat(document.getElementById("add-prod-price").value);
      const stock = parseInt(document.getElementById("add-prod-stock").value);
      const desc = document.getElementById("add-prod-desc").value;
      const image = document.getElementById("add-prod-image").value;

      const newProd = {
        id: `PROD-${Date.now()}`,
        name: name,
        sku: sku,
        category: category,
        price: price,
        stock: stock,
        rating: 4.8,
        status: stock > 10 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock",
        image: image,
        description: desc || "New product item published."
      };

      store.products.unshift(newProd);
      window.saveStore(store);
      formAddProdMain.reset();

      showToast(`Product ${name} published to store!`, "success");
      navigateToView("products");
    });
  }

  document.getElementById("btn-cancel-add-prod")?.addEventListener("click", () => navigateToView("products"));

  // 8. REPORTS GENERATOR CONTROLLER
  document.getElementById("btn-generate-report")?.addEventListener("click", () => {
    const btn = document.getElementById("btn-generate-report");
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-icons-sharp">sync</span> Generating...`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      showToast("Report generated & downloaded successfully!", "success");
    }, 1200);
  });

  document.querySelectorAll(".action-download-sim").forEach((b) => {
    b.addEventListener("click", () => showToast("Downloading file...", "info"));
  });

  // 9. SETTINGS VIEW CONTROLLER
  function renderSettingsView() {
    if (store.settings) {
      document.getElementById("set-fullname").value = store.settings.fullName || "John Doe";
      document.getElementById("set-email").value = store.settings.email || "john.admin@dashboard.com";
      document.getElementById("set-phone").value = store.settings.phone || "";
      document.getElementById("set-bio").value = store.settings.bio || "";
      document.getElementById("set-notif-email").checked = !!store.settings.emailNotifications;
      document.getElementById("set-notif-orders").checked = !!store.settings.orderAlerts;
      document.getElementById("set-notif-system").checked = !!store.settings.systemUpdates;
      document.getElementById("set-2fa").checked = !!store.settings.twoFactor;
    }
  }

  document.querySelectorAll(".settings-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".settings-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".settings-panel").forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-target");
      document.getElementById(targetId)?.classList.add("active");
    });
  });

  document.getElementById("form-profile-settings")?.addEventListener("submit", (e) => {
    e.preventDefault();
    store.settings.fullName = document.getElementById("set-fullname").value;
    store.settings.email = document.getElementById("set-email").value;
    store.settings.phone = document.getElementById("set-phone").value;
    store.settings.bio = document.getElementById("set-bio").value;

    window.saveStore(store);

    // Update Header Info
    const firstName = store.settings.fullName.split(" ")[0];
    document.getElementById("banner-user-name").textContent = firstName;
    document.getElementById("sidebar-user-name").textContent = store.settings.fullName;
    document.getElementById("dropdown-user-name").textContent = store.settings.fullName;
    document.getElementById("dropdown-user-email").textContent = store.settings.email;

    showToast("Profile settings saved!", "success");
  });

  document.getElementById("form-notification-settings")?.addEventListener("submit", (e) => {
    e.preventDefault();
    store.settings.emailNotifications = document.getElementById("set-notif-email").checked;
    store.settings.orderAlerts = document.getElementById("set-notif-orders").checked;
    store.settings.systemUpdates = document.getElementById("set-notif-system").checked;

    window.saveStore(store);
    showToast("Notification preferences updated!", "success");
  });

  document.getElementById("form-security-settings")?.addEventListener("submit", (e) => {
    e.preventDefault();
    store.settings.twoFactor = document.getElementById("set-2fa").checked;
    window.saveStore(store);
    showToast("Password & security settings updated!", "success");
  });

  document.getElementById("theme-opt-light")?.addEventListener("click", () => {
    applyTheme(false);
    document.getElementById("theme-opt-light").classList.add("active");
    document.getElementById("theme-opt-dark").classList.remove("active");
  });

  document.getElementById("theme-opt-dark")?.addEventListener("click", () => {
    applyTheme(true);
    document.getElementById("theme-opt-dark").classList.add("active");
    document.getElementById("theme-opt-light").classList.remove("active");
  });

  document.querySelectorAll(".accent-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      document.querySelectorAll(".accent-dot").forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
      const color = dot.getAttribute("data-color");
      document.documentElement.style.setProperty("--color-primary", color);
      store.settings.accentColor = color;
      window.saveStore(store);
      showToast("Accent color updated!", "info");
    });
  });

  // 10. LOGOUT & LOCK SCREEN CONTROLLER
  function handleLogoutPrompt() {
    openModal(`
      <div style="text-align:center; padding:1rem 0;">
        <span class="material-icons-sharp" style="font-size:3.5rem; color:var(--color-warning);">lock</span>
        <h2>Lock Screen Session</h2>
        <p class="text-muted" style="margin:0.5rem 0 1.4rem;">Are you sure you want to sign out or lock your admin session?</p>
        <div class="form-actions-flex" style="justify-content:center;">
          <button class="btn btn-outline" onclick="document.getElementById('global-modal').classList.add('hidden')">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-logout">Lock & Sign Out</button>
        </div>
      </div>
    `);

    document.getElementById("btn-confirm-logout")?.addEventListener("click", () => {
      openModal(`
        <div style="text-align:center; padding:1.5rem 0;">
          <div class="profile-photo" style="width:5rem; height:5rem; margin:0 auto 1rem;">
            <img src="images/image2.png" alt="Admin Avatar" />
          </div>
          <h2>Session Locked</h2>
          <p class="text-muted" style="margin-bottom:1rem;">Enter PIN or click below to unlock session</p>
          <input type="password" value="123456" style="width:80%; text-align:center; letter-spacing:4px; font-size:1.4rem; margin-bottom:1rem; padding:0.6rem; border-radius:0.6rem; border:1px solid var(--color-border); background:var(--color-background); color:var(--color-dark);" />
          <br/>
          <button class="btn btn-primary" id="btn-unlock-session">Unlock Admin Dashboard</button>
        </div>
      `);

      document.getElementById("btn-unlock-session")?.addEventListener("click", () => {
        closeModal();
        navigateToView("dashboard");
        showToast("Welcome back, John!", "success");
      });
    });
  }

  // INITIALIZE DEFAULT VIEW
  navigateToView("dashboard");
});
