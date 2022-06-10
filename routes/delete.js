const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;

  req.app.locals.con.connect((error) => {
    if (error) {
      console.log("error", error);
    }
    let sql = `UPDATE documents SET softDelete = 1 WHERE id = ${id}`;

    req.app.locals.con.query(sql, (error, result) => {
      if (error) {
        console.log("error", error);
      }
      res.json(result);
    });
  });
});

module.exports = router;
