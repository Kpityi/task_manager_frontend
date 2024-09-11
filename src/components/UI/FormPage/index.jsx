import classNames from "classnames";
import Button from "../Button";
import "./index.scss";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../common/environment";

const FormPage = ({ method, onSubmit, visibility, isShowFormPage, id }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Please fill this field!"),
    description: Yup.string().required("Please fill this field!"),
    priority: Yup.string().default("low"),
    status: Yup.string().default("to do"),
  });
  const [initialValues, setInitialValues] = useState({
    title: "",
    priority: "low",
    description: "",
    status: "to do",
  });

  useEffect(() => {
    // Fetch task to update
    if (method === "edit" && id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`${API_URL}/tasks/${id}`);
          setInitialValues(response.data[0]);
        } catch (error) {
          console.error("Fetch task error:", error);
        }
      };
      fetchTask();
    } else if (method === "create") {
      setInitialValues({
        title: "",
        priority: "low",
        description: "",
        status: "to do",
      });
    }
  }, [id, method]);

  return (
    <div className={classNames("form-page", visibility && "-show")}>
      <div className="form-page__container">
        <div className="form-page__title">
          {method === "create" ? <h2>Add new Task</h2> : <h2>Edit Task</h2>}
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
          }) => (
            <div className="form-page__form-container">
              <Form className="form-page__form" onSubmit={handleSubmit}>
                {/* Task title */}
                <label className="form-page__form-element" htmlFor="title">
                  Title:
                </label>
                <Field
                  className="form-page__form-element"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  name="title"
                  render={(msg) => (
                    <div className="form-page__error-message">{msg}</div>
                  )}
                />

                {/* Task description */}
                <label
                  className="form-page__form-element"
                  htmlFor="description">
                  Description:
                </label>
                <Field
                  className="form-page__form-element"
                  id="description"
                  name="description"
                  component="textarea"
                  placeholder="Write a description"
                  rows="6"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  name="description"
                  render={(msg) => (
                    <div className="form-page__error-message">{msg}</div>
                  )}
                />

                <div className="form-page__select-container">
                  {/* Task priority */}
                  <div className="form-page__priority-container">
                    <label
                      className="form-page__form-element"
                      htmlFor="priority">
                      Priority:
                    </label>
                    <Field
                      as="select"
                      className="form-page__form-element"
                      name="priority">
                      <option value="low">low</option>
                      <option value="mid">mid</option>
                      <option value="high">high</option>
                    </Field>
                  </div>

                  {/* Task status */}
                  <div className="form-page__status-container">
                    <label className="form-page__form-element" htmlFor="status">
                      Status:
                    </label>
                    <Field
                      as="select"
                      className="form-page__form-element"
                      name="status">
                      <option value="to do">to do</option>
                      <option value="in progress">in progress</option>
                      <option value="review">review</option>
                      <option value="done">done</option>
                    </Field>
                  </div>
                </div>

                {/* Buttons */}
                <div className="form-page__buttons">
                  {/* Cancel */}
                  <Button
                    label="Cancel"
                    type="button"
                    onClick={() => {
                      isShowFormPage(false);
                    }}
                    icon="none"
                    className="form-page__button"
                  />

                  {/* Create/Save */}
                  <Button
                    label={method === "create" ? "Create" : "Save"}
                    type="submit"
                    icon="none"
                    className="form-page__button"
                    disabled={
                      method === "create" &&
                      (isSubmitting ||
                        !Object.keys(touched)?.length ||
                        Object.keys(errors)?.length)
                    }
                  />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormPage;
