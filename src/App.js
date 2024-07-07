import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import {
  HomePages,
  LoginPages,
  SignupPages,
  AboutUs,
  Payment,
  HowToUse,
} from "./pages/unauthorizedPages";
import Main from "./pages/authorizedPages/chooseRoom/Main";
import Layouts from "./pages/layout/Layouts";
import StudentHome from "./pages/authorizedPages/student/StudentHome";
import TestFunc, { TestFunc2 } from "./components/studentCom/Test3d";
import AutherizonRequire from "./components/setting/AutherizonRequire";
import LecturerHome from "./pages/authorizedPages/lecturer/LecturerHome";

function App() {
  return (
    <div className="App">
      <div className="Updating">
        <div>This platform is updating...</div>
      </div>
      <div className="Functioned ">
        <Routes>
          <Route element={<Layouts header="home" />}>
            <Route index path="/" element={<HomePages />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/HowToUse" element={<HowToUse />} />
          </Route>
          <Route element={<Layouts header="login" />}>
            <Route path="/Login" element={<LoginPages />} />
          </Route>
          <Route element={<Layouts header="sign up" />}>
            <Route path="/Signup" element={<SignupPages />} />
          </Route>
          {/* <Route element={<AutherizonRequire allowedAuth={["STUDENT","ADMIN"]} />}> */}
            <Route path="/Main/*" element={<Main />} />
            <Route path="/Student/*" element={<StudentHome />} />
          {/* </Route> */}
          <Route path="/Lecturer/*" element={<LecturerHome />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
