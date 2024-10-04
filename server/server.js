// server.js
const express = require("express");
const si = require("systeminformation");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/metrics", async (req, res) => {
  try {
    const cpuData = await si.currentLoad();
    const gpuData = await si.graphics();

    const metrics = {
      cpuUsage: cpuData.currentLoad,
      gpuUsage: gpuData.controllers.length
        ? gpuData.controllers[0].utilizationGpu
        : 0,
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).send("Error fetching metrics");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
