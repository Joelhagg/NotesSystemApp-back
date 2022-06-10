const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("nu körs /");
  req.app.locals.con.connect((error) => {
    if (error) {
      console.log("error", error);
    }
    let sql = `SELECT * FROM documents WHERE softDelete IS NULL `;
    req.app.locals.con.query(sql, (error, result) => {
      if (error) {
        console.log("error", error);
      }
      res.json(result);
    });
  });
});

router.get("/edit/:id", (req, res) => {
  console.log("nu körs /edit:id");
  console.log(req.params.id);
  req.app.locals.con.connect((error) => {
    if (error) {
      console.log("error", error);
    }
    let sql = `SELECT * FROM documents WHERE id = "${req.params.id}"`;
    req.app.locals.con.query(sql, (error, result) => {
      if (error) {
        console.log("error", error);
      }
      res.json(result);
    });
  });
});

router.post("/edit", (req, res) => {
  console.log("nu körs /edit");
  console.log(req.body);
  req.app.locals.con.connect((error) => {
    if (error) {
      console.log("error", error);
    }
    let header = req.body.header;
    let textContent = req.body.textContent;
    let lastChanged = req.body.lastChanged;

    let sql = `UPDATE documents SET header = '${header}', textContent = '${textContent}', lastChanged = '${lastChanged}' WHERE id = ${req.body.id} `;

    req.app.locals.con.query(sql, (error, result) => {
      if (error) {
        console.log("error", error);
      }
      res.json(result);
    });
  });
});

module.exports = router;
