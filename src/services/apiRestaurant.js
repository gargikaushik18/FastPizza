////////////////////////////// THIS API IS STOP WORKING < SO I INTRODUCE DUMMY DATA IN THE END

// const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

// export async function getMenu() {
//   const res = await fetch(`${API_URL}/menu`);

//   // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
//   if (!res.ok) throw Error('Failed getting menu');

//   const { data } = await res.json();
//   return data;
// }

// export async function getOrder(id) {
//   const res = await fetch(`${API_URL}/order/${id}`);
//   if (!res.ok) throw Error(`Couldn't find order #${id}`);

//   const { data } = await res.json();
//   return data;
// }

// export async function createOrder(newOrder) {
//   try {
//     const res = await fetch(`${API_URL}/order`, {
//       method: 'POST',
//       body: JSON.stringify(newOrder),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!res.ok) throw Error();
//     const { data } = await res.json();
//     return data;
//   } catch {
//     throw Error('Failed creating your order');
//   }
// }

// export async function updateOrder(id, updateObj) {
//   try {
//     const res = await fetch(`${API_URL}/order/${id}`, {
//       method: 'PATCH',
//       body: JSON.stringify(updateObj),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!res.ok) throw Error();
//     // We don't need the data, so we don't return anything
//   } catch (err) {
//     throw Error('Failed updating your order');
//   }
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api.js (mocked version)

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: ["Bread", "Italian olive oil", "Rosemary"],
    unitPrice: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: ["Tomato", "Mozarella"],
    unitPrice: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: ["Tomato", "Mozarella", "Spinach", "Ricotta cheese"],
    unitPrice: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: ["Tomato", "Mozarella", "Mushrooms", "Onion"],
    unitPrice: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: ["Tomato", "Mozarella", "Pepperoni"],
    unitPrice: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: ["Tomato", "Mozarella", "Ham", "Aragula", "Burrata cheese"],
    unitPrice: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1618213957768-7789409b9dd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    soldOut: false,
  },
];

// // simulate latency
// const wait = (ms) => new Promise((res) => setTimeout(res, ms));

// export async function getMenu() {
//   await wait(500); // simulate fetch delay
//   return pizzaData;
// }
// const ORDERS_KEY = "mock_orders";

// function loadOrders() {
//   try {
//     return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
//   } catch {
//     return [];
//   }
// }
// function saveOrders(orders) {
//   localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
// }

// let orders = loadOrders();

// export async function createOrder(newOrder) {
//   await wait(500);
//   const id = Date.now();
//   const estimatedDelivery = new Date(Date.now() + 30 * 60 * 1000).toISOString();
//   // delivery 30 minutes later

//   const order = {
//     id,
//     ...newOrder, // user-provided fields like cart, address
//     status: "pending",
//     priority: false,
//     priorityPrice: 0,
//     orderPrice: 0,
//     estimatedDelivery, // ✅ always valid ISO string
//     createdAt: new Date().toISOString(),
//   };

//   pizzaData.push(order);
//   return order;
// }

// export async function getOrder(id) {
//   await wait(200);
//   const iid = Number(id);
//   const order = orders.find((o) => o.id === iid);
//   if (!order) throw Error(`Couldn't find order #${id}`);
//   return order;
// }

// export async function updateOrder(id, updateObj) {
//   await wait(500);
//   const idx = pizzaData.findIndex((p) => p.id === id);
//   if (idx === -1) throw Error("Order not found");
//   pizzaData[idx] = { ...pizzaData[idx], ...updateObj };
//   return pizzaData[idx];
// }

// simulate latency
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const ORDERS_KEY = "mock_orders";

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

let orders = loadOrders();

export async function getMenu() {
  await wait(500);
  return pizzaData; // ✅ keep menu data separate
}

export async function createOrder(newOrder) {
  await wait(500);
  const id = Date.now();
  const estimatedDelivery = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  // calculate total order price from cart
  const orderPrice =
    newOrder.cart?.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    ) || 0;

  const order = {
    id,
    ...newOrder,
    status: "pending",
    priority: false,
    priorityPrice: 0,
    orderPrice,
    estimatedDelivery,
    createdAt: new Date().toISOString(),
  };

  // ✅ push into orders (persistent), not pizzaData
  orders.push(order);
  saveOrders(orders);

  return order;
}

export async function getOrder(id) {
  await wait(200);
  const iid = Number(id);
  const order = orders.find((o) => o.id === iid);
  if (!order) throw Error(`Couldn't find order #${id}`);
  return order;
}

export async function updateOrder(id, updateObj) {
  await wait(500);
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) throw Error("Order not found");

  orders[idx] = { ...orders[idx], ...updateObj };
  saveOrders(orders);

  return orders[idx];
}
