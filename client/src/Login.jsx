import { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios"; 

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Definisanje stanja za korisnika iz localStorage-a
  const [travels, setTravels] = useState([]); // Definisanje stanja za putovanja
  const [username, setUsername] = useState(""); // Definisanje stanja za unos korisničkog imena
  const [password, setPassword] = useState(""); // Definisanje stanja za unos lozinke
  const navigate = useNavigate(); // Inicijalizacija hook-a za navigaciju
  const location = useLocation(); // Dohvatanje trenutne lokacije

  useEffect(() => {
    // Ažuriranje korisnika iz localStorage-a pri promjeni lokacije
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  useEffect(() => {
    // Funkcija za dohvatanje podataka o putovanjima sa servera
    const fetchTravels = async () => {
      try {
        const response = await axios.get("http://localhost:8081/travels");
        setTravels(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTravels();
  }, []);

  // Funkcija za brisanje putovanja
  const deleteTravel = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/travels/${id}`);
      setTravels(travels.filter((travel) => travel.id !== id)); // Ažuriranje stanja nakon brisanja
    } catch (error) {
      console.error("Error deleting travel:", error);
    }
  };

  // Funkcija za renderovanje putovanja
  const renderTravels = () => {
    return travels.map((travel) => (
      <div key={travel.id} className="col-4 mb-3">
        <div className="card shadow-lg">
          <img
            src={travel.imageURL}
            className="card-img-top"
            style={{ height: "300px", cursor: "pointer" }}
            alt={travel.title}
            onClick={() => navigate(`/home/${travel.id}`)} // Navigacija na detalje putovanja
          />
          <div className="card-body">
            <h4 className="card-title">{travel.title}</h4>
            <div className="">
              {user?.role === "admin" && (
                <>
                  <button
                    className="btn btn-outline-primary buttons"
                    onClick={() => navigate(`/home/edit/${travel.id}`)} // Navigacija na edit putovanja
                  >
                    Uredite
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteTravel(travel.id)} // Brisanje putovanja
                  >
                    Izbrišite
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  // Funkcija za prijavu korisnika
  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8081/user/login", data);
      if (response.data.status === "aktivan") {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      } else {
        alert("Niste aktivan korisnik, molimo Vas da obavjestite admine kako bi vam vratili aktivnost!");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      alert("Pogrešno korisničko ime ili šifra!");
    }
  };

  return (
    <>
      <div className="background-video">
        <video autoPlay loop muted>
          <source src="img/video-background.mp4" type="video/mp4" />
          Tvoj browser ne podržava video.
        </video>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-8 col-md-6 col-lg-4 mx-auto">
            <div className="card border-0 rounded-3" style={{ opacity: 0.9 }}>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-4 fw-light fs-5">
                  Ulogujte se
                </h5>
                <form onSubmit={submitForm}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInput">Korisničko ime...</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword">Password...</label>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <button
                        className="btn btn-primary btn-login text-uppercase fw-bold w-100"
                        type="submit"
                      >
                        Ulogujte se
                      </button>
                    </div>
                    <div className="col-md-6 mb-1">
                      <button
                        className="btn btn-primary btn-login text-uppercase fw-bold w-100"
                        onClick={() => navigate("/register")}
                      >
                        Registrujte se
                      </button>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-outline-secondary btn-login text-uppercase fw-bold mt-3"
                      onClick={() => {
                        const guest = {
                          status: "neaktivan",
                          role: "guest",
                        };
                        localStorage.setItem("user", JSON.stringify(guest));
                        navigate("/home");
                      }}
                    >
                      Nastavite kao gost
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="paragraph">
        <p>Najposjećenije destinacije</p>
      </div>

      <div className="container travels">
        <div className="row">
          {renderTravels()}
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Informacije o kompaniji</h5>
              <p>Turistička</p>
              <p>Adresa, grad</p>
              <p>Phone: (+387) 123-1234</p>
            </div>
            <div className="col-md-4">
              <h5>Korisni linkovi</h5>
              <ul>
                <li><a href="/">Početna</a></li>
                <li><a href="/about">O nama</a></li>
                <li><a href="/contact">Kontakt</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Zapratite nas</h5>
              <ul>
                <li><a href="https://twitter.com/">Twitter</a></li>
                <li><a href="https://www.facebook.com/">Facebook</a></li>
                <li><a href="https://www.instagram.com/">Instagram</a></li>
              </ul>
            </div>
            <span><p>© 2024 Touristic. All rights reserved.</p></span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home; // Izvoz komponente za korištenje u drugim dijelovima aplikacije
