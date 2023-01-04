import React, { useState } from "react"
import { isEmptyObject, validateEvent } from "../helpers/helpers"

const EventForm = () => {
  const [event, setEvent] = useState({
    event_type: "",
    event_date: "",
    title: "",
    speaker: "",
    host: "",
    published: false,
  })

  const [formErrors, setFormErrors] = useState({})

  const handleInputChange = (e) => {
    const { target } = e
    const { name } = target
    const value = target.type === "checkbox" ? target.checked : target.value

    setEvent({ ...event, [name]: value })
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateEvent(event)

    if (!isEmptyObject(errors)) {
      setFormErrors(errors)
    } else {
      console.log(event)
    }
  }

  return (
    <section>
      {renderErrors()}

      <h2 className="text-xl font-medium">New Event</h2>
      <form className="mt-4 w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="event_type" className="label">
            <strong className="label-text">Type:</strong>
          </label>
          <input
            type="text"
            id="event_type"
            name="event_type"
            className="input-bordered input"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="event_date" className="label">
            <strong className="label-text">Date:</strong>
          </label>
          <input
            type="text"
            id="event_date"
            name="event_date"
            className="input-bordered input"
            onChange={handleInputChange}
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
            />
          </label>
        </div>
        <button type="submit" className="btn-primary btn">
          Save
        </button>
      </form>
    </section>
  )
}

export default EventForm
