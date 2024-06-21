import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useNavigate();

    const submitForm = async (e) =>{
        e.preventDefault();

    if(password !== confirmPassword){
        alert("Passwordi se ne poklapaju!");
        return;
    }

    const data = {
        username: username,
        password: password,
    };

    try{
        await axios.post("http://localhost:8081/user", data);
        history("/");
    }catch(error){
        console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Ulogujte se
                </h5>
                <form onSubmit={submitForm}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInput">Korisničko ime</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword1"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword1">Potvrdite password</label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Registracija
                    </button>
                  </div>
                  <hr className="my-4" />
                  <div className="d-grid">
                    <button
                      className="btn btn-secondary btn-login text-uppercase fw-bold"
                      onClick={() => history("/")}
                    >
                      Ulogujte se
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default Register;