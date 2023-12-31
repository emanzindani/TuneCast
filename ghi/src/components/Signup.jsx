import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();
  const accountData = {
    username: username,
    password: password,
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(
      accountData,
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/`
    );
    navigate("/");
  };

  return (
    <>
      <Button variant="" onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-md-5 mt-md-4 pb-5">
            <p className="text-black-50 mb-5 fw-bold">
              Please enter your desired username and password!
            </p>

            <div className="form-outline form-white mb-4">
              <input
                type="text"
                id="typeUsernameX"
                className="form-control form-control-lg bg-dark text-white border-white"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-outline form-white mb-4">
              <input
                type="password"
                id="typePasswordX"
                className="form-control form-control-lg bg-dark text-white border-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-outline-dark btn-lg px-5"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Signup;
