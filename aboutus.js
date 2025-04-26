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


  