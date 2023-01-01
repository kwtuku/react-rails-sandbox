import React from 'react';

const EventForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted');
  };

  return (
    <section>
      <h2 className='text-xl font-medium'>New Event</h2>
      <form className="mt-4 w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="event_type" className="label">
            <strong className="label-text">Type:</strong>
          </label>
          <input type="text" id="event_type" name="event_type" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label htmlFor="event_date" className="label">
            <strong className="label-text">Date:</strong>
          </label>
          <input type="text" id="event_date" name="event_date" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label htmlFor="title" className="label">
            <strong className="label-text">Title:</strong>
          </label>
          <textarea cols="30" rows="5" id="title" name="title" className="textarea textarea-bordered" />
        </div>
        <div className="form-control">
          <label htmlFor="speaker" className="label">
            <strong className="label-text">Speakers:</strong>
          </label>
          <input type="text" id="speaker" name="speaker" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label htmlFor="host" className="label">
            <strong className="label-text">Hosts:</strong>
          </label>
          <input type="text" id="host" name="host" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label htmlFor="published" className="label cursor-pointer">
            <strong className="label-text">Publish:</strong>
            <input type="checkbox" id="published" name="published" className="checkbox" />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </section>
  );
};

export default EventForm;
