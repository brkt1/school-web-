'use client';
import React, { useState } from "react";
import { Button, Tabs } from "antd";
import StudentRegisteration from "../StudentRegisteration/StudentRegisteration";
import TeacherRegisteration from "../TeacherRegisteration/TeacherRegisteration";
import { Container } from "../../components/Container/Container";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";

const Registeration: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleSelection = (key: string) => {
    setActiveKey(key);
  };

  const goBack = () => {
    setActiveKey(null);
  };

  return (
    <section id="registeration">
      <Container className="registeration__container">
        <SectionHeading
          heading="Registration"
          subHeading="Create your account to get started. Join our community by filling out a quick registration form—it's fast, easy, and unlocks full access to all features and updates."
        />

        {activeKey === null ? (
          // Selection screen
          <div className="flex justify-center gap-6 mt-10">
            <Button
              type="primary"
              size="large"
              className="bg-primary hover:bg-primary"
              onClick={() => handleSelection("student_registeration")}
            >
              Student Registeration
            </Button>
            <Button
              type="primary"
              size="large"
              className="bg-primary hover:bg-primary"
              onClick={() => handleSelection("teacher_registeration")}
            >
             Teacher Registeration
            </Button>
          </div>
        ) : (
          // Registration form with back button
          <div className="mt-10">
            <Button
              onClick={goBack}
              className="mb-6 text-parimary border-parimary hover:bg-orange-50"
            >
              ← Go Back
            </Button>
            <Tabs
              className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-lg"
              activeKey={activeKey}
              onChange={(key) => setActiveKey(key)}
              type="card"
              items={[
                {
                  key: "student_registeration",
                  label: (
                    <span
                      className={`text-lg font-bold text-center px-4 py-2 transition-all ${
                        activeKey === "student_registeration"
                          ? "text-white bg-primary rounded-md"
                          : "text-primary"
                      }`}
                    >
                      Student Registration
                    </span>
                  ),
                  children: <StudentRegisteration />,
                },
                {
                  key: "teacher_registeration",
                  label: (
                    <span
                      className={`text-lg font-bold text-center px-4 py-2 transition-all ${
                        activeKey === "teacher_registeration"
                          ? "text-white bg-primary rounded-md"
                          : "text-bg-primary"
                      }`}
                    >
                      Teacher Registration
                    </span>
                  ),
                  children: <TeacherRegisteration />,
                },
              ]}
            />
          </div>
        )}
      </Container>
    </section>
  );
};

export default Registeration;
