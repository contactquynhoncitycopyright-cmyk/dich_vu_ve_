// Dữ liệu tĩnh — sau này có thể thay bằng gọi API/CMS thật mà không cần sửa HTML.
// Ảnh đang dùng placeholder (picsum.photos). Thay src bằng ảnh thật của bạn, ví dụ: "images/nha-o-1.jpg"

const SERVICES = [
  { icon: "🏠", name: "Vệ sinh nhà ở", desc: "Dọn dẹp toàn bộ không gian sống", price: "Từ 299.000đ", img: "https://picsum.photos/seed/nhao/400/300", category: "nha-o" },
  { icon: "🏢", name: "Vệ sinh văn phòng", desc: "Giữ nơi làm việc luôn sạch sẽ", price: "Từ 399.000đ", img: "https://picsum.photos/seed/vanphong/400/300", category: "van-phong" },
  { icon: "🏗️", name: "Vệ sinh sau xây dựng", desc: "Dọn bụi, xà bần sau thi công", price: "Từ 599.000đ", img: "https://picsum.photos/seed/xaydung/400/300", category: "xay-dung" },
  { icon: "🛋️", name: "Vệ sinh sofa & nệm", desc: "Giặt sạch, khử mùi, diệt khuẩn", price: "Từ 199.000đ", img: "https://picsum.photos/seed/sofa/400/300", category: "sofa" },
  { icon: "🪟", name: "Vệ sinh kính", desc: "Kính sáng bóng, an toàn", price: "Từ 149.000đ", img: "https://picsum.photos/seed/kinh/400/300", category: "kinh" },
  { icon: "✨", name: "Tổng vệ sinh", desc: "Vệ sinh chuyên sâu toàn diện", price: "Từ 799.000đ", img: "https://picsum.photos/seed/tongvesinh/400/300", category: "nha-o" },
];

const FAQS = [
  ["Giá dịch vụ được tính như thế nào?", "Giá phụ thuộc diện tích, loại hình và mức độ vệ sinh. Chúng tôi báo giá cụ thể sau khi khảo sát."],
  ["Tôi có thể đặt lịch trước bao lâu?", "Bạn có thể đặt lịch trước từ vài giờ đến vài tuần, tùy nhu cầu."],
  ["Có thể đổi lịch không?", "Có, vui lòng liên hệ trước ít nhất 2 giờ để đổi lịch."],
  ["Nhân viên có mang dụng cụ không?", "Có, đội ngũ mang đầy đủ dụng cụ và hóa chất chuyên dụng."],
];

const GALLERY = [
  { img: "https://picsum.photos/seed/g1/500/375", tag: "Nhà ở", category: "nha-o" },
  { img: "https://picsum.photos/seed/g2/500/375", tag: "Nhà ở", category: "nha-o" },
  { img: "https://picsum.photos/seed/g3/500/375", tag: "Văn phòng", category: "van-phong" },
  { img: "https://picsum.photos/seed/g4/500/375", tag: "Văn phòng", category: "van-phong" },
  { img: "https://picsum.photos/seed/g5/500/375", tag: "Sofa", category: "sofa" },
  { img: "https://picsum.photos/seed/g6/500/375", tag: "Sofa", category: "sofa" },
  { img: "https://picsum.photos/seed/g7/500/375", tag: "Kính", category: "kinh" },
  { img: "https://picsum.photos/seed/g8/500/375", tag: "Sau xây dựng", category: "xay-dung" },
  { img: "https://picsum.photos/seed/g9/500/375", tag: "Sau xây dựng", category: "xay-dung" },
];
