const supabaseUrl = "https://suzgsimnflhiwaqlhloe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1emdzaW1uZmxoaXdhcWxobG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNzMxMzUsImV4cCI6MjA5Mjc0OTEzNX0.AKK1sV5ghmuBtB3GIZKRFBzM_hhLYjlkbkyMUlHMChE";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function getProducts() {
  let { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("products");

  data.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image_url}" />
        <h3>${product.name}</h3>
        <p>Rp ${product.price}</p>
        <p>${product.description}</p>
      </div>
    `;
  });
}

getProducts();