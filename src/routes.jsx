import { IoHomeOutline } from "react-icons/io5";
import { FaUserDoctor } from 'react-icons/fa6';
import { BsPersonBadge } from "react-icons/bs";
import Patient from './pages/Patient/Patient';
import Practitioner from './pages/Practitioner';
import Home from './pages/Home';


const routes = [
    { name: "Home", path: '/', component: Home, icon: ({...props}) => <IoHomeOutline {...props}/> },
    { name: "Patients", path: '/patient', component: Patient, icon: ({...props}) =><BsPersonBadge {...props}/> },
    { name: "Practitioners", path: '/practitioner', component: Practitioner, icon: ({...props}) => <FaUserDoctor {...props}/> },
];

export default routes;