import axios from "axios"; 
import { useState } from "react"; // hook-a za korištenje stanja u React-u
import { useNavigate } from "react-router-dom"; // hook-a za navigaciju

const EditTravel = () => {
    // Definisanje stanja za formu sa početnim vrijednostima
    const [formData, setFormData] = useState({
        title: "", // Naslov putovanja
        imageURL: "", // URL slike putovanja
        description: "", // Opis putovanja
    });

    const history = useNavigate(); // Inicijalizacija hook-a za navigaciju

    // Funkcija koja se poziva prilikom podnošenja forme
    const submitForm = async (e) => {
        e.preventDefault(); // Sprečavanje zadane akcije podnošenja forme
        await axios.post(`http://localhost:8081/travels`, formData); // Slanje POST zahtjeva sa podacima forme na server
        history("/home"); // Navigacija na početnu stranicu nakon uspješnog slanja podataka
    };

    return (
        <div className="container w-50 mt-5"> {/* Kontejner za formu sa Bootstrap klasama za stilizaciju */}
          <form onSubmit={submitForm}> {/* Postavljanje funkcije submitForm kao handler za podnošenje forme */}
            <div className="form-outline mb-4"> {/* Kontejner za unos naslova */}
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value }) // Ažuriranje stanja forme prilikom promjene unosa
                }
              />
              <label className="form-label" htmlFor="form5Example1">
                Naslov
              </label>
            </div>
    
            <div className="form-outline mb-4"> {/* Kontejner za unos URL slike */}
              <input
                type="text"
                className="form-control"
                value={formData.imageURL}
                onChange={(e) =>
                  setFormData({ ...formData, imageURL: e.target.value }) // Ažuriranje stanja forme prilikom promjene unosa
                }
              />
              <label className="form-label" htmlFor="form5Example2">
                URL slike
              </label>
            </div>
    
            <div className="form-outline mb-4"> {/* Kontejner za unos opisa */}
              <textarea
                type="text"
                className="form-control"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value }) // Ažuriranje stanja forme prilikom promjene unosa
                }
              />
              <label className="form-label" htmlFor="form5Example2">
                Deskripcija
              </label>
            </div>
    
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Dodaj {/* Dugme za podnošenje forme */}
            </button>
          </form>
        </div>
      );

};

export default EditTravel; // Izvoz komponente za korištenje u drugim dijelovima aplikacije
