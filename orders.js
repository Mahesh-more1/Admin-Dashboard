// Admin Dashboard Central Data Store & Persistence Manager

const initialData = {
  orders: [
    {
      id: "ORD-85631",
      productName: "Foldable mini drone",
      productNumber: "85631",
      customer: "Mike Tyson",
      price: 299,
      paymentStatus: "Due",
      shipping: "Pending",
      date: "2026-08-18"
    },
    {
      id: "ORD-36378",
      productName: "LARVENDER KF102 Drone",
      productNumber: "36378",
      customer: "David Warner",
      price: 450,
      paymentStatus: "Refunded",
      shipping: "Declined",
      date: "2026-08-17"
    },
    {
      id: "ORD-49347",
      productName: "Ruko Fn Pro Drone",
      productNumber: "49347",
      customer: "Steve Smith",
      price: 680,
      paymentStatus: "Due",
      shipping: "Pending",
      date: "2026-08-16"
    },
    {
      id: "ORD-96996",
      productName: "Drone with Camera Drone",
      productNumber: "96996",
      customer: "Jos Butler",
      price: 1200,
      paymentStatus: "Paid",
      shipping: "Delivered",
      date: "2026-08-15"
    },
    {
      id: "ORD-22821",
      productName: "GPS 4k Drone",
      productNumber: "22821",
      customer: "Alex Carey",
      price: 899,
      paymentStatus: "Paid",
      shipping: "Delivered",
      date: "2026-08-14"
    },
    {
      id: "ORD-81475",
      productName: "DJI Air 2S",
      productNumber: "81475",
      customer: "Mitchell Starc",
      price: 999,
      paymentStatus: "Due",
      shipping: "Pending",
      date: "2026-08-13"
    },
    {
      id: "ORD-00482",
      productName: "Lozenge Drone",
      productNumber: "00482",
      customer: "Pat Cummins",
      price: 350,
      paymentStatus: "Paid",
      shipping: "Delivered",
      date: "2026-08-12"
    }
  ],
  products: [
    {
      id: "PROD-1",
      name: "Foldable Mini Drone",
      sku: "85631",
      category: "Drones",
      price: 299,
      stock: 45,
      rating: 4.8,
      status: "In Stock",
      image: "images/image1.png",
      description: "Ultra-portable foldable drone with 4K UHD camera, 30 mins flight time, and obstacle avoidance."
    },
    {
      id: "PROD-2",
      name: "LARVENDER KF102 Drone",
      sku: "36378",
      category: "Drones",
      price: 450,
      stock: 12,
      rating: 4.5,
      status: "Low Stock",
      image: "images/image4.png",
      description: "Professional 2-axis anti-shake gimbal GPS drone with 25-minute battery capacity."
    },
    {
      id: "PROD-3",
      name: "Ruko Fn Pro Drone",
      sku: "49347",
      category: "Drones",
      price: 680,
      stock: 28,
      rating: 4.9,
      status: "In Stock",
      image: "images/image3.png",
      description: "High-end quadcopter with level-7 wind resistance and transmission distance up to 3000m."
    },
    {
      id: "PROD-4",
      name: "DJI Air 2S Quadcopter",
      sku: "81475",
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
      name: "Lozenge Drone HD",
      sku: "00482",
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
      name: "GPS 4K Dual Camera",
      sku: "22821",
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
      sku: "BAT-992",
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
      sku: "CAM-401",
      category: "Accessories",
      price: 199,
      stock: 40,
      rating: 4.6,
      status: "In Stock",
      image: "images/image2.png",
      description: "Replacement 3-axis mechanical gimbal camera module compatible with all FPV models."
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
      image: "images/image4.png",
      joinedDate: "2023-08-14"
    }
  ],
  messages: [
    {
      id: "MSG-1",
      sender: "Mike Tyson",
      email: "mike.tyson@ironmike.com",
      avatar: "images/image1.png",
      subject: "Order Shipping Inquiry",
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
      subject: "Bulk Order Inquiry",
      preview: "Do you supply bulk orders for flight batteries?",
      body: "Hello,\n\nWe are looking to purchase 50 units of the Smart Flight Battery Pro for commercial operation. Do you offer bulk discounts?\n\nThanks,\nSarah",
      time: "1 hour ago",
      timestamp: Date.now() - 3600000,
      unread: false,
      starred: true
    },
    {
      id: "MSG-5",
      sender: "System Alert",
      email: "system@admindash.io",
      avatar: "images/image2.png",
      subject: "Weekly Analytics Summary Ready",
      preview: "Weekly analytics summary report is generated and ready for download.",
      body: "System Automated Notification:\n\nYour weekly sales performance and inventory report for August 2026 has been generated successfully. You can download the PDF summary under the Reports tab.\n\nBest regards,\nAdmin System Engine",
      time: "3 hours ago",
      timestamp: Date.now() - 10800000,
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
      time: "info",
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
      action: "recieved his order of Night lion tech GPS drone",
      time: "2 min ago"
    },
    {
      id: "UPD-2",
      name: "Jos Butler",
      avatar: "images/image4.png",
      action: "recieved his order of Lazenge Drone",
      time: "12 min ago"
    },
    {
      id: "UPD-3",
      name: "David Warner",
      avatar: "images/image3.png",
      action: "recieved his order of LARVENDER KF102 Drone",
      time: "20 min ago"
    }
  ],
  settings: {
    fullName: "John Doe",
    email: "john.admin@dashboard.com",
    role: "Super Admin",
    phone: "+1 (555) 019-2831",
    bio: "Administrator managing store operations, orders, inventory, and customer relationships.",
    emailNotifications: true,
    orderAlerts: true,
    systemUpdates: false,
    twoFactor: true,
    theme: "light",
    accentColor: "#7380ec"
  }
};

function getStore() {
  const data = localStorage.getItem("admin_dashboard_store_v1");
  if (!data) {
    localStorage.setItem("admin_dashboard_store_v1", JSON.stringify(initialData));
    return JSON.parse(JSON.stringify(initialData));
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    localStorage.setItem("admin_dashboard_store_v1", JSON.stringify(initialData));
    return JSON.parse(JSON.stringify(initialData));
  }
}

function saveStore(store) {
  localStorage.setItem("admin_dashboard_store_v1", JSON.stringify(store));
}

// Global scope initialization
const currentStore = getStore();
window.orders = currentStore.orders;
window.getStore = getStore;
window.saveStore = saveStore;
