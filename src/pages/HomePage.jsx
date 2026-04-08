import { ArrowRight, Droplets, MapPinned, Recycle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { campaignEvents, stakeholders, workflows } from '../constants/mockData'

const modules = [
  {
    title: 'Module Máu Nóng',
    icon: <Droplets size={20} />,
    description:
      'Theo dõi nhu cầu máu theo bệnh viện và kích hoạt cảnh báo ưu tiên ngay khi thiếu máu.',
    to: '/blood',
  },
  {
    title: 'Module Quyên Góp',
    icon: <Recycle size={20} />,
    description:
      'Phân loại hiện vật chi tiết và tạo tuyến thu gom dựa trên vị trí người cho.',
    to: '/donate',
  },
  {
    title: 'Module Chiến Dịch',
    icon: <MapPinned size={20} />,
    description:
      'Lên lịch sự kiện cộng đồng và quản lý số lượng tình nguyện viên tham gia.',
    to: '/admin',
  },
]

function HomePage() {
  return (
    <section className="page page-home">
      <div className="hero-box">
        <p className="eyebrow">Nền tảng cộng đồng Chư Sê</p>
        <h2>Kết nối hiến máu khẩn cấp và quyên góp hiện vật thông minh</h2>
        <p>
          Ứng dụng công nghệ để hiện thực hóa tinh thần lá lành đùm lá rách,
          giúp Người dân, Admin CLB và Tình nguyện viên phối hợp nhanh chóng.
        </p>
        <div className="hero-actions">
          <Link className="solid-link" to="/donate">
            Gửi quyên góp
            <ArrowRight size={16} />
          </Link>
          <Link className="ghost-link" to="/blood">
            Đăng ký hiến máu
          </Link>
        </div>
      </div>

      <div className="card-grid">
        {modules.map((module) => (
          <article key={module.title} className="info-card">
            <div className="icon-badge">{module.icon}</div>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <Link to={module.to} className="text-link">
              Xem chi tiết
              <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>

      <div className="split-grid">
        <article className="panel">
          <h3>Luồng vận hành</h3>
          <ul className="stack-list">
            {workflows.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Phân vai theo hệ thống</h3>
          <ul className="stack-list">
            {stakeholders.map((item) => (
              <li key={item.role}>
                <strong>{item.role}</strong>
                <p>{item.responsibility}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Chiến dịch sắp diễn ra</h3>
          <ul className="stack-list">
            {campaignEvents.map((event) => (
              <li key={event.title}>
                <strong>{event.title}</strong>
                <p>
                  {event.location} · {event.startDate} · {event.volunteers} TNV
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export default HomePage
