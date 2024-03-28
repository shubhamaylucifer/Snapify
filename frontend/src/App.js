 
import './App.css';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import store from './redux/store';
import UserDashboard from './user/UserDashboard';
import Dashboard from './admin/Dashboard';
import PostCreate from './admin/PostCreate';
import PostEdit from './admin/PostEdit';
import UserRoute from './components/UserRoutes';
import AdminRoute from './components/AdminRoutes';


 

function App() {
  return (
    <div className="App">
    <Provider store={store}>
       <BrowserRouter>
            <Routes> 
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/singlepost' element={<Post />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/user/dashboard' element={<UserRoute><UserDashboard /></UserRoute>} />
              <Route path='/admin/dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} />
              <Route path='/admin/create/post' element={<AdminRoute><PostCreate /></AdminRoute>} />
              <Route path='/admin/edit/post/:id' element={<AdminRoute><PostEdit /></AdminRoute>} />
            </Routes>
          </BrowserRouter>
          <Footer />
          </Provider>
         
    </div>
  );
}

export default App;
