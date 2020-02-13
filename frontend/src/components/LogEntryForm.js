import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./Api";
import axios from "axios";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState({
    file: null
  });

  const onDrop = e => {
    setImage({ file: e.target.files[0] });
    //console.log({ file: e.target.files[0] });
  };

  const onSubmit = async data => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image.file);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        formData
      );
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      data.image = response.data.url;
      const created = await createLogEntry(data);
      onClose();
    } catch (error) {
      //console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="name">Name</label>
      <input name="name" required ref={register} />
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />
      <label htmlFor="rating">Rating</label>
      <input name="rating" type="number" required ref={register} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} ref={register}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>
      <label htmlFor="image">Image required</label>
      <input type="file" onChange={onDrop} ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />
      <button disabled={loading}>
        {loading ? "Loading..." : "Create Entry"}
      </button>
    </form>
  );
};

export default LogEntryForm;
