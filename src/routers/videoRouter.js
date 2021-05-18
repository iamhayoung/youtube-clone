import express from "express";

const videoRouter = express.Router();

const handleWatchVideo = (req, res) => res.send("Watch video");

videoRouter.get("/watch", handleWatchVideo);

export default videoRouter;