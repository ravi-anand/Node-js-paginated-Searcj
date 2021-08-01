const express = require("express");

const bodyParser = require("body-parser");

// lading json data
const universities = require("./universities.json");

const app = express();
const port = 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ===============================================//
const books = [
  { title: "Harry Potter", id: 1 },
  { title: "Twilight", id: 2 },
  { title: "Lorien Legacies", id: 3 },
];

//READ Request Handlers
app.get("/", (req, res) => {
  res.send("University Search API!!");
});

app.get("/api/universities", (req, res) => {
  console.log("get");
  try {
    const filters = req.query;
    let limit = 20;
    let skip = 0;
    if (filters.limt && filters.skip) {
      limit = filters.limt;
      skip = filters.skip;
    }
    const paginatedData = universities.slice(skip, skip + limit);
    return res.status(200).json({
      success: true,
      data: {
        result: universities,
        limit: limit,
        start: skip + 1,
      },
    });
  } catch (error) {
    res.status(500).send();
  }
});

//CREATE Request Handler
app.post("/api/universities", (req, res) => {
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const University = {
    alpha_two_code: req.body.alpha_two_code,
    country: req.body.country,
    domain: req.body.domain,
    name: req.body.name,
    web_page: req.body.web_page,
  };
  universities.push(University);
  return res.status(200).json({
    success: true,
    data: {
      result: universities,
    },
  });
});

//UPDATE Request Handler
app.put("/api/universities/:name_update", (req, res) => {
  const university = universities.find((c) => c.name === req.params.name_update);
  if (!university)
    res
      .status(404)
      .send(
        'Not Found!!'
      );

      console.log(req.body.name);

  university.name = req.body.name;
  res.send(university);
});

//DELETE Request Handler
app.delete("/api/universities/", (req, res) => {
    
  const university = universities.find((c) => c.name === req.query.name);
  if (!university)
    res
      .status(404)
      .send(
        'Not Found!!'
      );

  const index = universities.indexOf(university);
  universities.splice(index, 1);

  res.send(university);
});



// Search API path:: /api/search
// request.body {limit: integer, skip: integer, name: name of university, country_code: country code, domain: domain}
app.use("/api/search", async (req, res) => {
  console.log("in search");
  try {
    var filteredData = universities;
    const filters = req.query;

    // filter based on name
    if (filters.name) {
      filteredData = filteredData.filter((data) => {
        return data.name.includes(filters.name);
      });
    }

    // filter based on country code
    if (filters.country_code) {
      filteredData = filteredData.filter((data) => {
        return data.alpha_two_code === filters.country_code;
      });
    }

    // filter based on domain
    if (filters.domain) {
      filteredData = filteredData.filter((data) => {
        return data.domain.endsWith(filters.domain);
      });
    }

    const paginatedData = filteredData.slice(
      filters.skip,
      filters.skip + filters.limit
    );

    return res.status(200).json({
      success: true,
      data: {
        result: paginatedData,
        limit: filters.limit,
        start: filters.skip + 1,
      },
    });
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Application is listening at port ${port}`);
});
