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

function App() {
  return (
    <div className="App">
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
        <Route path="/Main/*" element={<Main />} />
        <Route path="/Student/*" element={<StudentHome />} />
        <Route path="/Test" element={<TestFunc2 />} />
      </Routes>
    </div>
  );
}

export default App;
