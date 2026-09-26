const CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "nha-o", label: "Nhà ở" },
  { id: "van-phong", label: "Văn phòng" },
  { id: "sofa", label: "Sofa" },
  { id: "kinh", label: "Kính" },
  { id: "xay-dung", label: "Sau xây dựng" },
];

let activeFilter = "all";

document.getElementById("filters").innerHTML = CATEGORIES.map(c => `
  <button class="filter-btn ${c.id === "all" ? "active" : ""}" data-cat="${c.id}">${c.label}</button>
`).join("");

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.cat;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery();
  });
});

function renderGallery() {
  const items = activeFilter === "all" ? GALLERY : GALLERY.filter(g => g.category === activeFilter);
  document.getElementById("galleryGrid").innerHTML = items.map(g => `
    <div class="gallery-item" onclick="openLightbox('${g.img}')">
      <img src="${g.img}" alt="${g.tag}" loading="lazy">
      <span class="tag">${g.tag}</span>
    </div>`).join("") || `<p class="empty">Chưa có hình ảnh nào trong danh mục này.</p>`;
}
renderGallery();

function openLightbox(src) {
  document.getElementById("lightboxImg").src = src;
  document.getElementById("lightbox").classList.add("show");
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("show");
}
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeLightbox();
});
