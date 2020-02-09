const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());


const customers= [
    {id:1, firstName:"Rudy", lastName:"Chakhtoura"},
    {id:2, firstName:"Tina", lastName:"Mechleb"},
    {id:3, firstName:"Basem", lastName:"Kreidly"},
];

app.get('/api/customers', (req,res)=>{

    res.json(customers);
});

app.get("/api/customers/add?", (req, res) => {

    const id = req.query.id;
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    let errors = [];
  if (!id) {
    errors.push({
      status: 403,
      error: true,
      message: "you cannot create a customer without providing an id"
    });
  } else if (!firstName) {
    errors.push({
      status: 403,
      error: true,
      message: "you cannot create a customer without providing a firstName"
    });
  } else if (!id.match(/^-{0,1}\d+$/)) {
    errors.push({
      status: 403,
      error: true,
      message: "id should be a number"
    });
  } else if (parseInt(firstName) || parseInt(lastName)) {
    errors.push({
      status: 403,
      error: true,
      message: "first name and last name should be a string"
    });
  }

  if (errors.length > 0) {
    res.json({ status: 403, error: true, message: errors });
  } else {
    customers.push({ id: id, firstName: firstName, lastName: lastName });
    res.json({ id: id, firstName: firstName, lastName: lastName });
  }
});

   

  




const port = 5000;

app.listen(port, ()=> {
    console.log(`Server listen on port ${port}`)
});
