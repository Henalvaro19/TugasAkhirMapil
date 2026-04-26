const supabaseUrl = "https://suzgsimnflhiwaqlhloe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1emdzaW1uZmxoaXdhcWxobG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNzMxMzUsImV4cCI6MjA5Mjc0OTEzNX0.AKK1sV5ghmuBtB3GIZKRFBzM_hhLYjlkbkyMUlHMChE";

const client = supabase.createClient(supabaseUrl, supabaseKey);

async function loadOrders() {
  let { data, error } = await client
    .from("orders")
    .select("*")
    .order("id", { ascending: false });

  const container = document.getElementById("orders");
  container.innerHTML = "";

  data.forEach(order => {
    container.innerHTML += `
      <div class="card">
        <h3>Order #${order.id}</h3>
        <p>Total: Rp ${Number(order.total).toLocaleString('id-ID')}</p>
        <p>Pembayaran: ${order.payment_method}</p>
        <p>Status: <b>${order.status}</b></p>
      </div>
    `;
  });
}

loadOrders();