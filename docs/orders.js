// Admin Dashboard Central Data Store & Persistence Manager

const initialData = {
  users: [
    {
      id: "USR-1",
      fullName: "John Doe",
      email: "john.admin@dashboard.com",
      password: "password123",
      role: "Super Admin",
      phone: "+1 (555) 019-2831",
      designation: "Chief Operating Officer",
      avatar: "images/image2.png",
      bio: "Lead Operations Director overseeing global store fulfillment, order processing, and customer success management."
    },
    {
      id: "USR-2",
      fullName: "Mike Tyson",
      email: "mike.tyson@ironmike.com",
      password: "password123",
      role: "Store Manager",
      phone: "+1 (555) 234-5678",
      designation: "Retail Operations Manager",
      avatar: "images/image1.png",
      bio: "Managing retail store fulfillment and inventory distribution."
    },
    {
      id: "USR-3",
      fullName: "Elena Rostova",
      email: "elena.rostova@tech.de",
      password: "password123",
      role: "Analytics Lead",
      phone: "+49 30 9876543",
      designation: "Data & Revenue Lead",
      avatar: "images/image4.png",
      bio: "Overseeing data modeling and European enterprise sales performance."
    }
  ],
  orders: [
    {
      id: "ORD-85631",
      productName: "Foldable Mini Drone 4K",
      productNumber: "85631",
      customer: "Mike Tyson",
      customerEmail: "mike.tyson@ironmike.com",
      price: 299,
      paymentStatus: "Due",
      shipping: "Pending",
      date: "2026-08-18",
      itemsCount: 1
    },
    {
      id: "ORD-36378",
      productName: "LARVENDER KF102 Drone",
      productNumber: "36378",
      customer: "David Warner",
      customerEmail: "david.warner@aussie.au",
      price: 450,
      paymentStatus: "Refunded",
      shipping: "Declined",
      date: "2026-08-17",
      itemsCount: 1
    },
    {
      id: "ORD-49347",
      productName: "Ruko Fn Pro Drone",
      productNumber: "49347",
      customer: "Steve Smith",
      customerEmail: "steve.smith@aussie.au",
      price: 680,
      paymentStatus: "Due",
      shipping: "Pending",
      date: "2026-08-16",
      itemsCount: 2
    },
    {
      id: "ORD-96996",
      productName: "Drone with Camera Drone",
      productNumber: "96996",
      customer: "Jos Butler",
      customerEmail: "jos.butler@cricket.uk",
      price: 1200,
      paymentStatus: "Paid",
      shipping: "Delivered",
      date: "2026-08-15",
      itemsCount: 1
    },
    {
      id: "ORD-22821",
      productName: "GPS 4k Drone Dual Cam",
      productNumber: "22821",
      customer: "Alex Carey",
      customerEmail: "alex.carey@cricket.au",
      price: 899,
      paymentStatus: "Paid",
      shipping: "Delivered",
      date: "2026-08-14",
      itemsCount: 1
    },
    {
      id: "ORD-81475",
      productName: "DJI Air 2S Quadcopter",
      productNumber: "81475",
      customer: "Mitchell Starc",
      customerEmail: "mitchell.starc@cricket.au",
      price: 999,
      paymentStatus: "Due",
      shipping: "Pending",
      date: "2026-08-13",
      itemsCount: 1
    },
    {
      id: "ORD-00482",
      productName: "Lozenge HD Drone",
      productNumber: "00482",
      customer: "Pat Cummins",
      customerEmail: "pat.cummins@aussie.au",
      price: 350,
      paymentStatus: "Paid",
      shipping: "Delivered",
      date: "2026-08-12",
      itemsCount: 2
    },
    {
      id: "ORD-55219",
      productName: "Smart Flight Battery Pro",
      productNumber: "55219",
      customer: "Elena Rostova",
      customerEmail: "elena.rostova@tech.de",
      price: 178,
      paymentStatus: "Paid",
      shipping: "Delivered",
      date: "2026-08-11",
      itemsCount: 2
    },
    {
      id: "ORD-71932",
      productName: "4K Gimbal Camera Module",
      productNumber: "71932",
      customer: "Sarah Connor",
      customerEmail: "sarah@skynet-defense.com",
      price: 398,
      paymentStatus: "Paid",
      shipping: "Processing",
      date: "2026-08-10",
      itemsCount: 2
    },
    {
      id: "ORD-11204",
      productName: "Stealth FPV Racing Quad",
      productNumber: "11204",
      customer: "Marcus Aurelius",
      customerEmail: "marcus@rome.org",
      price: 749,
      paymentStatus: "Paid",
      shipping: "Delivered",
      date: "2026-08-09",
      itemsCount: 1
    }
  ],
  products: [
    {
      id: "PROD-1",
      name: "Foldable Mini Drone 4K",
      sku: "DRN-85631",
      category: "Drones",
      price: 299,
      stock: 45,
      rating: 4.8,
      status: "In Stock",
      image: "images/image1.png",
      description: "Ultra-portable foldable drone with 4K UHD camera, 30 mins flight time, and optical flow positioning."
    },
    {
      id: "PROD-2",
      name: "LARVENDER KF102 Drone",
      sku: "DRN-36378",
      category: "Drones",
      price: 450,
      stock: 12,
      rating: 4.5,
      status: "Low Stock",
      image: "images/image4.png",
      description: "Professional 2-axis anti-shake gimbal GPS drone with 25-minute high capacity battery."
    },
    {
      id: "PROD-3",
      name: "Ruko Fn Pro Quadcopter",
      sku: "DRN-49347",
      category: "Drones",
      price: 680,
      stock: 28,
      rating: 4.9,
      status: "In Stock",
      image: "images/image3.png",
      description: "High-end quadcopter with level-7 wind resistance and transmission distance up to 3000 meters."
    },
    {
      id: "PROD-4",
      name: "DJI Air 2S Quadcopter",
      sku: "DRN-81475",
      category: "Drones",
      price: 999,
      stock: 8,
      rating: 5.0,
      status: "Low Stock",
      image: "images/image2.png",
      description: "1-inch CMOS sensor, 5.4K video capability, MasterShots, and APAS 4.0 safety system."
    },
    {
      id: "PROD-5",
      name: "Lozenge HD Drone",
      sku: "DRN-00482",
      category: "Drones",
      price: 350,
      stock: 0,
      rating: 4.2,
      status: "Out of Stock",
      image: "images/image1.png",
      description: "Beginner-friendly compact drone featuring optical flow positioning and HD gesture camera."
    },
    {
      id: "PROD-6",
      name: "GPS 4K Dual Camera Drone",
      sku: "DRN-22821",
      category: "Drones",
      price: 899,
      stock: 34,
      rating: 4.7,
      status: "In Stock",
      image: "images/image4.png",
      description: "Dual 4K wide-angle cameras with brushless motors and smart return-to-home functionality."
    },
    {
      id: "PROD-7",
      name: "Smart Flight Battery Pro",
      sku: "ACC-55219",
      category: "Accessories",
      price: 89,
      stock: 110,
      rating: 4.9,
      status: "In Stock",
      image: "images/image3.png",
      description: "Intelligent lipo battery with status LEDs and overcharge protection built-in."
    },
    {
      id: "PROD-8",
      name: "4K Gimbal Camera Module",
      sku: "ACC-71932",
      category: "Cameras",
      price: 199,
      stock: 40,
      rating: 4.6,
      status: "In Stock",
      image: "images/image2.png",
      description: "Replacement 3-axis mechanical gimbal camera module compatible with all FPV models."
    },
    {
      id: "PROD-9",
      name: "Stealth FPV Racing Quad",
      sku: "DRN-11204",
      category: "Drones",
      price: 749,
      stock: 15,
      rating: 4.9,
      status: "In Stock",
      image: "images/image1.png",
      description: "Carbon fiber FPV racing drone with zero latency transmission and 120km/h top speed."
    },
    {
      id: "PROD-10",
      name: "High-Gain FPV Antenna Set",
      sku: "ACC-99120",
      category: "Accessories",
      price: 49,
      stock: 85,
      rating: 4.7,
      status: "In Stock",
      image: "images/image4.png",
      description: "Omnidirectional high gain antenna set for extended flight range and interference resistance."
    }
  ],
  customers: [
    {
      id: "CUST-1",
      name: "Mike Tyson",
      email: "mike.tyson@ironmike.com",
      phone: "+1 (555) 234-5678",
      location: "New York, USA",
      ordersCount: 12,
      spent: 3450,
      status: "Active",
      vipTier: "Platinum",
      image: "images/image1.png",
      joinedDate: "2024-01-15"
    },
    {
      id: "CUST-2",
      name: "Jos Butler",
      email: "jos.butler@cricket.uk",
      phone: "+44 7700 900123",
      location: "London, UK",
      ordersCount: 8,
      spent: 2100,
      status: "Active",
      vipTier: "Gold",
      image: "images/image4.png",
      joinedDate: "2024-02-20"
    },
    {
      id: "CUST-3",
      name: "David Warner",
      email: "david.warner@aussie.au",
      phone: "+61 400 123 456",
      location: "Sydney, Australia",
      ordersCount: 5,
      spent: 1250,
      status: "Active",
      vipTier: "Silver",
      image: "images/image3.png",
      joinedDate: "2024-03-10"
    },
    {
      id: "CUST-4",
      name: "Steve Smith",
      email: "steve.smith@aussie.au",
      phone: "+61 400 654 321",
      location: "Melbourne, Australia",
      ordersCount: 15,
      spent: 4890,
      status: "Active",
      vipTier: "Platinum",
      image: "images/image2.png",
      joinedDate: "2023-11-05"
    },
    {
      id: "CUST-5",
      name: "Sarah Connor",
      email: "sarah@skynet-defense.com",
      phone: "+1 (555) 888-2100",
      location: "Los Angeles, USA",
      ordersCount: 2,
      spent: 680,
      status: "Inactive",
      vipTier: "Bronze",
      image: "images/image1.png",
      joinedDate: "2024-04-18"
    },
    {
      id: "CUST-6",
      name: "Elena Rostova",
      email: "elena.rostova@tech.de",
      phone: "+49 30 9876543",
      location: "Berlin, Germany",
      ordersCount: 19,
      spent: 7120,
      status: "Active",
      vipTier: "Diamond",
      image: "images/image4.png",
      joinedDate: "2023-08-14"
    },
    {
      id: "CUST-7",
      name: "Marcus Aurelius",
      email: "marcus@rome.org",
      phone: "+39 06 6982",
      location: "Rome, Italy",
      ordersCount: 4,
      spent: 1498,
      status: "Active",
      vipTier: "Silver",
      image: "images/image2.png",
      joinedDate: "2024-05-01"
    },
    {
      id: "CUST-8",
      name: "Alex Carey",
      email: "alex.carey@cricket.au",
      phone: "+61 400 888 999",
      location: "Adelaide, Australia",
      ordersCount: 6,
      spent: 1899,
      status: "Active",
      vipTier: "Gold",
      image: "images/image3.png",
      joinedDate: "2024-06-12"
    }
  ],
  messages: [
    {
      id: "MSG-1",
      sender: "Mike Tyson",
      email: "mike.tyson@ironmike.com",
      avatar: "images/image1.png",
      subject: "Order Shipping Inquiry (#85631)",
      preview: "Hey John, when will the Foldable mini drone be dispatched? I need it before Friday!",
      body: "Hi John,\n\nI just placed an order (#85631) for the Foldable Mini Drone yesterday. Could you let me know if it has been dispatched yet? I have an event this coming Friday and really need it delivered by then.\n\nThanks,\nMike Tyson",
      time: "2 min ago",
      timestamp: Date.now() - 120000,
      unread: true,
      starred: true
    },
    {
      id: "MSG-2",
      sender: "Jos Butler",
      email: "jos.butler@cricket.uk",
      avatar: "images/image4.png",
      subject: "Feedback on Lazenge Drone",
      preview: "Received the Lazenge Drone package today. Quality is superb!",
      body: "Hello Admin,\n\nJust wanted to reach out and say thank you! I received my Lazenge Drone today in perfect condition. The packaging and build quality are top-notch.\n\nCheers,\nJos Butler",
      time: "12 min ago",
      timestamp: Date.now() - 720000,
      unread: true,
      starred: false
    },
    {
      id: "MSG-3",
      sender: "David Warner",
      email: "david.warner@aussie.au",
      avatar: "images/image3.png",
      subject: "Refund Request Status (#36378)",
      preview: "Inquiring about refund status for order #36378.",
      body: "Hi Support team,\n\nI saw that order #36378 status was updated to Refunded. Could you confirm how many business days it usually takes to reflect in my bank account?\n\nBest regards,\nDavid Warner",
      time: "20 min ago",
      timestamp: Date.now() - 1200000,
      unread: true,
      starred: false
    },
    {
      id: "MSG-4",
      sender: "Sarah Connor",
      email: "sarah@skynet-defense.com",
      avatar: "images/image1.png",
      subject: "Bulk Order Inquiry for Batteries",
      preview: "Do you supply bulk orders for flight batteries?",
      body: "Hello,\n\nWe are looking to purchase 50 units of the Smart Flight Battery Pro for commercial operations. Do you offer bulk discounts?\n\nThanks,\nSarah",
      time: "1 hour ago",
      timestamp: Date.now() - 3600000,
      unread: false,
      starred: true
    },
    {
      id: "MSG-5",
      sender: "Elena Rostova",
      email: "elena.rostova@tech.de",
      avatar: "images/image4.png",
      subject: "Wholesale Partnership Inquiry",
      preview: "Would like to discuss distribution partnership in Europe.",
      body: "Dear John,\n\nOur distribution agency in Berlin is interested in becoming an authorized regional reseller for your FPV Quadcopter models across Germany and Austria.\n\nLet's schedule a call.\n\nBest regards,\nElena Rostova",
      time: "2 hours ago",
      timestamp: Date.now() - 7200000,
      unread: false,
      starred: true
    },
    {
      id: "MSG-6",
      sender: "System Engine",
      email: "system@admindash.io",
      avatar: "images/image2.png",
      subject: "Weekly Performance Report Ready",
      preview: "Weekly sales performance & inventory report generated.",
      body: "Automated System Broadcast:\n\nYour store analytics report for August 2026 is ready for review and download under the Reports tab.\n\nBest regards,\nAdmin Dashboard Server",
      time: "4 hours ago",
      timestamp: Date.now() - 14400000,
      unread: false,
      starred: false
    }
  ],
  notifications: [
    {
      id: "NOTIF-1",
      title: "New Order Received",
      text: "Jos Butler placed order #96996 ($1,200)",
      time: "10 min ago",
      type: "success",
      icon: "shopping_cart",
      read: false
    },
    {
      id: "NOTIF-2",
      title: "Low Stock Alert",
      text: "DJI Air 2S Quadcopter stock is down to 8 units",
      time: "1 hour ago",
      type: "warning",
      icon: "inventory_2",
      read: false
    },
    {
      id: "NOTIF-3",
      title: "Payment Processed",
      text: "Order #36378 refund of $450 completed",
      time: "3 hours ago",
      type: "info",
      icon: "payments",
      read: true
    },
    {
      id: "NOTIF-4",
      title: "Database Backup",
      text: "Automated cloud backup completed successfully",
      time: "5 hours ago",
      type: "info",
      icon: "cloud_done",
      read: true
    }
  ],
  updates: [
    {
      id: "UPD-1",
      name: "Mike Tyson",
      avatar: "images/image1.png",
      action: "received his order of Night lion tech GPS drone",
      time: "2 min ago"
    },
    {
      id: "UPD-2",
      name: "Jos Butler",
      avatar: "images/image4.png",
      action: "received his order of Lazenge Drone",
      time: "12 min ago"
    },
    {
      id: "UPD-3",
      name: "David Warner",
      avatar: "images/image3.png",
      action: "received his order of LARVENDER KF102 Drone",
      time: "20 min ago"
    },
    {
      id: "UPD-4",
      name: "Elena Rostova",
      avatar: "images/image4.png",
      action: "submitted a 5-star review for Smart Flight Battery Pro",
      time: "1 hour ago"
    }
  ],
  settings: {
    fullName: "John Doe",
    email: "john.admin@dashboard.com",
    role: "Super Admin",
    phone: "+1 (555) 019-2831",
    designation: "Chief Operating Officer",
    bio: "Lead Operations Director overseeing global store fulfillment, order processing, inventory control, and customer success management.",
    emailNotifications: true,
    orderAlerts: true,
    systemUpdates: false,
    twoFactor: true,
    theme: "light",
    accentColor: "#7380ec",
    currency: "USD ($)",
    taxRate: 8.5
  }
};

function getStore() {
  const data = localStorage.getItem("admin_dashboard_store_v3");
  if (!data) {
    localStorage.setItem("admin_dashboard_store_v3", JSON.stringify(initialData));
    return JSON.parse(JSON.stringify(initialData));
  }
  try {
    const storeObj = JSON.parse(data);
    if (!storeObj.users) {
      storeObj.users = initialData.users;
      localStorage.setItem("admin_dashboard_store_v3", JSON.stringify(storeObj));
    }
    return storeObj;
  } catch (e) {
    localStorage.setItem("admin_dashboard_store_v3", JSON.stringify(initialData));
    return JSON.parse(JSON.stringify(initialData));
  }
}

function saveStore(store) {
  localStorage.setItem("admin_dashboard_store_v3", JSON.stringify(store));
}

// Authentication Session Helpers
function getCurrentUser() {
  const session = localStorage.getItem("admin_dashboard_session_v3");
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem("admin_dashboard_session_v3", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("admin_dashboard_session_v3");
}

// Global scope initialization
const currentStore = getStore();
window.orders = currentStore.orders;
window.getStore = getStore;
window.saveStore = saveStore;
window.getCurrentUser = getCurrentUser;
window.setCurrentUser = setCurrentUser;
window.logoutUser = logoutUser;
