import React, { useEffect, useState } from "react";
import InputGroup from "../components/AkremComponents/InputGroupEvent";
import RowDetails from "../components/AkremComponents/RowDetailsEvent";
import axios from "axios";
import Alert from "../components/AkremComponents/Alert";
import { Input } from "reactstrap";
import { AddEvents, GetEvents } from "../redux/actions/eventActions";
import { useDispatch, useSelector } from 'react-redux'
import "./akremeventCss.css"

function Home() {
  const [users, setUsers] = useState([]);
  //const [form, setForm] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const errorsss = useSelector(state=>state.errors)
  const events = useSelector(state=>state.events)
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/Event", form)
      .then((res) => {
        setMessage(res.data.message);
        /* hide form after save */
        setForm({});
        /* hide errors after save */
        setErrors({});
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      })
      .catch((err) => setErrors(err.response.data));
  };

 
 //////////////////////////////////////////////////////////
 
 
 const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({  });
  const create = (event) => {
    event.preventDefault();
    window.location.reload();
    const formData = new FormData();
    formData.append('image', selectedFile);
    for (let key in form) {
      formData.append(key, form[key]);
    }
   
  dispatch(AddEvents(form, setShow, setMessage))
  };
 
 const handleChange = (event) => {
  const { value } = event.target;
  console.log(event);
  setForm({
    ...form,
    Nom: value,
  });
}

const handleDateChange = (event) => {
  const { value } = event.target;
  console.log(event);
  setForm({
    ...form,
    Date: value,
  });
}


const handleArtistesChange = (event) => {
  const { value } = event.target;
  console.log(event);
  setForm({
    ...form,
    Artistes: value,
  });
}

const handleLienChange = (event) => {
  const { value } = event.target;
  console.log(event);
  setForm({
    ...form,
    Lien: value,
  });
}


////////////////////////////////////////





  
  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this user")) {
      axios.delete(`/api/Event/${id__}`).then((res) => {
        setMessage(res.data.message);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      });
    }
  };
  /* find all users */
  // useEffect(async () => {
  //   await axios.get("/api/Event").then((res) => {
  //     setUsers(res.data);
  //   });
  // }, []);
  useEffect( ()=>{
   
    async function fetchData(){
     await dispatch(GetEvents())
 
  }
  
  fetchData();


  // form.map(({ Nom, Date, Artistes, Lien, _id }) => (
  //   <RowDetails
  //     Nom={Nom}
  //     Date={Date}
  //     Artistes={Artistes}
  //     Lien={Lien}
  //     Id={_id}
  //     OnDelete={OnDelete}
  //   />
  // ));
   },[])



  const loadEvents = async () => {
    await axios.get("/api/Event").then((res) => {
      setUsers(res.data);
    });
  };

  return (
    <div className="row p-4">
      <Alert message={message} show={show} />
      <div className="mt-4">
        <h2> Events</h2>
      </div>
      <div className="col-12 col-lg-4">
        
                <h5 >Nom</h5>
                <Input value={form.Nom} onChange={handleChange} id="titre" type="text" placeholder="nom" />
                
                <h5 >Date</h5>
                <Input value={form.Date} onChange={handleDateChange} id="desc" type="text" placeholder="date" />
                
                <h5 >Artistes</h5>
                <Input value={form.Artistes} onChange={handleArtistesChange} id="desc" type="text" placeholder="artist" />
                <h5 >Lien</h5>
                <Input value={form.Lien} onChange={handleLienChange} id="desc" type="text" placeholder="lien" />
                <h5 >Image</h5>
                <div class="ta-left mT10">
                  <Input
                    value={form.image}
                    onChange={(e) => {
                      
                      setSelectedFile(e.target.files[0]);
                      console.log(e.target.files[0])
                    }} type="file" />
                </div>

                <button  className="button-62" onClick={create}   type="submit">
            Add Events 
          </button>

          
















      </div>
      <div className="col-12 col-lg-7">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Date</th>
              <th scope="col">Artistes</th>
              <th scope="col">Lien</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.events.map(({ Nom, Date, Artistes, Lien, _id }) => (
              <RowDetails
                Nom={Nom}
                Date={Date}
                Artistes={Artistes}
                Lien={Lien}
                Id={_id}
                OnDelete={OnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      
    </div>
    
  );
}

export default Home;
