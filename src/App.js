import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/login.components";
import Signup1 from "./components/signup/signup1.components";
import Service from "./components/signup/service.components";
import Signup2 from "./components/signup/signup2.components";
import FindID from "./components/lost/findid.components";
import FindPW from "./components/lost/findpw.components";
import Onboard1 from "./components/onboard/onboard1.components";
import Onboard2 from "./components/onboard/onboard2.components";
import Onboard3 from "./components/onboard/onboard3.components";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [realname, setRealname] = useState("");
  const [phoneNum, setPhoneNum] = useState("01012345678");
  const [emailAgree, setEmailAgree] = useState(1);
  const [snsAgree, setSnsAgree] = useState(1);

  return (
    <div id="main-container">
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/signup1"
            element={
              <Signup1
                setEmailSignup={setEmail}
                setPassword={setPassword}
                setRealname={setRealname}
                setPhoneNum={setPhoneNum}
                setEmailAgree={setEmailAgree}
                setSnsAgree={setSnsAgree}
              />
            }
          />
          <Route path="/service" element={<Service />} />
          <Route
            path="/signup2"
            element={
              <Signup2
                email={email}
                password={password}
                realname={realname}
                phoneNum={phoneNum}
                emailAgree={emailAgree}
                snsAgree={snsAgree}
              />
            }
          />
          <Route path="/onboard1" element={<Onboard1 />} />
          <Route path="/onboard2" element={<Onboard2 />} />
          <Route path="/onboard3" element={<Onboard3 />} />
          <Route path="/find-id" element={<FindID />} />
          <Route path="/find-pw" element={<FindPW />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
