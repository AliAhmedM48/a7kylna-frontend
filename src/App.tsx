//#region IMPORTS
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import GuestLayout from "./layouts/guestLayout";
import { ContextProvider } from "./context/Auth";
import RequireAuth from "./components/RequireAuth";
import { routes } from "./_utils/Routes";
//#endregion

function App() {


  const router = createBrowserRouter(
    //#region 
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />

          <Route path={routes.Add} element={
            <RequireAuth>
              <PostForm />
            </RequireAuth>
          } />
          <Route path={routes.Edit} element={
            <RequireAuth>
              <PostForm />
            </RequireAuth>
          } />
        </Route>
        <Route path="/" element={<GuestLayout />}>
          <Route path={routes.Register} element={
            <RequireAuth>
              <Register />
            </RequireAuth>
          } />
          <Route path={routes.Login} element={
            <RequireAuth>
              <Login />
            </RequireAuth>
          } />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
    //#endregion
  );




  return (
    <>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </>
  );
}

export default App;
