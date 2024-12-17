import { BrowserRouter, Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import MainPage from "./pages/MainPage"
import Login from "./pages/Login"
import Produto from "./pages/Produto"
import EditProduct from "./pages/EditProduct"
import AddProduct from "./pages/AddProduct"
import Page404 from "./pages/Page404"
import AddVend from "./components/AddVend"
import EditVend from "./components/EditVend"
import Pedidos from "./pages/Pedidos"
import PedidosVend from "./components/PedidosVend"
import Cart from "./pages/Cart"
 
export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<MainPage />}>
        <Route index element={<Home />} />
        <Route path="/produtos" element={<Produto />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/pedidosvend/:id" element={<PedidosVend/>}/>
        <Route path="/editProduto/:id" element={<EditProduct />} />
        <Route path="/editVend/:id" element={<EditVend/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/addProduto" element={<AddProduct />} />
        <Route path="/addVendedora" element={<AddVend/>}/>
      </Route>
    </Routes>

    </BrowserRouter>
  )
}
