import Pikaday from "pikaday"
import PropTypes from "prop-types"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { formatDate, isEmptyObject, validateEvent } from "../helpers/helpers"
import EventNotFound from "./EventNotFound"

const EventForm = ({ events, onSave }) => {
  const { id } = useParams()

  const initialEventState = useCallback(() => {
    const defaults = {
      kind: "",
      date: "",
      title: "",
      speaker: "",
      host: "",
      published: false,
    }

    const currEvent = id ? events.find((e) => e.id === Number(id)) : {}

    return { ...defaults, ...currEvent }
  }, [events, id])

  const [event, setEvent] = useState(initialEventState)

  useEffect(() => {
    setEvent(initialEventState)
  }, [events, initialEventState])

  const updateEvent = (key, value) => {
    setEvent((prevEvent) => ({ ...prevEvent, [key]: value }))
  }

  const [formErrors, setFormErrors] = useState({})

  const dateInput = useRef(null)

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      toString: (date) => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date)
        dateInput.current.value = formattedDate
        updateEvent("date", formattedDate)
      },
    })

    return () => p.destroy()
  }, [])

  const handleInputChange = (e) => {
    const { target } = e
    const { name } = target
    const value = target.type === "checkbox" ? target.checked : target.value

    updateEvent(name, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateEvent(event)

    if (!isEmptyObject(errors)) {
      setFormErrors(errors)
    } else {
      onSave(event)
    }
  }

  const cancelURL = event.id ? `/events/${event.id}` : "/events"
  const title = event.id ? `${event.date} - ${event.kind}` : "New Event"

  if (id && !event.id) return <EventNotFound />

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null
    }

    return (
      <div className="alert alert-error mb-9 w-full max-w-lg shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">
              The following errors prohibited the event from being saved:
            </h3>
            <ul className="ml-3 list-inside list-disc">
              {Object.values(formErrors).map((formError) => (
                <li key={formError}>{formError}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section>
      {renderErrors()}

      <h2 className="text-xl font-medium">{title}</h2>
      <form className="mt-4 w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="kind" className="label">
            <strong className="label-text">Kind:</strong>
          </label>
          <input
            type="text"
            id="kind"
            name="kind"
            className="input-bordered input"
            onChange={handleInputChange}
            value={event.kind}
          />
        </div>
        <div className="form-control">
          <label htmlFor="date" className="label">
            <strong className="label-text">Date:</strong>
          </label>
          <input
            type="text"
            id="date"
            name="date"
            className="input-bordered input"
            ref={dateInput}
            autoComplete="off"
            onChange={handleInputChange}
            value={event.date}
          />
        </div>
        <div className="form-control">
          <label htmlFor="title" className="label">
            <strong className="label-text">Title:</strong>
          </label>
          <textarea
            cols="30"
            rows="5"
            id="title"
            name="title"
            className="textarea-bordered textarea"
            onChange={handleInputChange}
            value={event.title}
          />
        </div>
        <div className="form-control">
          <label htmlFor="speaker" className="label">
            <strong className="label-text">Speakers:</strong>
          </label>
          <input
            type="text"
            id="speaker"
            name="speaker"
            className="input-bordered input"
            onChange={handleInputChange}
            value={event.speaker}
          />
        </div>
        <div className="form-control">
          <label htmlFor="host" className="label">
            <strong className="label-text">Hosts:</strong>
          </label>
          <input
            type="text"
            id="host"
            name="host"
            className="input-bordered input"
            onChange={handleInputChange}
            value={event.host}
          />
        </div>
        <div className="form-control">
          <label htmlFor="published" className="label cursor-pointer">
            <strong className="label-text">Publish:</strong>
            <input
              type="checkbox"
              id="published"
              name="published"
              className="checkbox"
              onChange={handleInputChange}
              checked={event.published}
            />
          </label>
        </div>
        <button type="submit" className="btn-primary btn normal-case">
          Save
        </button>
        <Link to={cancelURL} className="btn-outline btn ml-3 normal-case">
          Cancel
        </Link>
      </form>
    </section>
  )
}

export default EventForm

EventForm.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kind: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
}

EventForm.defaultProps = {
  events: [],
}
