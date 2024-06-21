import axios from "axios"; 
import { useEffect, useState } from "react"; 
import { useNavigate, useLocation } from "react-router-dom"; 

const ListUsers = () => {
  const [users, setUsers] = useState([]); // Definisanje stanja za korisnike
  const navigate = useNavigate(); // Inicijalizacija hook-a za navigaciju
  const location = useLocation(); // Dohvatanje trenutne lokacije

  useEffect(() => {
    // Funkcija za dohvatanje podataka o korisnicima sa servera
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8081/user"); // Slanje GET zahtjeva na server
        setUsers(data); // Postavljanje dobijenih podataka u stanje
      } catch (error) {
        console.error("Greška pri dohvatanju korisnika:", error); // Ispisivanje greške u konzolu
      }
    };

    fetchUsers(); // Pozivanje funkcije za dohvatanje podataka
  }, [location.key]); // Efekt će se pokrenuti svaki put kada se promijeni ključ lokacije

  // Funkcija za promjenu statusa korisnika
  const handleStatusChange = async (userId) => {
    try {
      await axios.patch(`http://localhost:8081/user/status/${userId}`); // Slanje PATCH zahtjeva na server za promjenu statusa
      navigate(location.pathname); // Osvježavanje trenutne stranice
    } catch (error) {
      console.error("Greška pri promjeni statusa:", error); // Ispisivanje greške u konzolu
    }
  };

  // Funkcija za brisanje korisnika
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/user/${userId}`); // Slanje DELETE zahtjeva na server za brisanje korisnika
      navigate(location.pathname); // Osvježavanje trenutne stranice
    } catch (error) {
      console.error("Greška pri brisanju korisnika:", error); // Ispisivanje greške u konzolu
    }
  };

  return (
    <div className="container mt-5">
      <ul className="list-group">
        {users.map((user) =>
          user.username !== "admin" ? ( // Filtriranje admin korisnika
            <li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
              <div>
                <strong>Korisničko ime:</strong> {user.username} - <strong>Uloga:</strong> {user.role} - <strong>Status:</strong> {user.status}
              </div>
              <div>
                <button className="btn btn-outline-primary mx-2" onClick={() => handleStatusChange(user.id)}>
                  Promijenite status
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                  Izbrišite
                </button>
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ListUsers; // Izvoz komponente za korištenje u drugim dijelovima aplikacije
