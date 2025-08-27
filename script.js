// Ubah ke nomor admin kamu. Pakai format 62, tanpa + dan tanpa 0 di depan.
const NOMOR_ADMIN = "6285782580079";

// Normalisasi nomor ke format 62xxxxxxxxx
function normalisasiKe62(no) {
  let n = (no || "").replace(/[^0-9+]/g, "");
  if (n.startsWith("+")) n = n.slice(1);
  if (n.startsWith("0")) return "62" + n.slice(1);
  if (!n.startsWith("62")) return "62" + n; // kalau user isi 8xxxxxxxx
  return n;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("order-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // jangan reload halaman

    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value.trim();
    const hp = document.getElementById("hp").value.trim();
    const pesanan = document.getElementById("pesanan").value.trim();
    const pembayaran = document.getElementById("pembayaran").value;

    // validasi 
    if (!nama || !kelas || !hp || !pesanan || !pembayaran) {
      alert("Harap lengkapi semua data.");
      return;
    }

    const nomorAdmin = normalisasiKe62(NOMOR_ADMIN);

    const pesan =
      "Halo Admin, saya ingin memesan:\n" +
      "------------------------\n" +
      "👤 Nama: " +
      nama +
      "\n" +
      "🏫 Kelas: " +
      kelas +
      "\n" +
      "📱 Nomor HP: " +
      hp +
      "\n" +
      "🛒 Pesanan: " +
      pesanan +
      "\n" +
      "💳 Pembayaran: " +
      pembayaran +
      "\n" +
      "------------------------";

    // Jangan make wa.me soalnya bkl ke block sama window.location nya
    const url =
      "https://api.whatsapp.com/send?phone=" + nomorAdmin + "&text=" + encodeURIComponent(pesan);

    // Aman
    window.location.href = url;
  });
});
