import express from "express"
import {
    getTravels,
    postTravel,
    getOneTravel,
    deleteTravel,
    updateTravel,
    getComments,
    postComment,
    deleteComment
} from "../controller/travels.js"

const router = express.Router();

router.get("/", getTravels);
router.post("/", postTravel);
router.get("/:id", getOneTravel);
router.delete("/:id", deleteTravel);
router.patch("/:id", updateTravel);
router.get("/comments/:id", getComments);
router.post("/comments", postComment);
router.delete("/comments/:id", deleteComment);

export default router;