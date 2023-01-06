import React from "react"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"

const Event = ({ events, onDelete }) => {
  const { id } = useParams()
  const event = events.find((e) => e.id === Number(id))

  return (
    <div className="leading-9">
      <div className="flex items-center px-1.5 pt-2 pb-2.5">
        <h2 className="text-xl font-medium">
          {event.event_date}
          {" - "}
          {event.event_type}
        </h2>
        <button
          className="btn-outline btn-error btn ml-auto normal-case"
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
