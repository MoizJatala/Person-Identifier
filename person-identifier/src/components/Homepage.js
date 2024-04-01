import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './main';
import Skills from './Skills';
import About from './About';
import Projects from './Projects';
import FileUpload from './FileUplaod';  // Import the FileUpload component

const HomePage = ({ user, setUser }) => {
    // const location = useLocation();
    // const user = location.state?.user;

    // Set a condition based on which the FileUpload component will be rendered
    const shouldRenderFileUpload = null/* your condition here */;

    return (
        <>
            {/* Pass user data to Navbar and other components as needed */}
            {/* <Navbar user={user?.name} /> */}
            {/* <Navbar user={user} /> */}
            <Hero />
            <Skills />
            <About />
            <Projects />

            {/* Conditionally render the FileUpload component */}
            {shouldRenderFileUpload && <FileUpload user={user} />}
        </>
    );
};

export default HomePage;
