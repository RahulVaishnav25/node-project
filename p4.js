const fs = require("fs");
const express = require("express");
const moment = require("moment");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  try {
    const data = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Date</title>
        </head>
        
        <body>
            <center>
                <form action="/" method="post">
                    <table>
                        <tr>
                            <td>
                                <h2>Enter Date</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name="date" id="date">
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <input type="submit" value="Download Data">
                            </td>
                        </tr>
                    </table>
                </form>
            </center>
        </body>
        </html>
        `;
    res.setHeader("Content-type", "text/html");
    res.end(data);
  } catch (error) {
    res.end(error);
  }
});

app.post("/", async (req, res) => {
  const startDayOfMonth = moment(moment(req.body.date).startOf("month")).format(
    "dddd"
  );
  const endDayOfMonth = moment(moment(req.body.date).endOf("month")).format(
    "dddd"
  );
  const startDayOfYear = moment(moment(req.body.date).endOf("year")).format(
    "dddd"
  );
  const endDayOfYear = moment(moment(req.body.date).endOf("year")).format(
    "dddd"
  );
  const records = [
    {
      date: req.body.date,
      startDayOfMonth: moment(moment(req.body.date).startOf("month")).format(
        "dddd"
      ),
      endDayOfMonth: moment(moment(req.body.date).endOf("month")).format(
        "dddd"
      ),
      startDayOfYear: moment(moment(req.body.date).endOf("year")).format(
        "dddd"
      ),
      endDayOfYear: moment(moment(req.body.date).endOf("year")).format("dddd"),
    },
  ];
  const json2csv = require("json2csv").parse;
  const csvString = json2csv(records);
  res.setHeader("Content-disposition", "attachment; filename=data.csv");
  res.set("Content-Type", "text/csv");
  res.status(200).send(csvString);
});
//   res.status(200);
//   res.setHeader("Content-Type", "application/json");
//   res.send({ startDayOfYear, endDayOfYear, startDayOfMonth, endDayOfMonth });
// });
const port = parseInt(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
