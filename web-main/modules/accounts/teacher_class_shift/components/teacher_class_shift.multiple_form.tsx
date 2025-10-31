"use client";

import React, { useEffect, useState } from "react";
import { Button, Form,FormInstance, Input, Select } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import useHandleError from "@/utils/api/handleError";
import InstitutionSearchInput from "@/modules/organization/institution/components/institution.search";
import TeacherSearchInput from "../../teacher/components/teacher.search";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Navigations } from "@/utils/common_models/commons.model";
import { cn } from "@/utils/cn";
import InstitutionPackageSearchInput from "@/modules/organization/institution/components/institution.package.search";
import PackageDaysSearchInput from "@/modules/organization/institution/components/package.days.search";
import { TeacherRequestShift } from "../../teacher_request_shift/teacher_request_shift.model";
import useTeacherRequestShiftService from "../../teacher_request_shift/teacher_request_shift.service";
import DayTimessSearchInput from "@/modules/organization/institution/components/days.times.search";
import { enumToLabelValueArray } from "@/utils/object";
import { TeacherType } from "../../student/student.enum";

interface TeacherClassShiftFormProps
  extends Partial<TeacherRequestShift>,
    Navigations {
      form?: FormInstance<TeacherRequestShift>
    }

const TeacherClassShiftMultipleForm: React.FC<TeacherClassShiftFormProps> = ({
  id,
  form:propsForm,
  ...props
}) => {
  const [internalForm] = Form.useForm<TeacherRequestShift>();
  const form = propsForm || internalForm
  const teacher_request_shifts = Form.useWatch("teacher_request_shifts", form);
  const [data, setData] = useState<TeacherRequestShift>();
  const service = useTeacherRequestShiftService();
  const router = useRouter();
  const errorHandler = useHandleError();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (id) {
      service
        .getTeacherRequestShift(id)
        .then((res) => {
          form.setFieldsValue(res.data);
          setData(res.data);
        })
        .catch(() => {});
    } else {
      form.setFieldsValue({
        teacher_request_shifts: [
          {
            teacher: props.teacher,
            institution: undefined,
            fee_package: undefined,
            shift_days: undefined,
            shift: undefined,
          },
        ],
      });
  }
  }, [id]);

  const onFinish = (values: TeacherRequestShift) => {
    setLoading(true);
    if (id) {
      service
        .updateTeacherRequestShift(id, values)
        .then(() => router.push(`/admin/accounts/teacher_request_shifts/${id}`))
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    } else {
      const shift_data = values.teacher_request_shifts?.map(value => {
          const [start_time, end_time] = value.shift?.split("-")
          return {...value, start_time, end_time, teacher: props.teacher!}
        })
      service
        .addTeacherRequestShift(shift_data)
        .then(() => router.push(`/admin/accounts/teacher_request_shifts`))
        .catch((e) => errorHandler.handleError(e, form))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Teacher ClassShift Form</h2>
        </div>
        {!propsForm && <div className="flex gap-4 mb-4">
          {id ? (
            <Button
              loading={loading}
              href={`/admin/accounts/teacher_request_shifts/${id}`}
              type="text"
            >
              Cancel
            </Button>
          ) : (
            <Button
              loading={loading}
              href={`/admin/accounts/teacher_request_shifts`}
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
      <Form.Item name="root">
        <div/>
      </Form.Item>
        <Form.List name="teacher_request_shifts">
          {(fields, { add, remove }) => (
            <>
              {fields?.map(({ key, name, ...restField }, i, array) => (
                <div key={key} className="flex w-full gap-x-3">
                  <div className={cn("w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6", props.teacher ? 'lg:grid-cols-5' : '')}>
                    {!props.teacher && (
                      <Form.Item
                        {...restField}
                        name={[name, "teacher"]}
                        label="Teacher"
                        rules={[
                          { required: true, message: "Teacher is required" },
                        ]}
                      >
                        <TeacherSearchInput detail={data?.teacher_detail} />
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
                        const currentShifts = form.getFieldValue("teacher_request_shifts") || [];
                        currentShifts[name] = {
                          ...currentShifts[name],
                          fee_package: undefined,
                          shift_days: undefined,
                          shift: undefined,
                        };
                        form.setFieldsValue({ teacher_request_shifts: currentShifts });
                      }}
                      />
                    </Form.Item>

                    <Form.Item
                    {...restField}
                      name={[name, "teacher_type"]}
                      label="Teacher Type"
                      rules={[{ required: true, message: "Teacher Type is required" }]}
                    >
                      <Select
                        optionFilterProp="label"
                        options={enumToLabelValueArray(TeacherType)}
                        placeholder="Teacher Type"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "fee_package"]}
                      label="Package"
                      rules={[{ required: true, message: "Package is required" }]}
                    >
                      <InstitutionPackageSearchInput
                        disabled={teacher_request_shifts?.[name]?.institution == null}
                        institution={teacher_request_shifts?.[name]?.institution}
                        onChange={() => {
                        const currentShifts = form.getFieldValue("teacher_request_shifts") || [];
                        currentShifts[name] = {
                          ...currentShifts[name],
                          shift_days: undefined,
                          shift: undefined,
                        };
                        form.setFieldsValue({ teacher_request_shifts: currentShifts });
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
                        disabled={teacher_request_shifts?.[name]?.institution == null || teacher_request_shifts?.[name].fee_package == null}
                        institution={teacher_request_shifts?.[name]?.institution}
                        package_id={teacher_request_shifts?.[name]?.fee_package}
                        onChange={() => {
                        const currentShifts = form.getFieldValue("teacher_request_shifts") || [];
                        currentShifts[name] = {
                          ...currentShifts[name],
                          shift: undefined,
                        };
                        form.setFieldsValue({ teacher_request_shifts: currentShifts });
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
                          const current = teacher_request_shifts || [];

                          const currentItem = current[name];

                          const isDuplicate = current.some((item, idx) => {
                            if (idx === name) return false;
                            return (
                              item.teacher === currentItem.teacher &&
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
                        disabled={teacher_request_shifts?.[name]?.institution == null || teacher_request_shifts?.[name]?.fee_package == null || teacher_request_shifts?.[name]?.shift_days == null}
                        institution={teacher_request_shifts?.[name]?.institution}
                        package_id={teacher_request_shifts?.[name]?.fee_package}
                        shift_days={teacher_request_shifts?.[name]?.shift_days}
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

export default TeacherClassShiftMultipleForm;
