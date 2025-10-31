"use client";

import React, { useEffect, useState } from "react";
import { Button, Form,FormInstance } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import StudentSearchInput from "../../student/components/student.search";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Navigations } from "@/utils/common_models/commons.model";
import { cn } from "@/utils/cn";
import InstitutionPackageSearchInput from "@/modules/organization/institution/components/institution.package.search";
import PackageDaysSearchInput from "@/modules/organization/institution/components/package.days.search";
import { StudentRequestShift } from "../../student_request_shift/student_request_shift.model";
import useStudentRequestShiftService from "../../student_request_shift/student_request_shift.service";
import DayTimessSearchInput from "@/modules/organization/institution/components/days.times.search";

interface StudentClassShiftFormProps
  extends Partial<StudentRequestShift>,
    Navigations {
      form?: FormInstance<StudentRequestShift>
    }

const StudentClassShiftMultipleForm: React.FC<StudentClassShiftFormProps> = ({
  id,
  form:propsForm,
  ...props
}) => {
  const [internalForm] = Form.useForm<StudentRequestShift>();
  const form = propsForm || internalForm
  const student_request_shifts = Form.useWatch("student_request_shifts", form);
  const [data, setData] = useState<StudentRequestShift>();
  const service = useStudentRequestShiftService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service
        .getStudentRequestShift(id)
        .then((res) => {
          form.setFieldsValue(res.data);
          setData(res.data);
        })
        .catch(() => {});
    }
  }, [id]);

  const onFinish = (values: StudentRequestShift) => {
    // You can add phone number or date formatting here if needed
    setLoading(true);
    if (id) {
      service
        .updateStudentRequestShift(id, values)
        .then(() => router.push(`/admin/accounts/student_request_shifts/${id}`))
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      service
        .addStudentRequestShift(values)
        .then(() => router.push(`/admin/accounts/student_request_shifts`))
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Student ClassShift Form</h2>
        </div>
        {!propsForm && <div className="flex gap-4 mb-4">
          {id ? (
            <Button
              loading={loading}
              href={`/admin/accounts/student_request_shifts/${id}`}
              type="text"
            >
              Cancel
            </Button>
          ) : (
            <Button
              loading={loading}
              href={`/admin/accounts/student_request_shifts`}
              type="text"
            >
              Cancel
            </Button>
          )}
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </div>}
      </div>
      <div>
        <Form.List name="student_request_shifts">
          {(fields, { add, remove }) => (
            <>
              {fields?.map(({ key, name, ...restField }, i, array) => (
                <div key={key} className="flex w-full gap-x-3">
                  <div className={cn("w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6", props.student ? 'lg:grid-cols-4' : '')}>
                    {!props.student && (
                      <Form.Item
                        {...restField}
                        name={[name, "student"]}
                        label="Student"
                        rules={[
                          { required: true, message: "Student is required" },
                        ]}
                      >
                        <StudentSearchInput detail={data?.student_detail} />
                      </Form.Item>
                    )}

                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      label="Institution"
                      rules={[
                        { required: true, message: "Institution is required" },
                      ]}
                    >
                      <InstitutionSearchInput
                        detail={data?.institution_detail}
                        onChange={() => {
                        const currentShifts = form.getFieldValue("student_request_shifts") || [];
                        currentShifts[name] = {
                          ...currentShifts[name],
                          fee_package: undefined,
                          shift_days: undefined,
                          shift: undefined,
                        };
                        form.setFieldsValue({ student_request_shifts: currentShifts });
                      }}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "fee_package"]}
                      label="Package"
                      rules={[{ required: true, message: "Package is required" }]}
                    >
                      <InstitutionPackageSearchInput
                        disabled={student_request_shifts?.[name]?.institution == null}
                        institution={student_request_shifts?.[name]?.institution}
                        onChange={() => {
                        const currentShifts = form.getFieldValue("student_request_shifts") || [];
                        currentShifts[name] = {
                          ...currentShifts[name],
                          shift_days: undefined,
                          shift: undefined,
                        };
                        form.setFieldsValue({ student_request_shifts: currentShifts });
                      }}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "shift_days"]}
                      label="Days"
                      rules={[{ required: true, message: "Day is required" }]}
                    >
                      <PackageDaysSearchInput
                        disabled={student_request_shifts?.[name]?.institution == null || student_request_shifts?.[name].fee_package == null}
                        institution={student_request_shifts?.[name]?.institution}
                        package_id={student_request_shifts?.[name]?.fee_package}
                        onChange={() => {
                        const currentShifts = form.getFieldValue("student_request_shifts") || [];
                        currentShifts[name] = {
                          ...currentShifts[name],
                          shift: undefined,
                        };
                        form.setFieldsValue({ student_request_shifts: currentShifts });
                      }}
                      />
                    </Form.Item>


                    <Form.Item
                      {...restField}
                      name={[name, "shift"]}
                      label="Shift"
                      rules={[
                        {
                          required: true,
                          message: "Shift is required",
                        },
                        {
                        validator: (_, value) => {
                          const current = student_request_shifts || [];

                          const currentItem = current[name];

                          const isDuplicate = current.some((item, idx) => {
                            if (idx === name) return false;
                            return (
                              item.student === currentItem.student &&
                              item.institution === currentItem.institution &&
                              item.fee_package === currentItem.fee_package &&
                              JSON.stringify(item.shift_days) === JSON.stringify(currentItem.shift_days) &&
                              item.shift === value
                            );
                          });

                          return isDuplicate
                            ? Promise.reject(new Error("Duplicate shift entry found"))
                            : Promise.resolve();
                        },
                      },
                      ]}
                      
                    >
                      <DayTimessSearchInput
                        disabled={student_request_shifts?.[name]?.institution == null || student_request_shifts?.[name]?.fee_package == null || student_request_shifts?.[name]?.shift_days == null}
                        institution={student_request_shifts?.[name]?.institution}
                        package_id={student_request_shifts?.[name]?.fee_package}
                        shift_days={student_request_shifts?.[name]?.shift_days}
                      />
                    </Form.Item>
                  </div>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Class shift
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </Form>
  );
};

export default StudentClassShiftMultipleForm;
