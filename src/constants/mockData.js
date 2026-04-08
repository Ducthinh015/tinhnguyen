export const bloodStatuses = [
  {
    bloodType: 'O',
    urgency: 'Cao',
    hospital: 'Bệnh viện Đa khoa Gia Lai',
    updatedAt: '08/04/2026 09:45',
  },
  {
    bloodType: 'A',
    urgency: 'Trung bình',
    hospital: 'Trung tâm Y tế huyện Chư Sê',
    updatedAt: '08/04/2026 08:20',
  },
  {
    bloodType: 'B',
    urgency: 'Thấp',
    hospital: 'Bệnh viện Quân Y 211',
    updatedAt: '08/04/2026 07:55',
  },
  {
    bloodType: 'AB',
    urgency: 'Cao',
    hospital: 'Bệnh viện Nhi Gia Lai',
    updatedAt: '08/04/2026 10:05',
  },
]

export const donationCategories = [
  {
    title: 'Quần áo',
    details: 'Mùa nóng, mùa lạnh, size trẻ em/người lớn',
  },
  {
    title: 'Sách vở',
    details: 'Sách giáo khoa, truyện thiếu nhi, vở cũ còn dùng tốt',
  },
  {
    title: 'Phế liệu tái chế',
    details: 'Giấy vụn, nhựa sạch, đồ dùng có thể tái chế',
  },
]

export const workflows = [
  {
    title: 'Tiếp nhận yêu cầu',
    description: 'Người dân điền form và gửi định vị GPS để hệ thống ghi nhận.',
  },
  {
    title: 'Điều phối',
    description: 'Admin CLB theo dõi bản đồ Chư Sê, gom các điểm và giao tác vụ cho TNV.',
  },
  {
    title: 'Thực thi',
    description: 'TNV di chuyển thu gom hoặc hỗ trợ hiến máu, cập nhật trạng thái hoàn thành.',
  },
]

export const stakeholders = [
  {
    role: 'Người dân',
    responsibility: 'Tạo yêu cầu quyên góp, đăng ký hiến máu, cung cấp địa chỉ và định vị.',
  },
  {
    role: 'Admin CLB',
    responsibility: 'Xác nhận yêu cầu, phân công tình nguyện viên, theo dõi tiến độ chiến dịch.',
  },
  {
    role: 'Tình nguyện viên',
    responsibility: 'Thực hiện tác vụ ngoài thực địa và cập nhật trạng thái hoàn thành.',
  },
]

export const campaignEvents = [
  {
    title: 'Ngày Chủ nhật xanh',
    location: 'Thị trấn Chư Sê',
    volunteers: 32,
    startDate: '13/04/2026',
  },
  {
    title: 'Lớp học sẻ chia',
    location: 'Xã Ia Blang',
    volunteers: 19,
    startDate: '20/04/2026',
  },
]

export const initialTasks = [
  {
    id: 'task-1',
    area: 'Ia Tiêm',
    type: 'Thu gom sách vở',
    volunteer: 'Nhóm TNV 01',
    status: 'TNV đang xử lý',
    responsibleRole: 'Tình nguyện viên',
  },
  {
    id: 'task-2',
    area: 'Thị trấn Chư Sê',
    type: 'Điểm hiến máu lưu động',
    volunteer: 'Nhóm TNV 03',
    status: 'Admin đã tiếp nhận',
    responsibleRole: 'Admin CLB',
  },
  {
    id: 'task-3',
    area: 'Ia Hlốp',
    type: 'Thu gom quần áo ấm',
    volunteer: 'Nhóm TNV 04',
    status: 'Hoàn thành',
    responsibleRole: 'Hoàn tất',
  },
]
