import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Write from './pages/Write';
import Single from './pages/Single';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './style.scss';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/blog-app',
        element: <Home />,
      },
      {
        path: '/blog-app/post/:id',
        element: <Single />,
      },
      {
        path: '/blog-app/write',
        element: <Write />,
      },
    ],
  },
  {
    path: '/blog-app/register',
    element: <Register />,
  },
  {
    path: '/blog-app/login',
    element: <Login />,
  },
  {
    path: '/blog-app/home',
    element: <Home />,
  },
  {
    path: '/blog-app/write',
    element: <Write />,
  },
]);
function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
