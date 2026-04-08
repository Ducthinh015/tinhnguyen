import { HandHeart, LayoutDashboard, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/blood', label: 'Máu nóng' },
  { to: '/donate', label: 'Quyên góp' },
  { to: '/admin', label: 'Điều phối' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="topbar">
      <Link className="brand-wrap" to="/" onClick={closeMenu}>
        <div className="brand-icon" aria-hidden="true">
          <HandHeart size={18} />
        </div>
        <div>
          <p className="brand-subtitle">Chư Sê Volunteer Hub</p>
          <h1 className="brand-title">Điều phối tình nguyện số</h1>
        </div>
      </Link>

      <button
        className="menu-btn"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Mở menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={`main-nav ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}
        <button
          type="button"
          className="cta-btn"
          onClick={() => {
            closeMenu()
            navigate('/donate?quick=1')
          }}
        >
          <LayoutDashboard size={16} />
          Tạo yêu cầu nhanh
        </button>
      </nav>
    </header>
  )
}

export default Navbar
