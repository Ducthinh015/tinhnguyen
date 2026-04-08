import { useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Common/Navbar'
import { initialTasks } from './constants/mockData'
import AdminDashboardPage from './pages/AdminDashboardPage'
import BloodPage from './pages/BloodPage'
import DonatePage from './pages/DonatePage'
import HomePage from './pages/HomePage'
import './App.css'

const VOLUNTEER_TEAMS = ['Nhóm TNV 01', 'Nhóm TNV 02', 'Nhóm TNV 03', 'Nhóm TNV 04']

const TASK_PROGRESS = [
  {
    status: 'Yêu cầu mới',
    responsibleRole: 'Admin CLB',
  },
  {
    status: 'Admin đã tiếp nhận',
    responsibleRole: 'Admin CLB',
  },
  {
    status: 'TNV đang xử lý',
    responsibleRole: 'Tình nguyện viên',
  },
  {
    status: 'Hoàn thành',
    responsibleRole: 'Hoàn tất',
  },
]

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [donationRequests, setDonationRequests] = useState([])
  const [bloodRegistrations, setBloodRegistrations] = useState([])

  const dashboardStats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'Hoàn thành').length

    return {
      totalTasks: tasks.length,
      completedTasks: completed,
      donationRequests: donationRequests.length,
      bloodRegistrations: bloodRegistrations.length,
    }
  }, [tasks, donationRequests.length, bloodRegistrations.length])

  function addDonationRequest(payload) {
    const newRequest = {
      id: createId('donation'),
      ...payload,
      status: 'Chờ xử lý',
      role: 'Người dân',
      createdAt: new Date().toLocaleString('vi-VN'),
    }

    const newTask = {
      id: createId('task'),
      area: payload.area,
      type: `Thu gom ${payload.category.toLowerCase()}`,
      volunteer: 'Chưa phân công',
      status: TASK_PROGRESS[0].status,
      responsibleRole: TASK_PROGRESS[0].responsibleRole,
    }

    setDonationRequests((prev) => [newRequest, ...prev])
    setTasks((prev) => [newTask, ...prev])
  }

  function addBloodRegistration(payload) {
    const newRegistration = {
      id: createId('blood'),
      ...payload,
      status: 'Chờ xác nhận',
      role: 'Người dân',
      createdAt: new Date().toLocaleString('vi-VN'),
    }

    const newTask = {
      id: createId('task'),
      area: payload.hospital,
      type: `Điều phối hiến máu nhóm ${payload.bloodType}`,
      volunteer: 'Tổ TNV y tế',
      status: TASK_PROGRESS[0].status,
      responsibleRole: TASK_PROGRESS[0].responsibleRole,
    }

    setBloodRegistrations((prev) => [newRegistration, ...prev])
    setTasks((prev) => [newTask, ...prev])
  }

  function advanceTaskStatus(taskId) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task
        const idx = TASK_PROGRESS.findIndex((step) => step.status === task.status)
        const next = idx === -1 ? 0 : Math.min(idx + 1, TASK_PROGRESS.length - 1)

        const nextStep = TASK_PROGRESS[next]
        const shouldAssignVolunteer =
          nextStep.responsibleRole === 'Tình nguyện viên' &&
          task.volunteer === 'Chưa phân công'

        const nextVolunteer = shouldAssignVolunteer
          ? VOLUNTEER_TEAMS[Math.abs(task.id.length + next) % VOLUNTEER_TEAMS.length]
          : task.volunteer

        return {
          ...task,
          status: nextStep.status,
          responsibleRole: nextStep.responsibleRole,
          volunteer: nextVolunteer,
        }
      }),
    )
  }

  return (
    <div className="app-shell">
      <div className="orb orb-1" aria-hidden="true"></div>
      <div className="orb orb-2" aria-hidden="true"></div>

      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/blood"
            element={
              <BloodPage
                bloodRegistrations={bloodRegistrations}
                onRegisterBlood={addBloodRegistration}
              />
            }
          />
          <Route
            path="/donate"
            element={
              <DonatePage
                donationRequests={donationRequests}
                onCreateDonationRequest={addDonationRequest}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminDashboardPage
                tasks={tasks}
                stats={dashboardStats}
                onAdvanceTask={advanceTaskStatus}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
