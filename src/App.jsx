import Provider from "./context/Provider"
import AppRoutes from "./routes"

function App() {

  return (
    <Provider>
      <AppRoutes/>
    </Provider>
  )
}

export default App
