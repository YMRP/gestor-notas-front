import { Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ShowNotes from "./pages/ShowNotes";
import Login from "./pages/Login";
import Register from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateNote from "./pages/CreateNote";
//ESTA ES UN ARBOIL DE ELEMENTOS
//SIMILAR A " const x = <h1>Hola</h1> "

export const AppRoutes = (
  <>
    <Route element={<Login />}>
      <Route index element={<LoginForm />} path="/" />
      <Route element={<Register />} path="register" />
    </Route>

    <Route element={<Layout />}>
      <Route element = {<ProtectedRoute/>}>
        <Route element={<Dashboard />} path="dashboard" />
        <Route element={<ShowNotes />} path="show-notes" />
        <Route element={<CreateNote/>} path="create-note" />
      </Route>
    </Route>
  </>
);

export default AppRoutes;
