import PropTypes from "prop-types"
import React from "react"
import { Link, NavLink } from "react-router-dom"

const EventList = ({ events }) => {
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

    eventArray.sort((a, b) => new Date(b.event_date) - new Date(a.event_date))

    return eventArray.map((event) => (
      <li key={event.id}>
        <NavLink
          to={`/events/${event.id}`}
          className={({ isActive }) =>
            isActive ? activeClassName : inactiveClassName
          }
        >
          {event.event_date}
          {" - "}
          {event.event_type}
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
      <ul>{renderEvents(events)}</ul>
    </section>
  )
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      event_type: PropTypes.string,
      event_date: PropTypes.string,
      title: PropTypes.string,
      speaker: PropTypes.string,
      host: PropTypes.string,
      published: PropTypes.bool,
    })
  ).isRequired,
}

export default EventList
