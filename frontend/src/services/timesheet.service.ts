import api from "./api";

interface TimesheetData {
  uploadedBy: string;
  file: File;
  fileName: string;
}

const uploadTimesheet = (data: TimesheetData) => {
  const formData = new FormData();
  formData.append("uploadedBy", data.uploadedBy);
  formData.append("file", data.file);
  return api
    .post("/timesheet", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("error", error.response.data);
      return error.response.data;
    });
};
const getTimesheets = () => {
  return api
    .get("/timesheet")
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((error) => {
      console.error("error", error.response.data);
      return error.response.data;
    });
};
const deleteTimesheet = (id: number) => {
  return api
    .delete(`/timesheet/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("error", error.response.data);
      return error.response.data;
    });
};

const approveTimesheet = (id: number) => {
  return api
    .post(`/timesheet/${id}/approve`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("error", error.response.data);
      return error.response.data;
    });
};
const getTimesheetById = (id: number) => {
  return api
    .get(`/timesheet/${id}`)
    .then((response) => {
      // Handle the successful response here
      return response.data.data;
    })
    .catch((error) => {
      // Handle any errors here
      console.error("error", error.response.data);
      return error.response.data;
    });
};
const TimesheetService = {
  uploadTimesheet,
  getTimesheets,
  deleteTimesheet,
  getTimesheetById,
  approveTimesheet,
};

export default TimesheetService;
