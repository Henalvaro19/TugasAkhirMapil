const supabaseUrl = "https://suzgsimnflhiwaqlhloe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1emdzaW1uZmxoaXdhcWxobG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNzMxMzUsImV4cCI6MjA5Mjc0OTEzNX0.AKK1sV5ghmuBtB3GIZKRFBzM_hhLYjlkbkyMUlHMChE";


// 🔌 Koneksi ke Supabase
const client = supabase.createClient(supabaseUrl, supabaseKey);

async function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let payment = document.getElementById("payment").value;

  if (cart.length === 0) {
    alert("Keranjang kosong!");
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
    alert("Gagal checkout!");
    console.error(error);
    return;
  }

  alert("Pesanan dibuat! Silakan lakukan pembayaran.");
  localStorage.removeItem("cart");
  window.location.href = "orders.html";
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