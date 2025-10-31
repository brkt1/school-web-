"use client";
import TeacherForm from "@/modules/accounts/teacher/components/teacher.form";
import { Teacher } from "@/modules/accounts/teacher/teacher.model";
import useTeacherService from "@/modules/accounts/teacher/teacher.service";
import TeacherClassShiftMultipleForm from "@/modules/accounts/teacher_class_shift/components/teacher_class_shift.multiple_form";
import { TeacherRequestShift } from "@/modules/accounts/teacher_request_shift/teacher_request_shift.model";
import { User } from "@/modules/auth/user/user.model";
import useHandleError from "@/utils/api/handleError";
import { Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs";

const TeacherRegisteration = () => {
  const [teacherForm] = Form.useForm<Teacher & User>();
  const [classShiftForm] = Form.useForm<TeacherRequestShift>();
  const [loading, setLoading] = useState<boolean>(false);
  const teacherService = useTeacherService()
  const errorHandler = useHandleError();
  const router = useRouter();

  const handleSave = async () => {
    try {
      const teacherData = await teacherForm.validateFields();
      const classShiftData = await classShiftForm.validateFields();

      if (teacherData.vat_reg_date) {
        teacherData.vat_reg_date = dayjs(teacherData.vat_reg_date).format("YYYY-MM-DD");
      }
    setLoading(true);
    const formData = new FormData();

    Object.entries(teacherData).forEach(([key, value]) => {
      if (key !== "cv" && key !== 'teacher_request_shifts' && value != undefined) {
        formData.append(key, value);
      }
    });
    const shift_data = classShiftData.teacher_request_shifts?.map(value => {
          const [start_time, end_time] = value.shift?.split("-")
          return {...value, start_time, end_time}
        })
    formData.append('teacher_request_shifts', JSON.stringify(shift_data))
    if(teacherData.cv){
      formData.append("cv", teacherData.cv.fileList[0].originFileObj as File);
    }

      teacherService.addTeacher(formData)
      .then((value) => {
        if(value.data.checkout_url){
          router.push(value.data.checkout_url)
        } else {
          teacherForm.resetFields()
          classShiftForm.resetFields()
          message.success("You have successfully applied")
        }
      })
      .catch((e) => {
        errorHandler.handleError(e, teacherForm)
        // errorHandler.handleError(e, classShiftForm)
      })
      .finally(() => setLoading(false));

    } catch (error) {
      // console.error('Validation Failed:', error);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-6xl mx-auto bg-white p-6">
        <TeacherForm is_client form={teacherForm} />
        <TeacherClassShiftMultipleForm form={classShiftForm} teacher="1234" />
        <Form.Item>
          <Button onClick={handleSave} type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </div>
    </div>
  );
};

export default TeacherRegisteration;
