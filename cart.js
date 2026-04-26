const supabaseUrl = "https://suzgsimnflhiwaqlhloe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1emdzaW1uZmxoaXdhcWxobG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNzMxMzUsImV4cCI6MjA5Mjc0OTEzNX0.AKK1sV5ghmuBtB3GIZKRFBzM_hhLYjlkbkyMUlHMChE";


// 🔌 Koneksi ke Supabase
const client = supabase.createClient(supabaseUrl, supabaseKey);

function showToast(message, isError = false) {
  let toast = document.createElement("div");
  toast.className = "toast";
  if (isError) toast.style.background = "#d9534f";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

async function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let payment = document.getElementById("payment").value;

  if (cart.length === 0) {
    showToast("Keranjang kosong!", true);
    return;
  }

  let total = 0;
  cart.forEach(item => total += item.price);

  let { error } = await client
    .from("orders")
    .insert([
      {
        items: JSON.stringify(cart),
        total: total,
        payment_method: payment,
        status: "Menunggu Pembayaran",
        created_at: new Date()
      }
    ]);

  if (error) {
    showToast("Gagal checkout!", true);
    console.error(error);
    return;
  }

  showToast("Pesanan dibuat! Silakan lakukan pembayaran.");
  localStorage.removeItem("cart");
  setTimeout(() => {
    window.location.href = "orders.html";
  }, 1500);
}


function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalText = document.getElementById("total");

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    container.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>Rp ${item.price}</p>
        <button onclick="removeItem(${index})">❌ Hapus</button>
      </div>
    `;
  });

  totalText.innerText = "Total: Rp " + total;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}

loadCart();