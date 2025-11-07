import StudentForm from "@/modules/accounts/student/components/student.form";
import { Student } from "@/modules/accounts/student/student.model";
import useStudentService from "@/modules/accounts/student/student.service";
import StudentClassShiftMultipleForm from "@/modules/accounts/student_request_shift/components/student_class_shift.multiple_form";
import { StudentRequestShift } from "@/modules/accounts/student_request_shift/student_request_shift.model";
import { User } from "@/modules/auth/user/user.model";
import useHandleError from "@/utils/api/handleError";
import { Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const StudentRegisteration = () => {
  const [studentForm] = Form.useForm<Student & User>();
  const [classShiftForm] = Form.useForm<StudentRequestShift>();
  const [loading, setLoading] = useState<boolean>(false);
  const studentService = useStudentService();
  const errorHandler = useHandleError();
  const router = useRouter();

  const handleSave = async () => {
    try {
      const studentData = await studentForm.validateFields();
      const classShiftData = await classShiftForm.validateFields();

      setLoading(true);
      const shift_data = classShiftData.student_request_shifts?.map((value) => {
        const [start_time, end_time] = value.shift?.split("-");
        return { ...value, start_time, end_time };
      });
      studentData.student_request_shifts = shift_data;

      studentService
        .addStudent(studentData)
        .then((value) => {
          if (value.data.checkout_url) {
            router.push(value.data.checkout_url);
          } else {
            studentForm.resetFields();
            classShiftForm.resetFields();
            message.success("You have successfully applied");
          }
        })
        .catch((e) => {
          console.log(e);
          errorHandler.handleError(e, studentForm);
          errorHandler.handleError(e, classShiftForm);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };
  return (
    <div className="registration-container">
      <StudentForm is_client form={studentForm} />
      <StudentClassShiftMultipleForm form={classShiftForm} student="1234" />
      <Form.Item className="flex justify-end">
        <Button onClick={handleSave} type="primary" loading={loading} size="large">
          Submit Registration
        </Button>
      </Form.Item>
    </div>
  );
};

export default StudentRegisteration;
