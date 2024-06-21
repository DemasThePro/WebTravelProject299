import axios from "axios"; // biblioteka za HTTP zahtjeve
import { useEffect, useState } from "react"; // hook za korištenje stanja i efekata u React-u
import Travels from "./Travels"; // komponenta Travels

const Home = () => {
  const [travels, setTravel] = useState([]); // Definisanje stanja za pohranjivanje podataka o putovanjima

  useEffect(() => {
    // Funkcija za dohvatanje podataka o putovanjima sa servera
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/travels"); // Slanje GET zahtjeva na server
        setTravel(response.data); // Postavljanje dobijenih podataka u stanje
      } catch (error) {
        console.log(error); // Ispisivanje greške u konzolu
      }
    };
    getData(); // Pozivanje funkcije za dohvatanje podataka
  }, []); // Efekt će se pokrenuti samo jednom nakon inicijalnog renderiranja komponente

  // Provjera da li ima putovanja za prikazivanje
  if (travels.length === 0) {
    return (
      <div className="mx-auto mt-5 text-center">
        Nema objava za prikazivanje, molimo Vas da obavjestite admine kako bi dodali putovanja! {/* Poruka koja se prikazuje ako nema putovanja */}
      </div>
    );
  }

  return (
    <div className="container m-auto row row-cols-1 row-cols-md-3 g-4 mt-2 w-100">
      {travels.map((n) => (
        <div key={n.id}>
          <Travels data={n} /> {/* Renderovanje komponente Travels za svako putovanje */}
        </div>
      ))}
    </div>
  );
};

export default Home; // Izvoz komponente za korištenje u drugim dijelovima aplikacije
