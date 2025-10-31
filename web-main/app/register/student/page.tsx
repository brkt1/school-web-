// pages/register.tsx or app/register/page.tsx (depending on routing setup)
import StudentForm from "@/modules/accounts/student/components/student.form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Student Registration
        </h2>
        <StudentForm />
      </div>
    </div>
  );
}
