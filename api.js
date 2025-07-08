const token = require("./createJWT.js");

exports.setApp = function (app, client) {
  app.post("/api/login", async (req, res) => {
    const { login, password } = req.body;
    const db = client.db("pockProf");
    const results = await db.collection("Users").find({ Login: login, Password: password }).toArray();

    if (results.length > 0) {
      const { UserId, FirstName, LastName } = results[0];
      try {
        const jwt = token.createToken(FirstName, LastName, UserId);
        res.status(200).json(jwt);
      } catch (e) {
        res.status(200).json({ error: e.message });
      }
    } else {
      res.status(200).json({ error: "Login/Password incorrect" });
    }
  });

  app.post("/api/addcard", async (req, res) => {
    const { userId, card, jwtToken } = req.body;
    try {
      if (token.isExpired(jwtToken)) return res.status(200).json({ error: "The JWT is no longer valid", jwtToken: "" });
    } catch (e) {
      console.log(e.message);
    }

    const db = client.db("pockProf");
    let error = "";
    try {
      await db.collection("Cards").insertOne({ Card: card, UserId: userId });
    } catch (e) {
      error = e.toString();
    }

    let refreshedToken = token.refresh(jwtToken);
    res.status(200).json({ error, jwtToken: refreshedToken });
  });

  app.post("/api/searchcards", async (req, res) => {
    const { userId, search, jwtToken } = req.body;
    try {
      if (token.isExpired(jwtToken)) return res.status(200).json({ error: "The JWT is no longer valid", jwtToken: "" });
    } catch (e) {
      console.log(e.message);
    }

    let resultsList = [];
    let error = "";
    try {
      const db = client.db("pockProf");
      const results = await db.collection("Cards").find({
        Card: { $regex: search.trim() + ".*", $options: "i" }
      }).toArray();
      resultsList = results.map(r => r.Card);
    } catch (e) {
      error = e.toString();
    }

    let refreshedToken = token.refresh(jwtToken);
    res.status(200).json({ results: resultsList, error, jwtToken: refreshedToken });
  });
};