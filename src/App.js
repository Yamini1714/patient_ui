import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PrimarySearchAppBar from "./LAYOUT/PrimarySearchAppBar";
import Home from "./PAGES/Home";
import AddPatient from "./USERS/AddPatient";
import EditPatient from "./USERS/EditPatient";
import ViewPatient from "./USERS/ViewPatient";

function App() {
  return (
    <div >
      <Router>
      <PrimarySearchAppBar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/addpatient' element={<AddPatient/>}/>
          <Route exact path='/editpatient/:id' element={<EditPatient/>}/>
          <Route path="/viewpatient/:id" element={<ViewPatient />} />
        </Routes>
    
      </Router>
      
    </div>
  
    
  );
}

export default App;
