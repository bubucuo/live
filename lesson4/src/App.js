import {
  Router,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink,
  useNavigate,
  useParams,
  Navigate,
  useLocation,
  useMatch,
} from "./which";
import AboutLazy from "./pages/AboutLazy";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import NoMatch from "./pages/NoMatch";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import AuthProvider, {RequireAuth} from "./layouts/AuthProvider";
import User from "./pages/User";
import Login from "./pages/Login";
// import DataLoading, {loaderOfDataLoading} from "./pages/DataLoading";

export default function App(props) {
  return (
    <div className="app">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<AboutLazy />} />
              <Route path="*" element={<NoMatch />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route
                path="user"
                element={
                  <RequireAuth>
                    <User />
                  </RequireAuth>
                }
              />
              <Route path="login" element={<Login />} />
              {/* <Route
                path="dataloading"
                element={<DataLoading />}
                loader={loaderOfDataLoading}
                errorElement={
                  <div>
                    Oops! There was an error.（切换路由的时候断网会显示此错误）
                  </div>
                }
              /> */}
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}
