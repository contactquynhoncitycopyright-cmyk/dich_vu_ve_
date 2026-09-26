// Gate: nếu chưa đăng nhập thì đá về trang login
if (sessionStorage.getItem("cleanhome_admin_auth") !== "1") {
  location.href = "admin-login.html";
}

function logout() {
  sessionStorage.removeItem("cleanhome_admin_auth");
  location.href = "admin-login.html";
}

const STATUS_LABEL = {
  pending: "Mới",
  confirmed: "Đã xác nhận",
  in_progress: "Đang thực hiện",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

// Đăng ký nhận cập nhật đơn hàng theo thời gian thực (localStorage event).
// Khi chuyển sang backend thật, thay OrderStore.subscribe bằng WebSocket/Supabase realtime.
OrderStore.subscribe((orders) => {
  renderStats(orders);
  renderOrders(orders);
});

function renderStats(orders) {
  const total = orders.length;
  const pending = orders.filter(o => o.status === "pending").length;
  const done = orders.filter(o => o.status === "completed").length;
  document.getElementById("statGrid").innerHTML = `
    <div class="stat"><div class="num">${total}</div><div class="lbl">Tổng đơn</div></div>
    <div class="stat"><div class="num">${pending}</div><div class="lbl">Đơn mới</div></div>
    <div class="stat"><div class="num">${done}</div><div class="lbl">Hoàn thành</div></div>`;

  const bell = document.getElementById("bellIcon");
  if (pending > 0) {
    bell.style.display = "inline";
    document.getElementById("bellCount").textContent = pending;
  } else {
    bell.style.display = "none";
  }
}

function renderOrders(orders) {
  const tb = document.getElementById("ordersBody");
  if (!orders.length) {
    tb.innerHTML = `<tr><td colspan="6" class="empty">Chưa có đơn hàng nào</td></tr>`;
    return;
  }
  tb.innerHTML = orders.map(o => `
    <tr>
      <td>#${o.id.slice(-6)}</td>
      <td>${o.name || "-"}<br><span style="color:var(--muted);font-size:.8rem">${o.phone || ""}</span></td>
      <td>${o.service || "-"}</td>
      <td>${o.date || ""} ${o.time || ""}</td>
      <td><span class="badge b-${o.status}">${STATUS_LABEL[o.status] || o.status}</span></td>
      <td>
        <select class="status-sel" onchange="OrderStore.updateStatus('${o.id}', this.value)">
          ${Object.keys(STATUS_LABEL).map(s => `<option value="${s}" ${s === o.status ? "selected" : ""}>${STATUS_LABEL[s]}</option>`).join("")}
        </select>
      </td>
    </tr>`).join("");
}
