/**
 * store.js
 * Lớp truy cập dữ liệu dùng chung cho toàn bộ site (khách hàng + admin).
 * Hiện dùng localStorage để chạy demo không cần backend.
 *
 * QUAN TRỌNG: Khi có backend thật (Node/Express, Supabase, Firebase...),
 * chỉ cần viết lại các hàm bên trong OrderStore bằng fetch()/SDK tương ứng.
 * Phần code ở customer.js và admin.js gọi qua OrderStore.* nên KHÔNG cần sửa gì thêm.
 */
const OrderStore = (() => {
  const KEY = "cleanhome_orders";
  const EVENT = "cleanhome_orders_updated";

  function seedIfEmpty() {
    if (localStorage.getItem(KEY)) return;
    const now = Date.now();
    const seed = [
      { id: "s1", name: "Nguyễn Văn A", phone: "0901111111", service: "Vệ sinh nhà ở", address: "Q.1, TP.HCM", date: "2026-09-28", time: "09:00", note: "", status: "pending", createdAt: now - 1000 * 60 * 5 },
      { id: "s2", name: "Trần Thị B", phone: "0902222222", service: "Vệ sinh văn phòng", address: "Q.3, TP.HCM", date: "2026-09-27", time: "14:00", note: "Văn phòng 200m2", status: "confirmed", createdAt: now - 1000 * 60 * 60 },
      { id: "s3", name: "Lê Văn C", phone: "0903333333", service: "Vệ sinh sofa", address: "Q.7, TP.HCM", date: "2026-09-26", time: "10:00", note: "", status: "completed", createdAt: now - 1000 * 60 * 60 * 24 },
    ];
    localStorage.setItem(KEY, JSON.stringify(seed));
  }

  function _read() {
    seedIfEmpty();
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  function _write(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
    // Báo cho các tab/trang khác (vd trang admin) cập nhật ngay lập tức
    window.dispatchEvent(new CustomEvent(EVENT));
  }

  return {
    /** Lấy toàn bộ đơn hàng, mới nhất trước */
    getAll() {
      return _read().sort((a, b) => b.createdAt - a.createdAt);
    },
    /** Thêm đơn hàng mới, trả về đơn đã tạo (có id + trạng thái pending) */
    add(order) {
      const list = _read();
      const newOrder = {
        id: "o" + Date.now() + Math.floor(Math.random() * 1000),
        status: "pending",
        createdAt: Date.now(),
        ...order,
      };
      list.push(newOrder);
      _write(list);
      return newOrder;
    },
    /** Cập nhật trạng thái 1 đơn hàng */
    updateStatus(id, status) {
      const list = _read();
      const idx = list.findIndex((o) => o.id === id);
      if (idx > -1) { list[idx].status = status; _write(list); }
    },
    /** Đăng ký callback mỗi khi dữ liệu thay đổi (giả lập realtime).
     *  Trả về hàm để hủy đăng ký. */
    subscribe(cb) {
      const handler = () => cb(this.getAll());
      window.addEventListener(EVENT, handler);
      window.addEventListener("storage", handler); // đồng bộ giữa các tab khác nhau
      cb(this.getAll()); // gọi ngay lần đầu
      return () => {
        window.removeEventListener(EVENT, handler);
        window.removeEventListener("storage", handler);
      };
    },
  };
})();
