import { ClipboardList, Map, Truck } from 'lucide-react'
import { workflows } from '../constants/mockData'

function AdminDashboardPage({ tasks, stats, onAdvanceTask }) {
  return (
    <section className="page">
      <div className="page-header">
        <h2>
          <ClipboardList size={22} /> Bảng điều phối Admin CLB
        </h2>
        <p>Điều phối chiến dịch, giao nhiệm vụ và theo dõi trạng thái thực thi.</p>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <p className="label">Tổng tác vụ</p>
          <strong>{stats.totalTasks}</strong>
        </div>
        <div className="stats-card">
          <p className="label">Tác vụ hoàn thành</p>
          <strong>{stats.completedTasks}</strong>
        </div>
        <div className="stats-card">
          <p className="label">Yêu cầu quyên góp</p>
          <strong>{stats.donationRequests}</strong>
        </div>
        <div className="stats-card">
          <p className="label">Đăng ký hiến máu</p>
          <strong>{stats.bloodRegistrations}</strong>
        </div>
      </div>

      <div className="split-grid">
        <article className="panel">
          <h3>Bản đồ điều phối Chư Sê</h3>
          <div className="map-placeholder">
            <Map size={18} />
            <p>Vùng hiển thị ghim GPS người gửi và tuyến thu gom của TNV.</p>
          </div>
        </article>

        <article className="panel">
          <h3>Pipeline tác vụ</h3>
          <ul className="stack-list compact">
            {workflows.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="panel">
        <h3>Danh sách nhiệm vụ trong ngày</h3>
        {tasks.length === 0 ? (
          <p>Chưa có tác vụ nào được tạo.</p>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <p className="label">Khu vực</p>
                <strong>{task.area}</strong>
                <p className="label">Nhiệm vụ</p>
                <p>{task.type}</p>
                <p className="label">Tình nguyện viên</p>
                <p>{task.volunteer}</p>
                <p className="label">Vai trò phụ trách</p>
                <p>{task.responsibleRole}</p>
                <p className="label">Trạng thái</p>
                <p className="task-status">
                  <Truck size={14} /> {task.status}
                </p>
                <button
                  type="button"
                  className="ghost-btn task-btn"
                  onClick={() => onAdvanceTask(task.id)}
                  disabled={task.status === 'Hoàn thành'}
                >
                  {task.status === 'Hoàn thành'
                    ? 'Đã hoàn thành'
                    : 'Chuyển bước xử lý'}
                </button>
              </div>
            ))}
          </div>
        )}
      </article>
    </section>
  )
}

export default AdminDashboardPage
