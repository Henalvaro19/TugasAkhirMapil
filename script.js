const supabaseUrl = "https://suzgsimnflhiwaqlhloe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1emdzaW1uZmxoaXdhcWxobG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNzMxMzUsImV4cCI6MjA5Mjc0OTEzNX0.AKK1sV5ghmuBtB3GIZKRFBzM_hhLYjlkbkyMUlHMChE";


// 🔌 Koneksi ke Supabase
const client = supabase.createClient(supabaseUrl, supabaseKey);

function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function showSkeleton() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    container.innerHTML += `<div class="card skeleton"></div>`;
  }
}

// 🛒 Update jumlah cart
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = "Keranjang: " + cart.length;
}

// ➕ Tambah ke cart
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ id, name, price });

  localStorage.setItem("cart", JSON.stringify(cart));

  showToast("Produk ditambahkan ke keranjang!");
  updateCartCount();
}

// 📦 Ambil produk dari database
let page = 0;
const limit = 6;

async function getProducts() {
  showSkeleton();

  let from = page * limit;
  let to = from + limit - 1;

  let { data, error } = await client
    .from("products")
    .select("*")
    .range(from, to);

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("products");

  if (page === 0) container.innerHTML = "";

  data.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image_url}" />
        <h3>${product.name}</h3>
        <p>Rp ${product.price}</p>
        <p>${product.description}</p>
        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
          🛒 Tambah ke Keranjang
        </button>
      </div>
    `;
  });
}

// 🚀 Jalankan
getProducts();
updateCartCount();