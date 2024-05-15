import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TimesheetService from "../../services/timesheet.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FileViewer from "react-file-viewer";
import UserService from "../../services/user.service";
interface FormValues {
  uploadedBy: string;
  file: File | null;
  fileName: string;
}
type User = {
  id: number;
  userId: string;
};
const FileUploadSchema = Yup.object().shape({
  uploadedBy: Yup.string().required("Uploader name is required"),
  file: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File Must be less than or equal to 10MB",
      (value: any) => value && value.size <= 10485760 // 10MB
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value: any) =>
        value &&
        (value.type === "application/pdf" ||
          value.type === "application/msword" ||
          value.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ),
});

export const TimesheetUpload: React.FC = () => {
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const getUsersLists = () => {
    UserService.getUsersLists()
      .then((data: User) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
        }
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    getUsersLists();
  }, []);
  return (
    <>
      <Formik
        initialValues={{
          uploadedBy: "",
          file: null,
          fileName: "",
        }}
        validationSchema={FileUploadSchema}
        onSubmit={(values: FormValues, { setSubmitting }) => {
          if (values.file) {
            TimesheetService.uploadTimesheet({
              uploadedBy: values.uploadedBy,
              file: values.file,
              fileName: values.file.name,
            })
              .then((data: any) => {
                toast.success(data.message);
                navigate("/timesheetreport");
                setSubmitting(false);
              })
              .catch((error: any) => {
                console.error(error);
                setSubmitting(false);
                toast.success(error.message);
              });
          }
        }}
      >
        {({ setFieldValue, isSubmitting, resetForm }) => (
          <div className="mt-5">
            {" "}
            <Form>
              <div className="row flex align-items-center">
                <div className="col-sm-2">
                 Uploaded By:
                </div>
                <div className="col-sm-2 ">
                  <Field name="uploadedBy" as="select" className="form-control">
                    <option value="">Select uploader</option>
                    {/* Populate with actual uploader names */}
                    {users?.map((user: User) => (
                      <option key={user.id} value={user.userId}>
                        {user.userId}
                      </option>
                    ))}
                  </Field>
                  <div className="row">
                    {" "}
                    <ErrorMessage
                      name="uploadedBy"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <label htmlFor="file">Add Authorized Time Sheet :</label>
                </div>
                <div className="col-sm-3">
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className="form-control"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files
                        ? event.currentTarget.files[0]
                        : null;
                      if (file) {
                        setFieldValue("file", file);

                        const fileType = file.name.split(".").pop();
                        if (fileType === "pdf") {
                          setFilePreview(URL.createObjectURL(file));
                          setFile(null);
                        } else {
                          setFile(file);
                          setFilePreview(null);
                        }
                      } else {
                        setFile(null);
                        setFilePreview(null);
                      }
                    }}
                    accept=".pdf,.docx"
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-sm-1">
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#144991", color: "white" }}
                    disabled={isSubmitting}
                  >
                    Upload
                  </button>
                </div>
                <div className="col-sm-1">
                  <div
                    className="btn"
                    style={{ backgroundColor: "#144991", color: "white" }}
                    onClick={() => {
                      setFieldValue("file", null);
                      resetForm();
                      setFile(null);
                      setFilePreview(null);
                    }}
                  >
                    Refresh
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      {filePreview && (
        <div className="mt-3">
          <h4>File Preview:</h4>
          <embed
            src={filePreview}
            width="100%"
            height="600"
            type="application/pdf"
          />
        </div>
      )}
      {file && (
        <div className="mt-3" style={{height:"300px",width:"100%"}}>
          <h4>File Preview:</h4>
          <FileViewer
            fileType={file.name.split(".").pop()}
            filePath={URL.createObjectURL(file)}
            
          />
        </div>
      )}
    </>
  );
};
