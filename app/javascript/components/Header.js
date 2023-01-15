import React from "react"
import { Link } from "react-router-dom"

const Header = () => (
  <header className="navbar bg-primary px-4 text-primary-content sm:px-6 lg:px-8">
    <Link to="/events">
      <h1 className="text-3xl font-medium">Event Manager</h1>
    </Link>
  </header>
)

export default Header
