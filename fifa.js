const express = require('express');
const fifa = express();
const port = 8080;

const joi = require('joi')

fifa.use(express.json());



///////////// CRUD /////////////

let players = [
    {name: "Mo.Salah",   state: "Egypt",       club:"Liverpool", number:"11", /*age:"30",*/ id:1},
    {name: "H.Elliott",  state: "England",     club:"Liverpool", number:"19", /*age:"20",*/ id:2},
    {name: "S.Bajcetic", state: "Spain",       club:"Liverpool", number:"43", /*age:"19",*/ id:3},
    {name: "V.van Dijk", state: "Netherlands", club:"Liverpool", number:"4",  /*age:"32",*/ id:4},
    {name: "D.Nunez",    state: "Uruguay",     club:"Liverpool", number:"27", /*age:"24",*/ id:5},
    {name: "A.Backar",   state: "Brazil",      club:"Liverpool", number:"1",  /*age:"31",*/ id:6},
    {name: "K.Gakpo",    state: "Netherlands", club:"Liverpool", number:"18", /*age:"24",*/ id:7},
    {name: "L.Diaz",     state: "Colombia",    club:"Liverpool", number:"23", /*age:"26",*/ id:8},
];

////////////////// Get //////////

fifa.get("/", (req,res)=>{
    res.send("Hello");
});

fifa.get("/content", (req,res)=>{
    res.send(players);
});

fifa.get("/player/:id/", (req,res)=>{
    const player = players.filter((val)=>{
        return val.id === +req.params.id;
    })[0];
    res.send(player);
});

//////////////  Post //////////////

fifa.post("/cre", (req,res)=>{
    const length = players.length;

    // if(!req.body.name && !req.body.state && !req.body.club){
    //     res.status(403).send("Error name or state  or club validation is not true");
    //     return;
    // }

    // if(typeof !req.body.name && !req.body.state && !req.body.club !== "string"){
    //     res.status(403).send("Error  validation is not true. must have string");
    //     return;
    // }

    // if(typeof req.body.number == "number"){
    //     res.status(403).send("Error number validation is not true. must have number");
    //     return;
    // }



    const player = {
        name: req.body.name,
        state: req.body.state,
        club: req.body.club,
        number: req.body.number,
        id: length + 1,
    };

    const schema = joi.object({
        name: joi.string().min(3).max(25).required(),
        state: joi.string().min(4).max(20).required(),
        club : joi.string().min(4).max(20).required(),
        number: joi.number().required(),
    });

    const result = schema.validate(req.body);

    if(result.error){
        res.send(result.error.message)
    }

    players.push(player);
    res.status(200).send("Player club safiga qo`shildi!");
});

////////////// Put //////////

fifa.put("/ply/put/:id", (req,res)=>{
    let put = players.findIndex((player) => player.id === +req.params.id);

    let player = players[put];

    player.name = req.body.name || player.name;
    player.state = req.body.state || player.state;
    player.club = req.body.club || player.club;
    player.number = req.body.number || player.number;

    players[put] = player;

    res.status(200).send("player ma`lumotlari o`zgartirildi!");
});

////////// Delete //////////

fifa.delete("/ply/rem/:id", (req,res) => {
    players = players.filter((player) => {
        return player.id !== +req.params.id;
    });

    res.send("Player club safidan ketti!");
});

fifa.listen(port, () => {
    console.log("Server ishlamoda " + port);
});

