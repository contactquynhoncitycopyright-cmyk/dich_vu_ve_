// Render menu con "Dịch vụ" trong header (chỉ chạy nếu trang có #navServiceMenu)
const navServiceMenu = document.getElementById("navServiceMenu");
if (navServiceMenu) {
  const onHome = location.pathname.endsWith("index.html") || location.pathname === "/" || location.pathname.endsWith("/cleanhome/");
  navServiceMenu.innerHTML = SERVICES.map(s =>
    `<a href="${onHome ? "#services" : "index.html#services"}">${s.icon} ${s.name}</a>`
  ).join("");
  // Trên mobile, bấm vào "Dịch vụ ▾" sẽ mở/đóng menu con thay vì chuyển trang
  const dropdownLink = navServiceMenu.parentElement.querySelector("a");
  dropdownLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 720) {
      e.preventDefault();
      navServiceMenu.parentElement.classList.toggle("open");
    }
  });
}

// Render dịch vụ (chỉ chạy nếu trang có #serviceGrid)
const serviceGrid = document.getElementById("serviceGrid");
if (serviceGrid) {
  serviceGrid.innerHTML = SERVICES.map(s => `
    <div class="card">
      <img src="${s.img}" alt="${s.name}" loading="lazy">
      <div class="card-body">
        <h3>${s.icon} ${s.name}</h3>
        <p>${s.desc}</p>
        <div class="price">${s.price}</div>
        <button class="btn btn-outline" style="width:100%" onclick="openBooking('${s.name}')">Đặt ngay</button>
      </div>
    </div>`).join("");
}

// Preview 3 ảnh gallery trên trang chủ
const previewGrid = document.getElementById("previewGrid");
if (previewGrid) {
  previewGrid.innerHTML = GALLERY.slice(0, 3).map(g => `
    <div class="gallery-item"><img src="${g.img}" alt="${g.tag}" loading="lazy"><span class="tag">${g.tag}</span></div>
  `).join("");
}

// Render FAQ
const faqList = document.getElementById("faqList");
if (faqList) {
  faqList.innerHTML = FAQS.map(f => `
    <div class="faq-item" onclick="this.classList.toggle('open')">
      <div class="faq-q"><span>${f[0]}</span><span>+</span></div>
      <div class="faq-a">${f[1]}</div>
    </div>`).join("");
}

function openBooking(svc) {
  document.getElementById("bookingModal").classList.add("show");
  if (svc) document.getElementById("f_service").value = svc;
}
function closeBooking() {
  document.getElementById("bookingModal").classList.remove("show");
}
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

function submitBooking() {
  const name = document.getElementById("f_name").value.trim();
  const phone = document.getElementById("f_phone").value.trim();
  if (!name || !phone) { showToast("Vui lòng nhập tên và số điện thoại"); return; }

  const order = {
    name, phone,
    email: document.getElementById("f_email").value.trim(),
    service: document.getElementById("f_service").value,
    address: document.getElementById("f_address").value.trim(),
    date: document.getElementById("f_date").value,
    time: document.getElementById("f_time").value,
    note: document.getElementById("f_note").value.trim(),
  };

  OrderStore.add(order);
  showToast("Đặt dịch vụ thành công! Chúng tôi sẽ liên hệ xác nhận sớm.");
  closeBooking();
  ["f_name", "f_phone", "f_email", "f_address", "f_date", "f_time", "f_note"]
    .forEach(id => document.getElementById(id).value = "");
}
