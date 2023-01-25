const express = require("express");
const app = express();
const mysql = require("mysql2");
const BP = require("body-parser");
const cors = require("cors");
const port = 4000;

//handles parsing JSON data from frontend
app.use(BP.json());
app.use(cors());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"pokemon",
    database:"spades"
})

var message = "Inserted";
    

app.post("/sca", (req, res) =>{
    const {ID, First_Name, Last_Name, Age, Gender, Phone_Number, Email_Address, Birth_Date, Birth_Place, School, Work_Place, Facebook, Twitter, Instagram} = req.body;
    let x = 0;
    con.query("SELECT * FROM userData", (err, results) => {

        while (x < results.length)
        {
             if (results[x].FirstName == First_Name && results[x].LastName == Last_Name &&
                results[x].Age == Age && results[x].Gender == Gender &&
                results[x].PhoneNumber == Phone_Number && results[x].EmailAddress == Email_Address &&
                results[x].BirthDate == Birth_Date && results[x].BirthPlace == Birth_Place &&
                results[x].School == School && results[x].WorkPlace == Work_Place &&
                results[x].Facebook == Facebook && results[x].Twiiter == Twitter &&
                results[x].Instagram == Instagram)
                {

                    message = "This data already exist";
                    console.log(message)
                    break;
                }
            else
            {
                message = "Inserted";
                console.log(message)            
            }
            x += 1; }

        if(message == "Inserted"){

            con.query("INSERT INTO userData VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [ID, First_Name, Last_Name, Age, Gender, Phone_Number, Email_Address, Birth_Date, Birth_Place, School, Work_Place, Facebook, Twitter, Instagram],
            (err, results) => {
            res.json(JSON.stringify(message));       
             })
        }
        else
        {
            res.json(JSON.stringify(message));
        }
   })
    
})



app.get("/sca", (req, res) =>{
    res.json(JSON.stringify(message));
})


app.listen(port, "192.168.0.101", () => {
    console.log(`The server is running smoothly on port ${port}`);
})
