"use client";
import TeacherDetail from "@/modules/accounts/teacher/components/teacher.detail";
import { useParams } from "next/navigation";
import TeacherRequestShiftList from "@/modules/accounts/teacher_request_shift/components/teacher_request_shift.list";
import TeacherClassShift from "../../teacher_class_shifts/[id]/page";
import TeacherClassShiftList from "@/modules/accounts/teacher_class_shift/components/teacher_class_shift.list";
import AvailableTeacherRequestShiftList from "@/modules/accounts/teacher_request_shift/components/available.teacher_request_shift.list";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useState } from "react";

export default function Teacher() {
  const params = useParams();
  const id = params.id as string;
  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className="flex flex-col gap-10">
      <TeacherDetail id={id} />
      <Tabs defaultActiveKey="1"  onChange={handleTabChange} centered>
        <TabPane tab="Class Shift" key="1">
          <h1 className="text-xl font-bold mb-2 text-center">
            Teacher ClassShift
          </h1>
          <TeacherClassShiftList active={activeKey == "1"} teacher={id} has_action={false} />
        </TabPane>
        <TabPane tab="Shift Request" key="2">
          <h1 className="text-xl font-bold mb-2 text-center">
            Teacher ClassShift Request
          </h1>
          <TeacherRequestShiftList active={activeKey == "2"} teacher={id} add_navigation={`/admin/accounts/teachers/${id}/teacher_request_shifts/create`} />
        </TabPane>
        <TabPane tab="Available Requests Shifts" key="3">
          <h1 className="text-xl font-bold mb-2 text-center">
            Teacher Available ClassShift Request
          </h1>
          <AvailableTeacherRequestShiftList active={activeKey == "3"} teacher={id} />
        </TabPane>
      </Tabs>
    </div>
  );
}
