const { io } = require("../index");
const Band = require("../models/band.model");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Heroes del silencio"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Guns N' Roses"));

console.log(bands);

io.on("connection", (client) => {
  console.log("Client connected...");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });

  client.on("message", (payload) => {
    console.log(payload);
    io.emit("message", { admin: payload });
  });

  client.on("send-message", (payload) => {
    console.log(payload);
    client.broadcast.emit("message", { payload });
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

    client.on("add-band", (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit("active-bands", bands.getBands());
    });

    client.on("delete-band", (payload) => {
        bands.deleteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });

});
