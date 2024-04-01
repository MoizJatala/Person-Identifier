import Navbar from './components/Navbar';
import Login from './components/Login'
import HomePage from './components/Homepage';
import SignUp from './components/SignUp';
import FileUpload from './components/FileUplaod';
import Recorder from './components/Recorder';
import Admin from './components/Admin';
import Profile from './components/profile'
import AdminProfile from './components/adminProfile'
import UploadVideos from './components/uploaded-videos'
import { Route, BrowserRouter, Routes } from 'react-router-dom';


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<>
            <Navbar />
            <SignUp />
          </>}></Route>
          <Route path='/login' element={<>
            <Navbar />
            <Login />
          </>}></Route>
          <Route path='/' element={<>
            <Navbar />
            <HomePage />
          </>}></Route>
          <Route path='/fileupload' element={<>
            <Navbar />
            <FileUpload />
          </>}></Route>
          <Route path='/recorder' element={<>
            <Navbar />
            <Recorder />
          </>}></Route>
          <Route path='/admin' element={<><Navbar /><Admin /></>}></Route>
          <Route path='/profile' element={<><Navbar /><Profile /></>}></Route>
          <Route path='/adminProfile' element={<AdminProfile/>}></Route>
          <Route path='/uploaded-videos' element={<><Navbar /><UploadVideos /></>}></Route>
        </Routes>
        
          {/* Exclude Navbar for the /admin route */}
        
      </BrowserRouter>
    </>
  );
}

export default App;
