let total = 0;
const orderList = document.getElementById('order-list');
const totalPriceElement = document.getElementById('total-price');

// Menyimpan pesanan dalam objek
const orders = {};

function showTab(tabName) {
  const tabs = ['pesanan', 'proses', 'selesai'];
  tabs.forEach(name => {
    document.getElementById(`tab-${name}`).style.display = name === tabName ? 'block' : 'none';
    const btn = document.querySelector(`.tab-button[onclick*="${name}"]`);
    btn.classList.toggle('active', name === tabName);
  });
}

function addToOrder(name, price) {
  if (orderList.children.length === 1 && orderList.children[0].tagName === 'P') {
    orderList.innerHTML = '';
  }

  if (orders[name]) {
    // Jika item sudah ada, tambah jumlah dan update tampilan
    orders[name].quantity += 1;
    orders[name].totalPrice += price;
    orders[name].span.innerText = `${name} (x${orders[name].quantity}) - Rp. ${orders[name].totalPrice.toLocaleString()}`;
  } else {
    // Buat elemen baru
    const item = document.createElement('div');
    item.className = 'order-item';

    const span = document.createElement('span');
    span.innerText = `${name} (x1) - Rp. ${price.toLocaleString()}`;

    const undoBtn = document.createElement('button');
    undoBtn.className = 'btn-undo';
    undoBtn.innerText = 'Undo';
    undoBtn.onclick = () => {
      orders[name].quantity -= 1;
      orders[name].totalPrice -= price;
      total -= price;

      if (orders[name].quantity <= 0) {
        // Hapus jika jumlah 0
        delete orders[name];
        orderList.removeChild(item);
        if (Object.keys(orders).length === 0) {
          orderList.innerHTML = '<p>Tidak Ada Pesanan</p>';
        }
      } else {
        orders[name].span.innerText = `${name} (x${orders[name].quantity}) - Rp. ${orders[name].totalPrice.toLocaleString()}`;
      }

      totalPriceElement.innerHTML = `<strong>Total: Rp. ${total.toLocaleString()}</strong>`;
      cekBayarButton();
    };

    item.appendChild(span);
    item.appendChild(undoBtn);
    orderList.appendChild(item);

    // Simpan ke object orders
    orders[name] = {
      quantity: 1,
      totalPrice: price,
      span: span
    };
  }

  total += price;
  totalPriceElement.innerHTML = `<strong>Total: Rp. ${total.toLocaleString()}</strong>`;
  cekBayarButton();
}

const bayarButton = document.getElementById('btn-bayar');

// function selesaikanPembayaran() {
//   const orderList = document.getElementById("order-list");
//   const prosesTab = document.getElementById("tab-proses");
//   const selesaiTab = document.getElementById("tab-selesai");
//   const totalPriceElement = document.getElementById("total-price");

//   const items = orderList.querySelectorAll(".order-item");

//   if (items.length === 0) {
//     closePopUp(); // Tetap tutup popup walau tidak ada item
//     return;
//   }

//   // Bersihkan teks default
//   if (prosesTab.textContent.trim() === "Proses kosong") {
//     prosesTab.innerHTML = "";
//   }

//   items.forEach(item => {
//     // Hapus tombol undo jika ada
//     const undoBtn = item.querySelector(".undo-button");
//     if (undoBtn) undoBtn.remove();

//     // Tambahkan tombol selesai
//     const selesaiBtn = document.createElement("button");
//     selesaiBtn.innerText = "Selesai";
//     selesaiBtn.className = "button selesai-button";
//     selesaiBtn.style.marginTop = "0.5rem";

//     selesaiBtn.addEventListener("click", () => {
//       if (selesaiTab.textContent.trim() === "Selesai kosong") {
//         selesaiTab.innerHTML = "";
//       }
//       selesaiBtn.remove();
//       selesaiTab.appendChild(item);
//     });

//     item.appendChild(selesaiBtn);
//     prosesTab.appendChild(item);
//   });

//   // Reset pesanan
//   orderList.innerHTML = "<p>Tidak Ada Pesanan</p>";
//   totalPriceElement.innerHTML = "<strong>Total: Rp. 0</strong>";
//   document.getElementById("btn-bayar").style.display = "none";

//   if (typeof orders === 'object') {
//     for (let key in orders) delete orders[key];
//   }

//   cekBayarButton();

//   closePopUp(); // Tutup popup di akhir
// }


function bayar() {
  const orderList = document.getElementById("order-list");
  const prosesTab = document.getElementById("tab-proses");

  // Ambil semua item di daftar pesanan
  const items = orderList.querySelectorAll(".order-item");

  if (items.length === 0) return;

  // Bersihkan tab Proses jika masih ada teks default
  if (prosesTab.textContent.trim() === "Proses kosong") {
    prosesTab.innerHTML = "";
  }

  items.forEach(item => {
    // Hapus tombol Undo jika ada
    const undoBtn = item.querySelector(".undo-button");
    if (undoBtn) undoBtn.remove();

    // Tambahkan tombol "Selesai"
    const selesaiBtn = document.createElement("button");
    selesaiBtn.innerText = "Selesai";
    selesaiBtn.className = "button selesai-button";
    selesaiBtn.style.marginTop = "0.5rem";

    // Event saat tombol Selesai ditekan
    selesaiBtn.addEventListener("click", () => {
      const selesaiTab = document.getElementById("tab-selesai");

      // Bersihkan teks default jika ada
      if (selesaiTab.textContent.trim() === "Selesai kosong") {
        selesaiTab.innerHTML = "";
      }

      selesaiBtn.remove(); // hapus tombol selesai dari item
      selesaiTab.appendChild(item);
    });

    item.appendChild(selesaiBtn);
    prosesTab.appendChild(item);
  });

  // Kosongkan tab Pesanan
  orderList.innerHTML = "<p>Tidak Ada Pesanan</p>";

  // Sembunyikan tombol bayar dan reset total
  document.getElementById("btn-bayar").style.display = "none";
  document.getElementById("total-price").innerHTML = "<strong>Total: Rp. 0</strong>";
  cekBayarButton();
  document.getElementById('popup-success').style.display = 'none';
  closePopUp();
}

function closePopUp() {
  document.getElementById('popup-success').style.display = 'none';
  selesaikanPembayaran();
}

function cekBayarButton() {
  if (Object.keys(orders).length > 0) {
    bayarButton.style.display = 'block';
  } else {
    bayarButton.style.display = 'none';
  }
}


bayarButton.addEventListener('click', bayar);


