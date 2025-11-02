'use client';
import { Tabs } from "antd";
import React, { useState } from "react";
import { Container } from "../../components/Container/Container";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import StudentRegisteration from "../StudentRegisteration/StudentRegisteration";
import TeacherRegisteration from "../TeacherRegisteration/TeacherRegisteration";
import "./Registeration.scss";

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
          <div className="selection-buttons">
            <button
              className="selection-button"
              onClick={() => handleSelection("student_registeration")}
            >
              Student Registration
            </button>
            <button
              className="selection-button"
              onClick={() => handleSelection("teacher_registeration")}
            >
              Teacher Registration
            </button>
          </div>
        ) : (
          // Registration form with back button
          <div className="form-container">
            <button
              onClick={goBack}
              className="back-button"
            >
              ← Go Back
            </button>
            <div className="tabs-container">
              <Tabs
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                items={[
                  {
                    key: "student_registeration",
                    label: "Student Registration",
                    children: <StudentRegisteration />,
                  },
                  {
                    key: "teacher_registeration",
                    label: "Teacher Registration",
                    children: <TeacherRegisteration />,
                  },
                ]}
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Registeration;
