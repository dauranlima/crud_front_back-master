import Container from "@/components/Container";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="bg-gray-100 h-[calc(100vh-114px)]">
      <Container>
      <Header/>
          <Outlet />
      </Container>
    </div>
  );
}
