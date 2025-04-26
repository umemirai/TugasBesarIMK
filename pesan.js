function togglePopup(id) {
    const popup = document.getElementById(id);
    if (popup.style.display === "flex") {
      popup.style.display = "none";
    } else {
      popup.style.display = "flex";
    }
  }
  
  window.addEventListener('click', function(e) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });

 // Fungsi toggle yang menutup semua popup lain dulu
function togglePopup(popupId) {
  const popups = document.querySelectorAll('.popup');

  // Tutup semua popup
  popups.forEach(popup => {
    popup.style.display = 'none';
  });

  // Buka popup yang dimaksud
  const selectedPopup = document.getElementById(popupId);
  if (selectedPopup) {
    selectedPopup.style.display = 'flex';

    // Fokus ke input kalau ada
    const firstInput = selectedPopup.querySelector('input');
    if (firstInput) firstInput.focus();
  }
}

// Klik luar popup = tutup popup
window.addEventListener('click', function(e) {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
});

// OTP logic jika kamu pakai input 4 digit
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.otp-inputs input');

  inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value === '' && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  const btnKirim = document.querySelector('.btn-kirim');
  if (btnKirim) {
    btnKirim.addEventListener('click', () => {
      let code = '';
      inputs.forEach(input => {
        code += input.value;
      });

      if (code.length === 4) {
        alert("Kode dikonfirmasi: " + code);
        togglePopup('forgotCodePopup'); // Sesuaikan ID popup yang dimaksud
      } else {
        alert("Masukkan 4 digit kode verifikasi.");
      }
    });
  }
});


// Tombol konfirmasi
document.querySelector('.btn-kirim').addEventListener('click', () => {
  const inputs = document.querySelectorAll('.otp-inputs input');
  let code = '';
  inputs.forEach(input => {
    code += input.value;
  });

  if (code.length === 4) {
    console.log("Kode yang dimasukkan:", code);
    // TODO: kirim kode ke server untuk validasi
    alert("Kode dikonfirmasi: " + code);
    // Misalnya setelah berhasil:
    togglePopup('forgotCodePopup');
  } else {
    alert("Masukkan 4 digit kode verifikasi.");
  }
});

  });


  

let total = 0;
const orderList = document.getElementById('order-list');
const totalPriceElement = document.getElementById('total-price');

function addToOrder(name, price) {
  if (orderList.children.length === 1 && orderList.children[0].tagName === 'P') {
    orderList.innerHTML = '';
  }

  const item = document.createElement('div');
  item.className = 'order-item';

  const span = document.createElement('span');
  span.innerText = `${name} - Rp. ${price.toLocaleString()}`;

  const undoBtn = document.createElement('button');
  undoBtn.className = 'btn-undo';
  undoBtn.innerText = 'Undo';
  undoBtn.onclick = () => {
    total -= price;
    totalPriceElement.innerHTML = `<strong>Total: Rp. ${total.toLocaleString()}</strong>`;
    orderList.removeChild(item);
    if (orderList.children.length === 0) {
      orderList.innerHTML = '<p>Tidak Ada Pesanan</p>';
    }
  };

  total += price;
  totalPriceElement.innerHTML = `<strong>Total: Rp. ${total.toLocaleString()}</strong>`;

  item.appendChild(span);
  item.appendChild(undoBtn);
  orderList.appendChild(item);
}

function editAlamat() {
const currentAlamat = document.getElementById('alamat-output').innerText;
const inputHTML = `
  <input type="text" id="alamat-input" value="${currentAlamat}" style="width:100%; padding:0.5rem; border-radius:10px; border:1px solid #aaa; margin-top:0.5rem;">
  <button onclick="simpanAlamat()" style="margin-top:0.5rem; padding:0.3rem 1rem; background-color:#5e3b76; color:white; border:none; border-radius:6px; cursor:pointer;">Simpan</button>
`;
document.getElementById('alamat-output').outerHTML = `<div id="alamat-edit">${inputHTML}</div>`;
}

function simpanAlamat() {
const newAlamat = document.getElementById('alamat-input').value;
const outputHTML = `
  <div id="alamat-output" class="alamat-output">${newAlamat}</div>
`;
document.getElementById('alamat-edit').outerHTML = outputHTML;
}

const bayarButton = document.getElementById('btn-bayar');

function bayar() {
alert('Pembayaran berhasil! Terima kasih 😊');
// Reset pesanan
orderList.innerHTML = '<p>Tidak Ada Pesanan</p>';
total = 0;
totalPriceElement.innerHTML = `<strong>Total: Rp. ${total.toLocaleString()}</strong>`;
bayarButton.style.display = 'none';
}

function cekBayarButton() {
if (orderList.children.length > 0 && !(orderList.children.length === 1 && orderList.children[0].tagName === 'P')) {
bayarButton.style.display = 'block';
} else {
bayarButton.style.display = 'none';
}
}

// Tambahkan cekBayarButton() di dalam addToOrder dan undoBtn.onclick
function addToOrder(name, price) {
if (orderList.children.length === 1 && orderList.children[0].tagName === 'P') {
orderList.innerHTML = '';
}

const item = document.createElement('div');
item.className = 'order-item';

const span = document.createElement('span');
span.innerText = `${name} - Rp. ${price.toLocaleString()}`;

const undoBtn = document.createElement('button');
undoBtn.className = 'btn-undo';
undoBtn.innerText = 'Undo';
undoBtn.onclick = () => {
total -= price;
totalPriceElement.innerHTML = `<strong>Total: Rp. ${total.toLocaleString()}</strong>`;
orderList.removeChild(item);
if (orderList.children.length === 0) {
  orderList.innerHTML = '<p>Tidak Ada Pesanan</p>';
}
cekBayarButton();
};

total += price;
totalPriceElement.innerHTML = `<strong>Total: Rp. ${total.toLocaleString()}</strong>`;

item.appendChild(span);
item.appendChild(undoBtn);
orderList.appendChild(item);

cekBayarButton();
}

function bayar() {
document.getElementById('popup-success').style.display = 'flex';
// Reset pesanan setelah bayar
orderList.innerHTML = '<p>Tidak Ada Pesanan</p>';
total = 0;
totalPriceElement.innerHTML = `<strong>Total: Rp. ${total.toLocaleString()}</strong>`;
bayarButton.style.display = 'none';
}

function closePopup() {
document.getElementById('popup-success').style.display = 'none';
}
