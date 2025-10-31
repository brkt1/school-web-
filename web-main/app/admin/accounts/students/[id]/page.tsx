'use client'
import StudentDetail from "@/modules/accounts/student/components/student.detail";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import StudentClassShiftList from "@/modules/accounts/student_class_shift/components/student_class_shift.list";
import StudentRequestShiftList from "@/modules/accounts/student_request_shift/components/student_request_shift.list";
import AvailableStudentRequestShiftList from "@/modules/accounts/student_request_shift/components/available.student_request_shift.list";

export default function Student(){
    const params = useParams()
    const id = params.id as string
    const [activeKey, setActiveKey] = useState("1");
    
      const handleTabChange = (key: string) => {
        setActiveKey(key);
      };

    return <div className="flex flex-col gap-10">
        <StudentDetail id={id} />
        <Tabs defaultActiveKey="1"  onChange={handleTabChange} centered>
        <TabPane tab="Class Shift" key="1">
          <h1 className="text-xl font-bold mb-2 text-center">
            Student ClassShift
          </h1>
          <StudentClassShiftList active={activeKey == "1"} student={id} has_action={false} />
        </TabPane>
        <TabPane tab="Shift Request" key="2">
          <h1 className="text-xl font-bold mb-2 text-center">
            Student ClassShift Request
          </h1>
          <StudentRequestShiftList active={activeKey == "2"} student={id} add_navigation={`/admin/accounts/students/${id}/student_request_shifts/create`} />
        </TabPane>
        <TabPane tab="Available Requests Shifts" key="3">
          <h1 className="text-xl font-bold mb-2 text-center">
            Student Available ClassShift Request
          </h1>
          <AvailableStudentRequestShiftList active={activeKey == "3"} student={id} />
        </TabPane>
      </Tabs>
        </div>
}