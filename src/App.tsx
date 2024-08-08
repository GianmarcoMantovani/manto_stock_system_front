import { Box, Grid, VStack } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/home/Home";
import Providers from "./pages/providers/Providers";
import Purchases from "./pages/purchases/Purchases";
import Products from "./pages/products/Products";
import Clients from "./pages/clients/Clients";
import Balance from "./pages/balance/Balance";
import Productions from "./pages/productions/Productions";
import Sales from "./pages/sales/Sales";

const signInPath = "/login";

interface Props {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: Props) => {
  const location = useLocation();
  return (
    <Grid
      bgColor={"whitesmoke"}
      templateColumns="10rem 1fr minmax(0, 1fr)"
      h="100vh"
      overflow={"hidden"}
    >
      <Box h="100%">
        {!location.pathname.toLowerCase().includes("login") && <Sidebar />}
      </Box>
      <Box
        gridColumn="2 / span 2"
        h="calc(100vh - 64px)"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Grid>
  );
};

function App() {
  return (
    <VStack w={"full"} minH={"100vh"} spacing={0}>
      <Box w={"full"} flex={1} bgColor={"whitesmoke"}>
        {location.pathname.includes("login") && <Sidebar />}
        <Routes>
          <Route
            path={"/"}
            element={
              <RequireAuth fallbackPath={signInPath}>
                <AuthenticatedLayout>
                  <Home />
                </AuthenticatedLayout>
              </RequireAuth>
            }
          />
          <Route
            path={signInPath}
            element={
              <RedirectIfAuthenticated>
                <SignIn />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path={"/proveedores"}
            element={
              <AuthenticatedLayout>
                <RequireAuth fallbackPath={signInPath}>
                  <Providers />
                </RequireAuth>
              </AuthenticatedLayout>
            }
          />
          <Route
            path={"/compras"}
            element={
              <AuthenticatedLayout>
                <RequireAuth fallbackPath={signInPath}>
                  <Purchases />
                </RequireAuth>
              </AuthenticatedLayout>
            }
          />
          <Route
            path={"/productos"}
            element={
              <AuthenticatedLayout>
                <RequireAuth fallbackPath={signInPath}>
                  <Products />
                </RequireAuth>
              </AuthenticatedLayout>
            }
          />
          <Route
            path={"/clientes"}
            element={
              <AuthenticatedLayout>
                <RequireAuth fallbackPath={signInPath}>
                  <Clients />
                </RequireAuth>
              </AuthenticatedLayout>
            }
          />
          <Route
            path={"/balance"}
            element={
              <AuthenticatedLayout>
                <RequireAuth fallbackPath={signInPath}>
                  <Balance />
                </RequireAuth>
              </AuthenticatedLayout>
            }
          />
          <Route
            path={"/producciones"}
            element={
              <AuthenticatedLayout>
                <RequireAuth fallbackPath={signInPath}>
                  <Productions />
                </RequireAuth>
              </AuthenticatedLayout>
            }
          />
          <Route
            path={"/ventas"}
            element={
              <AuthenticatedLayout>
                <RequireAuth fallbackPath={signInPath}>
                  <Sales />
                </RequireAuth>
              </AuthenticatedLayout>
            }
          />
        </Routes>
      </Box>
    </VStack>
  );
}

export default App;
