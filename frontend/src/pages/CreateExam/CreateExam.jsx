import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import Navbar from "../../components/Navbar/Navbar";

import "./CreateExam.css";

const CreateExam = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      duration: "",
      maxNumberPerQuestion: 1,
      negativeMarkingEnabled: false,
      negativeMarks: 0,
      expiryDate: ""
    });

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await api.post(
            "/exam/create",
            formData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        alert(
          `Exam Created Successfully\nCode: ${response.data.exam.code}`
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed To Create Exam"
        );
      }
    };

  return (
    <>
      <Navbar />

      <div className="create-exam">
        <form
          onSubmit={handleSubmit}
        >
          <h2>Create Exam</h2>

<label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Exam Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

<label>Description</label>
          <textarea
            name="description"
            placeholder="Exam Description"
            value={
              formData.description
            }
            onChange={handleChange}
            required
          />
 <label>Duration</label>
          <input
            type="number"
            name="duration"
            placeholder="Duration (Minutes)"
            value={
              formData.duration
            }
            onChange={handleChange}
            required
          />

            <label>Mark Per Question</label>
          <input
            type="number"
            name="maxNumberPerQuestion"
            placeholder="Marks Per Question"
            value={
              formData.maxNumberPerQuestion
            }
            onChange={handleChange}
            required
          />

          <label>
            Expiry Date & Time
          </label>

          <input
            type="datetime-local"
            name="expiryDate"
            value={
              formData.expiryDate
            }
            onChange={handleChange}
            required
          />

          <label className="checkbox">
            <input
              type="checkbox"
              name="negativeMarkingEnabled"
              checked={
                formData.negativeMarkingEnabled
              }
              onChange={
                handleChange
              }
            />

            Enable Negative
            Marking
          </label>

          {formData.negativeMarkingEnabled && (
            <input
              type="number"
              step="0.25"
              name="negativeMarks"
              placeholder="Negative Marks"
              value={
                formData.negativeMarks
              }
              onChange={
                handleChange
              }
            />
          )}

          <button type="submit">
            Create Exam
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateExam;