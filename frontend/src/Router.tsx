import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import About from '@pages/About';
import Appointments from '@pages/Appointments';
import Contact from '@pages/Contact';
import Doctors from '@pages/Doctors';
import Home from '@pages/Home';
import Login from '@pages/Login';
import MyAppointments from '@pages/MyAppointments';
import MyProfile from '@pages/MyProfile';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from '@components/PrivateRoute';
import Specialities from '@pages/admin/Spcialities';

const Router: React.FC = () => {
    return (
        <div className="mx-4 sm:mx-[10%]">
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:specialityParam" element={<Doctors />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                    path="/my-profile"
                    element={<PrivateRoute element={<MyProfile />} />}
                />
                <Route path="/my-appointments" element={<MyAppointments />} />
                <Route path="/appointment/:docId" element={<Appointments />} />
                <Route path="/admin">
                    <Route
                        path="specialities"
                        element={<PrivateRoute element={<Specialities />} />}
                    />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
};

export default Router;
