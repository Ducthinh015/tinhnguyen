import { LocateFixed, PackageCheck } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { donationCategories } from '../constants/mockData'

const defaultForm = {
  fullName: '',
  phone: '',
  method: 'Tận nơi',
  category: donationCategories[0].title,
  area: '',
  note: '',
  coordinates: '',
}

function DonatePage({ donationRequests, onCreateDonationRequest }) {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState(defaultForm)
  const [feedback, setFeedback] = useState('')
  const quickMode = searchParams.get('quick') === '1'

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleLocate() {
    if (!navigator.geolocation) {
      setFeedback('Trình duyệt không hỗ trợ định vị. Vui lòng nhập khu vực thủ công.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6)
        const lng = position.coords.longitude.toFixed(6)
        updateField('coordinates', `${lat}, ${lng}`)
        if (!formData.area.trim()) {
          updateField('area', 'Vị trí từ định vị')
        }
        setFeedback('Lấy định vị thành công. Bạn có thể gửi yêu cầu ngay.')
      },
      () => {
        setFeedback('Không thể lấy vị trí. Hãy kiểm tra quyền truy cập vị trí trên trình duyệt.')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    )
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.area.trim()) {
      setFeedback('Vui lòng nhập đầy đủ họ tên, số điện thoại và khu vực.')
      return
    }

    const compactPhone = formData.phone.replace(/\s+/g, '')
    if (!/^\d{9,11}$/.test(compactPhone)) {
      setFeedback('Số điện thoại không hợp lệ. Vui lòng nhập 9-11 chữ số.')
      return
    }

    onCreateDonationRequest({
      fullName: formData.fullName.trim(),
      phone: compactPhone,
      method: formData.method,
      category: formData.category,
      area: formData.area.trim(),
      note: formData.note.trim(),
      coordinates: formData.coordinates || 'Chưa cập nhật',
    })

    setFormData(defaultForm)
    setFeedback('Đã tạo yêu cầu thu gom thành công và đẩy sang Bảng điều phối.')
  }

  return (
    <section className="page">
      <div className="page-header">
        <h2>
          <PackageCheck size={22} /> Module Quyên Góp
        </h2>
        <p>Phân loại hiện vật và ghép nối GPS giữa người cho và người nhận.</p>
      </div>

      <div className="split-grid">
        <article className="panel">
          <h3>Danh mục hiện vật</h3>
          <div className="category-grid">
            {donationCategories.map((item) => (
              <div className="category-card" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.details}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h3>Tạo yêu cầu thu gom</h3>
          <form className="simple-form" onSubmit={handleSubmit}>
            <label>
              Họ tên người gửi
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
              />
            </label>
            <label>
              Số điện thoại
              <input
                type="tel"
                placeholder="09xx xxx xxx"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </label>
            <label>
              Hình thức giao nhận
              <select
                value={formData.method}
                onChange={(e) => updateField('method', e.target.value)}
              >
                <option value="Tận nơi">Tận nơi</option>
                <option value="Tại CLB">Tại CLB</option>
              </select>
            </label>
            <label>
              Loại hiện vật
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
              >
                {donationCategories.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Khu vực thu gom
              <input
                type="text"
                placeholder="Thị trấn Chư Sê"
                value={formData.area}
                onChange={(e) => updateField('area', e.target.value)}
              />
            </label>
            <label>
              Ghi chú
              <input
                type="text"
                placeholder="Ví dụ: có đồ cồng kềnh, liên hệ sau 17h"
                value={formData.note}
                onChange={(e) => updateField('note', e.target.value)}
              />
            </label>
            <label>
              Tọa độ GPS
              <input
                type="text"
                placeholder="15.995000, 108.250000"
                value={formData.coordinates}
                onChange={(e) => updateField('coordinates', e.target.value)}
              />
            </label>

            <div className="form-actions">
              <button type="button" className="ghost-btn" onClick={handleLocate}>
                <LocateFixed size={16} /> Lấy định vị
              </button>
              <button type="submit" className="solid-btn">
                <LocateFixed size={16} /> Gửi yêu cầu thu gom
              </button>
            </div>

            {(quickMode || feedback) && (
              <p className="feedback-text">
                {feedback || 'Chế độ tạo nhanh đã sẵn sàng. Vui lòng điền thông tin và gửi yêu cầu.'}
              </p>
            )}
          </form>
        </article>
      </div>

      <article className="panel">
        <h3>Yêu cầu mới nhất</h3>
        {donationRequests.length === 0 ? (
          <p>Chưa có yêu cầu thu gom nào được tạo.</p>
        ) : (
          <div className="request-grid">
            {donationRequests.slice(0, 4).map((request) => (
              <div className="request-card" key={request.id}>
                <p className="label">Người gửi</p>
                <strong>{request.fullName}</strong>
                <p className="label">Loại hiện vật</p>
                <p>{request.category}</p>
                <p className="label">Khu vực</p>
                <p>{request.area}</p>
                <p className="label">Trạng thái</p>
                <p>{request.status}</p>
              </div>
            ))}
          </div>
        )}
      </article>
    </section>
  )
}

export default DonatePage
