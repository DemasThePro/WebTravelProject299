import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Travels = ({data}) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const location = useLocation();
    const history = useNavigate();

    useEffect(() =>{
        setUser(JSON.parse(localStorage.getItem("user")));
    }, [location]);

    const deleteTravel = async () =>{
        await axios.delete(`http://localhost:8081/travels/${data.id}`);
        history();
    };

    return (

        <div className="col">
          <div className="card shadow-lg">
            <img
              src={data.imageURL}
              className="card-img-top"
              style={{ height: "280px", cursor: "pointer" }}
              alt="..."
              onClick={() => history(`/home/${data.id}`)}
            />
            <div className="card-body">
              <h4 className="card-title">{data.title}</h4>
              <div className="mt-2 d-flex flex-row justify-content-between">
                {user.role === "admin" ? (
                  <>
                    <button
                      className="btn btn-outline-primary buttons"
                      onClick={() => {
                        history(`/home/edit/${data.id}`);
                      }}
                    >
                      Uredite
                    </button>
                    <button className="btn btn-outline-danger" onClick={deleteTravel}>
                      Izbrišite
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default Travels;