const supabaseUrl = "https://suzgsimnflhiwaqlhloe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1emdzaW1uZmxoaXdhcWxobG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNzMxMzUsImV4cCI6MjA5Mjc0OTEzNX0.AKK1sV5ghmuBtB3GIZKRFBzM_hhLYjlkbkyMUlHMChE";


// 🔌 Koneksi ke Supabase
const client = supabase.createClient(supabaseUrl, supabaseKey);

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

  alert("Produk ditambahkan ke keranjang!");
  updateCartCount();
}

// 📦 Ambil produk dari database
async function getProducts() {
  let { data, error } = await client
    .from("products")
    .select("*");

  if (error) {
    console.error("ERROR:", error);
    return;
  }

  const container = document.getElementById("products");
  container.innerHTML = "";

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