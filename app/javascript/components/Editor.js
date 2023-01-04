import React, { useState, useEffect } from "react"
import Header from "./Header"
import EventList from "./EventList"
import { Routes, Route } from "react-router-dom"
import Event from "./Event"
import EventForm from "./EventForm"

const Editor = () => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch("/api/events")
        if (!response.ok) throw Error(response.statusText)
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        setIsError(true)
        console.error(error)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <Header />
      <div className="my-6 mx-auto grid max-w-7xl grid-cols-[minmax(250px,20%)_auto] gap-12 px-4 sm:px-6 lg:px-8">
        {isError && <p>Something went wrong. Check the console.</p>}
        {isLoading ? (
          <p className="grid h-96 content-center justify-center">Loading...</p>
        ) : (
          <>
            <EventList events={events} />

            <Routes>
              <Route path="new" element={<EventForm />} />
              <Route path=":id" element={<Event events={events} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  )
}

export default Editor
