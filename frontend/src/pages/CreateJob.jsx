import React, { useState } from "react";
import { TextInput, Button, Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import create from "../components/utils/axios_requests/job/create";

export default function CreateJob() {
  const [formData, setFormData] = useState({});
  const [createJobError, setCreateJobError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    create(dispatch, navigate, setCreateJobError, formData, accessToken);
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create Job</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4 flex-col justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            onChange={handleChange}
          />
          <div className="flex flex-row gap-2 justify-between">
            <TextInput className="flex-1"
              type="text"
              placeholder="Least salary (optional)"
              id="salaryUp"
              onChange={handleChange}
            />
            <TextInput className="flex-1"
              type="text"
              placeholder="Highest salary (optional)"
              id="salaryDown"
              onChange={handleChange}
            />
            <TextInput className="flex-1"
              type="text"
              placeholder="Required experience (optional)"
              id="exp"
              onChange={handleChange}
            />
          </div>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          onChange={(value) => {
            setFormData({ ...formData, description: value });
          }}
        />
        {createJobError && <Alert color="failure">{createJobError}</Alert>}
        <Button type="submit" gradientDuoTone="purpleToPink">
          Create
        </Button>
      </form>
    </div>
  );
}
