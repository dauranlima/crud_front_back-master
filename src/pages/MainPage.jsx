import Container from "@/components/Container";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <Container>
      <Header/>
          <Outlet />
      </Container>
    </div>
  );
}
