import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div>
      <Outlet />
      <Toaster position="top-center" />
    </div>
  );
}
