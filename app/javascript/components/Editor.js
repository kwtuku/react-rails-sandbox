import React, { useState, useEffect } from "react"
import Header from "./Header"
import EventList from "./EventList"
import { Routes, Route, useNavigate } from "react-router-dom"
import Event from "./Event"
import EventForm from "./EventForm"
import { success } from "../helpers/notifications"
import { handleAjaxError } from "../helpers/helpers"

const Editor = () => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch("/api/events")
        if (!response.ok) throw Error(response.statusText)
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        handleAjaxError(error)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const addEvent = async (newEvent) => {
    try {
      const response = await window.fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) throw Error(response.statusText)

      const savedEvent = await response.json()
      const newEvents = [...events, savedEvent]
      setEvents(newEvents)
      success("Event Added!")
      navigate(`/events/${savedEvent.id}`)
    } catch (error) {
      handleAjaxError(error)
    }
  }

  const deleteEvent = async (eventId) => {
    const sure = window.confirm("Are you sure?")

    if (sure) {
      try {
        const response = await window.fetch(`/api/events/${eventId}`, {
          method: "DELETE",
        })

        if (!response.ok) throw Error(response.statusText)

        success("Event Deleted!")
        navigate("/events")
        setEvents(events.filter((event) => event.id !== eventId))
      } catch (error) {
        handleAjaxError(error)
      }
    }
  }

  return (
    <>
      <Header />
      <div className="my-6 mx-auto grid max-w-7xl grid-cols-[minmax(250px,20%)_auto] gap-12 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <p className="grid h-96 content-center justify-center">Loading...</p>
        ) : (
          <>
            <EventList events={events} />

            <Routes>
              <Route path="new" element={<EventForm onSave={addEvent} />} />
              <Route
                path=":id"
                element={<Event events={events} onDelete={deleteEvent} />}
              />
            </Routes>
          </>
        )}
      </div>
    </>
  )
}

export default Editor
