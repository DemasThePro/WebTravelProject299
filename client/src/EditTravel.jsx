import axios from "axios"; // biblioteka za HTTP zahtjeve
import { useState, useEffect } from "react"; // hook za korištenje stanja i efekata u React-u
import { useNavigate, useParams } from "react-router-dom"; // hook za navigaciju i parametre URL-a

const EditTravel = () => {
  // Definisanje stanja za formu sa početnim vrijednostima
  const [formData, setFormData] = useState({
    title: "", // Naslov putovanja
    imageURL: "", // URL slike putovanja
    description: "", // Opis putovanja
  });

  const history = useNavigate(); // Inicijalizacija hook-a za navigaciju
  const { id } = useParams(); // Dohvatanje ID parametra iz URL-a

  useEffect(() => {
    // Funkcija za dohvatanje podataka o putovanju po ID-u
    const fetchData = async () => {
      try {
        // Slanje GET zahtjeva na server da se dohvate podaci
        const response = await axios.get(`http://localhost:8081/travels/${id}`);
        // Postavljanje dobijenih podataka u stanje
        setFormData({
          title: response.data[0].title,
          imageURL: response.data[0].imageURL,
          description: response.data[0].description,
        });
      } catch (error) {
        console.log(error); // Ispisivanje greške u konzolu
      }
    };

    fetchData(); // Pozivanje funkcije za dohvatanje podataka
  }, [id]); // Efekt će se pokrenuti kad se ID promijeni

  // Funkcija za rukovanje promjenama unosa u formi
  const handleChange = (e) => {
    const { name, value } = e.target; // Dohvatanje imena i vrijednosti iz događaja
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Ažuriranje stanja forme
    }));
  };

  // Funkcija za rukovanje podnošenjem forme
  const submitForm = async (e) => {
    e.preventDefault(); // Sprečavanje zadane akcije podnošenja forme
    await axios.patch(`http://localhost:8081/travels/${id}`, formData); // Slanje PATCH zahtjeva na server sa ažuriranim podacima
    history("/home"); // Navigacija na početnu stranicu nakon uspješnog slanja podataka
  };

  return (
    <div className="container w-50 mt-5"> {/* Kontejner za formu sa Bootstrap klasama za stilizaciju */}
      <form onSubmit={submitForm}> {/* Postavljanje funkcije submitForm kao handler za podnošenje forme */}
        <div className="form-outline mb-4"> {/* Kontejner za unos naslova */}
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange} // Pozivanje handleChange funkcije prilikom promjene unosa
          />
          <label className="form-label" htmlFor="form5Example1">
            Naslov
          </label>
        </div>

        <div className="form-outline mb-4"> {/* Kontejner za unos URL slike */}
          <input
            type="text"
            className="form-control"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange} // Pozivanje handleChange funkcije prilikom promjene unosa
          />
          <label className="form-label" htmlFor="form5Example2">
            URL slike
          </label>
        </div>

        <div className="form-outline mb-4"> {/* Kontejner za unos opisa */}
          <textarea
            type="text"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange} // Pozivanje handleChange funkcije prilikom promjene unosa
          />
          <label className="form-label" htmlFor="form5Example2">
            Deskripcija
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Ažuriranje {/* Dugme za podnošenje forme */}
        </button>
      </form>
    </div>
  );
};

export default EditTravel; // Izvoz komponente za korištenje u drugim dijelovima aplikacije
