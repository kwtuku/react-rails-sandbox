import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom"

const EventList = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const searchInput = useRef(null)

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current.value)
  }

  const matchSearchTerm = (obj) => {
    // eslint-disable-next-line no-unused-vars
    const { id, published, created_at, updated_at, ...rest } = obj
    return Object.values(rest).some(
      (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    )
  }

  const renderEvents = (eventArray) => {
    const baseClassName = "block border-b pt-2 px-1.5 pb-2.5"
    const activeClassName = [
      baseClassName,
      "bg-primary text-primary-content hover:bg-primary-focus",
    ].join(" ")
    const inactiveClassName = [
      baseClassName,
      "hover:bg-primary hover:text-primary-content",
    ].join(" ")

    return eventArray
      .filter((el) => matchSearchTerm(el))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((event) => (
        <li key={event.id}>
          <NavLink
            to={`/events/${event.id}`}
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            {event.date}
            {" - "}
            {event.kind}
          </NavLink>
        </li>
      ))
  }

  return (
    <section className="bg-base-200 p-4 text-base-content">
      <div className="flex px-1.5 pt-2 pb-2.5">
        <h2 className="text-xl font-medium">Events</h2>
        <Link
          to="/events/new"
          className="link-hover link-primary link ml-auto self-end"
        >
          New Event
        </Link>
      </div>

      <input
        className="input-bordered input my-3.5 w-full"
        placeholder="Search"
        type="text"
        ref={searchInput}
        onKeyUp={updateSearchTerm}
      />

      <ul>{renderEvents(events)}</ul>
    </section>
  )
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      kind: PropTypes.string,
      date: PropTypes.string,
      title: PropTypes.string,
      speaker: PropTypes.string,
      host: PropTypes.string,
      published: PropTypes.bool,
    })
  ).isRequired,
}

export default EventList
