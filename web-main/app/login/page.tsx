import Login from "@/modules/auth/login/login";

export default function Page() {
  return (
	<div style={{background: "linear-gradient(to right, #0c3ea7 40%, #4A90E2 100%)"}} className="h-screen w-screen flex items-center justify-center">
	  <div className="w-xl">
		<Login />
	  </div>
	</div>
  );
}
