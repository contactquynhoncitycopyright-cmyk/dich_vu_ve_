# CleanHome — Website dịch vụ vệ sinh (MVP)

## Cấu trúc thư mục
```
cleanhome/
├── index.html          # Trang chủ khách hàng
├── about.html            # Giới thiệu công ty
├── pricing.html          # Bảng giá chi tiết
├── gallery.html         # Thư viện hình ảnh
├── contact.html          # Liên hệ (form + bản đồ)
├── admin-login.html     # Đăng nhập quản trị
├── admin.html            # Trang quản trị (dashboard, đơn hàng) — TÁCH RIÊNG khỏi site khách hàng
├── css/style.css         # CSS dùng chung cho toàn bộ site
└── js/
    ├── data.js           # Dữ liệu tĩnh: dịch vụ, FAQ, hình ảnh gallery
    ├── store.js          # Lớp lưu trữ dữ liệu đơn hàng (hiện dùng localStorage)
    ├── customer.js       # Logic dùng chung cho các trang khách hàng (booking modal, menu dịch vụ, FAQ...)
    ├── gallery.js        # Logic riêng trang gallery (filter, lightbox)
    └── admin.js          # Logic trang quản trị (bảng đơn hàng, đổi trạng thái)
```

## Cập nhật mới
- **Logo bấm để về trang chủ**: mọi trang khách hàng bấm logo "🧼 CleanHome" sẽ quay về `index.html`;
  trong trang quản trị, logo bấm về `admin.html` (dashboard). Giúp người dùng dễ quay lại từ đầu.
- **Tách nhiều trang riêng biệt** thay vì gộp hết vào 1 trang: Trang chủ / Giới thiệu / Bảng giá /
  Hình ảnh / Liên hệ — mỗi trang có URL riêng, dễ chia sẻ và làm SEO sau này.
- **Menu Dịch vụ dạng dropdown** ở header (di chuột vào để xem danh sách dịch vụ).
- **Top bar** hiển thị hotline/email/giờ làm việc phía trên header — tham khảo bố cục của
  các website dịch vụ vệ sinh phổ biến (không sao chép nội dung/hình ảnh).
- **Nút liên hệ nhanh** (Zalo, Messenger, Gọi điện) nổi góc phải mọi trang.

## Cách chạy trong VS Code
1. Mở thư mục `cleanhome` trong VS Code.
2. Cài extension **Live Server** (Ritwick Dey).
3. Chuột phải vào `index.html` → **Open with Live Server**.
4. Trang khách hàng mở tại `index.html`, trang quản trị tại `admin.html`
   (đăng nhập demo: `admin@cleanhome.vn` / `admin123`).

## Đặc điểm bản MVP này
- **Tách 2 khu vực hoàn toàn riêng biệt**: khách hàng (`index.html`, `gallery.html`)
  và quản trị (`admin-login.html`, `admin.html`) — không dùng chung 1 trang.
- **Đặt lịch → hiện ngay ở admin**: dùng `localStorage` + sự kiện tùy chỉnh để
  giả lập realtime. Mở 2 tab (1 tab `index.html`, 1 tab `admin.html`), đặt lịch ở
  tab khách sẽ thấy đơn xuất hiện ngay ở tab admin không cần refresh.
- **Hình ảnh**: đang dùng ảnh placeholder từ picsum.photos để bạn thấy layout hoạt
  động ngay. Thay bằng ảnh thật của bạn bằng cách:
  - Tạo thư mục `images/` trong dự án, bỏ ảnh vào đó.
  - Sửa `img: "https://picsum.photos/..."` trong `js/data.js` thành
    `img: "images/ten-anh.jpg"`.

## Giới hạn cần biết trước khi dùng thật cho khách hàng
Đây vẫn là bản demo chạy hoàn toàn phía trình duyệt (không có server thật), nên:
- Dữ liệu đơn hàng chỉ lưu trong `localStorage` của **trình duyệt trên máy đó** —
  khách đặt lịch trên điện thoại của họ sẽ KHÔNG hiện ở máy admin của bạn.
- Đăng nhập admin chỉ là kiểm tra mật khẩu ở phía client — ai xem mã nguồn cũng
  thấy được mật khẩu (`admin-login.html`). Không dùng để bảo vệ dữ liệu thật.
- Cần một backend thật (Node/Express + PostgreSQL, hoặc Supabase/Firebase) để:
  - Lưu đơn hàng tập trung, mọi thiết bị đều thấy.
  - Xác thực đăng nhập an toàn (hash mật khẩu, JWT/session).
  - Gửi thông báo realtime thật (WebSocket/Supabase Realtime) giữa khách và admin
    khi họ không dùng chung một trình duyệt.

Toàn bộ logic dữ liệu đã được gom vào `js/store.js` — khi có backend thật, bạn chỉ
cần viết lại các hàm bên trong file này bằng `fetch()`/SDK tương ứng, phần giao diện
(`customer.js`, `admin.js`) không cần sửa.
