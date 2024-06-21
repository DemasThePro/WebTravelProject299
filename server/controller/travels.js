import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Samed299", 
    database: "db_299",
});

export const getTravels = async (req, res) =>{
     connection.query("SELECT * FROM travels", (err, data) =>{
        if(err){
            console.log(err);
            return;
        }
        res.status(200).send(data);
    });
};

export const getOneTravel = async (req, res) =>{
    const id = req.params.id;
    if(!id){
        return;
    }
     connection.query(
        "SELECT * FROM travels WHERE travels.id = ?",
        [id],
        (err, data) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(200).send(data);
        }
    );
};

export const postTravel = async (req, res) =>{
    if(!req.body){
        return;
    }
    const title = req.body.title;
    const description = req.body.description;
    const imageURL = req.body.imageURL;

     connection.query(
        "INSERT INTO travels(title, description, imageURL) VALUES(?,?,?)",
        [title, description, imageURL],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(201).json({status: "success", message: "Travel Created!"});
        }
    );
};

export const deleteTravel = async (req, res) =>{
    const id = req.params.id;
    if(!id){
        return;
    }
     connection.query(
        "DELETE FROM comments WHERE travelsId = ?",
        [parseInt(id)],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
        }
    );

     connection.query(
        "DELETE FROM travels WHERE id = ?",
        [parseInt(id)],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(200).json({status: "success", message: "Travel Deleted!"});
        }
    );
};

export const updateTravel = async (req, res) =>{
    if(!req.body){
        return;
    }
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

     connection.query(
        "UPDATE travels SET title = ?, description = ? WHERE id = ? ",
        [title, description, id],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(201).json({status: "success", message: "Travel Updated!"});
        }
    );
};

export const getComments = async (req, res) =>{
    const id = req.params.id;
     connection.query(
        "SELECT comments.id, comments.comment, users.username FROM comments INNER JOIN users ON comments.userId = users.id WHERE comments.travelsId = ?",
        [id],
        (err, data) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(200).send(data);
        }
    );
};

export const postComment = async (req, res) =>{
    if(!req.body){
        return;
    }
    const comment = req.body.comment;
    const travelsId = req.body.travelsId;
    const userId = req.body.userId;

     connection.query(
        "INSERT INTO comments(comment, travelsId, userId) VALUES(?, ?, ?)",
        [comment, travelsId, userId],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(201).json({status: "success", message: "Comment Added!"});
        }
    );
};

export const deleteComment = async (req, res) =>{
    const id = req.params.id;
    if(!id){
        return;
    }

     connection.query(
        "DELETE FROM comments WHERE id = ?",
        [parseInt(id)],
        (err, data, fields) =>{
            if(err){
                console.log(err);
                return;
            }
            res.status(201).json({status: "success", message: "Comment Deleted!"});
        }
    );
};