import { AxiosError } from "axios";
import { FormInstance, message, notification } from "antd";

export interface ApiErrorModel {
  error: {
    details: {
      [key: string]: string[];
    };
  };
}

const useHandleError = () => {
  const handleError = (
    error: AxiosError<ApiErrorModel>,
    form: FormInstance<any>
  ) => {
    if (!error.response?.status) {
      message.error("Connection Failed. Please Try again");
      return;
    }

    if (error.response.status === 400) {
      const details = error.response.data.error.details;

      if (Array.isArray(details)) {
        for (const errorDict of details) {
          if (typeof errorDict !== "object" || errorDict === null) continue;

          for (const key in errorDict) {
            const messages = errorDict[key];

            if (!Array.isArray(messages)) {
              console.warn("Expected error messages to be an array:", messages);
              continue;
            }

            console.log("Error key:", key, "Messages:", messages);

            // Handle root non_field_errors at list item level
            const arrayItemMatch = key.match(
              /^(\w+)\[(\d+)\]\.non_field_errors$/
            );
            if (arrayItemMatch) {
              const index = parseInt(arrayItemMatch[2], 10);
              form.setFields([
                {
                  name: [index, "root"], // you can also choose ["teacher_request_shifts", index, "root"] if you prefer full path
                  errors: messages,
                },
              ]);
              continue;
            }

            // Handle global form-level non_field_errors
            if (key === "non_field_errors") {
              form.setFields([
                {
                  name: ["root"],
                  errors: messages,
                },
              ]);
              continue;
            }

            // Normal error field handling
            const namePath = key
              .replace(/\[(\d+)\]/g, (_, index) => `.${index}`)
              .split(".")
              .map((segment) =>
                /^\d+$/.test(segment) ? Number(segment) : segment
              );

            form.setFields([
              {
                name: namePath,
                errors: messages,
              },
            ]);
          }
        }
      } else if (typeof details === "object") {
        // fallback for dict-style
        for (const key in details) {
          const messages = details[key];

          if (key === "non_field_errors") {
            form.setFields([
              {
                errors: messages,
                name: ["root"],
              },
            ]);
          } else if(key === 'detail'){
            message.error(details[key]);
          } else {
            const namePath = key
              .replace(/\[(\d+)\]/g, (_, index) => `.${index}`)
              .split(".");

            form.setFields([
              {
                errors: messages,
                name: namePath,
              },
            ]);
          }
        }
      }
      console.log("Error details:", form.getFieldsError());
    }
  };

  const notifyError = (error: AxiosError<ApiErrorModel>) => {
    const errors = error.response?.data?.error?.details;
    if (Array.isArray(errors)) {
      for (let error of errors) {
        message.error(error);
      }
    }
  };

  return { handleError, notifyError };
};

export default useHandleError;
