import PropTypes from "prop-types"
import React from "react"
import { Link, useParams } from "react-router-dom"
import EventNotFound from "./EventNotFound"

const Event = ({ events, onDelete }) => {
  const { id } = useParams()
  const event = events.find((e) => e.id === Number(id))

  if (!event) return <EventNotFound />

  return (
    <div className="leading-9">
      <div className="flex items-center px-1.5 pt-2 pb-2.5">
        <h2 className="text-xl font-medium">
          {event.event_date}
          {" - "}
          {event.event_type}
        </h2>
        <Link
          to={`/events/${event.id}/edit`}
          className="btn-primary btn ml-auto normal-case"
        >
          Edit
        </Link>
        <button
          className="btn-outline btn-error btn ml-3 normal-case"
          type="button"
          onClick={() => onDelete(event.id)}
        >
          Delete
        </button>
      </div>
      <ul>
        <li>
          <strong>Type:</strong> {event.event_type}
        </li>
        <li>
          <strong>Date:</strong> {event.event_date}
        </li>
        <li>
          <strong>Title:</strong> {event.title}
        </li>
        <li>
          <strong>Speaker:</strong> {event.speaker}
        </li>
        <li>
          <strong>Host:</strong> {event.host}
        </li>
        <li>
          <strong>Published:</strong> {event.published ? "yes" : "no"}
        </li>
      </ul>
    </div>
  )
}

Event.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      event_type: PropTypes.string.isRequired,
      event_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Event
