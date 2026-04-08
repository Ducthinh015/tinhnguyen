import { BellRing, Droplets } from 'lucide-react'
import { useState } from 'react'
import { bloodStatuses } from '../constants/mockData'

function urgencyClass(value) {
  if (value === 'Cao') return 'status-high'
  if (value === 'Trung bình') return 'status-medium'
  return 'status-low'
}

const defaultForm = {
  fullName: '',
  phone: '',
  bloodType: 'O',
  hospital: bloodStatuses[0].hospital,
}

function BloodPage({ bloodRegistrations, onRegisterBlood }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(defaultForm)
  const [feedback, setFeedback] = useState('')

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setFeedback('Vui lòng điền đầy đủ họ tên và số điện thoại.')
      return
    }

    const compactPhone = formData.phone.replace(/\s+/g, '')
    if (!/^\d{9,11}$/.test(compactPhone)) {
      setFeedback('Số điện thoại không hợp lệ. Cần 9-11 chữ số.')
      return
    }

    onRegisterBlood({
      fullName: formData.fullName.trim(),
      phone: compactPhone,
      bloodType: formData.bloodType,
      hospital: formData.hospital,
    })

    setShowForm(false)
    setFormData(defaultForm)
    setFeedback('Đăng ký hiến máu đã được ghi nhận và gửi cho Admin CLB điều phối.')
  }

  return (
    <section className="page">
      <div className="page-header">
        <h2>
          <Droplets size={22} /> Module Máu Nóng
        </h2>
        <p>Cập nhật realtime trạng thái thiếu máu tại các bệnh viện tỉnh/huyện.</p>
      </div>

      <div className="table-card">
        <div className="table-head">
          <h3>Trạng thái kho máu</h3>
          <button
            type="button"
            className="solid-btn"
            onClick={() => setShowForm((prev) => !prev)}
          >
            <BellRing size={16} /> Đăng ký hiến máu khẩn
          </button>
        </div>

        {showForm && (
          <form className="simple-form blood-form" onSubmit={handleSubmit}>
            <label>
              Họ tên
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                placeholder="Trần Thị B"
              />
            </label>
            <label>
              Số điện thoại
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="09xx xxx xxx"
              />
            </label>
            <label>
              Nhóm máu
              <select
                value={formData.bloodType}
                onChange={(e) => updateField('bloodType', e.target.value)}
              >
                <option>O</option>
                <option>A</option>
                <option>B</option>
                <option>AB</option>
              </select>
            </label>
            <label>
              Bệnh viện ưu tiên
              <select
                value={formData.hospital}
                onChange={(e) => updateField('hospital', e.target.value)}
              >
                {bloodStatuses.map((item) => (
                  <option key={`${item.hospital}-${item.bloodType}`} value={item.hospital}>
                    {item.hospital}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-actions">
              <button type="button" className="ghost-btn" onClick={() => setShowForm(false)}>
                Đóng
              </button>
              <button type="submit" className="solid-btn">
                Xác nhận đăng ký
              </button>
            </div>
          </form>
        )}

        <div className="blood-grid">
          {bloodStatuses.map((row) => (
            <article className="blood-row" key={`${row.hospital}-${row.bloodType}`}>
              <div>
                <p className="label">Nhóm máu</p>
                <strong>{row.bloodType}</strong>
              </div>
              <div>
                <p className="label">Mức ưu tiên</p>
                <span className={`status-pill ${urgencyClass(row.urgency)}`}>
                  {row.urgency}
                </span>
              </div>
              <div>
                <p className="label">Bệnh viện</p>
                <strong>{row.hospital}</strong>
              </div>
              <div>
                <p className="label">Cập nhật</p>
                <strong>{row.updatedAt}</strong>
              </div>
            </article>
          ))}
        </div>

        {feedback && <p className="feedback-text">{feedback}</p>}
      </div>

      <div className="panel">
        <h3>Danh sách đăng ký hiến máu mới</h3>
        {bloodRegistrations.length === 0 ? (
          <p>Chưa có đăng ký hiến máu mới.</p>
        ) : (
          <div className="request-grid">
            {bloodRegistrations.slice(0, 4).map((request) => (
              <div className="request-card" key={request.id}>
                <p className="label">Người đăng ký</p>
                <strong>{request.fullName}</strong>
                <p className="label">Nhóm máu</p>
                <p>{request.bloodType}</p>
                <p className="label">Bệnh viện</p>
                <p>{request.hospital}</p>
                <p className="label">Trạng thái</p>
                <p>{request.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BloodPage
