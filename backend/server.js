const express = require("express");
const app = express();
var cors = require("cors");

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:ub5r39y6")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});
app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    console.log(req.body);
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ub5r39y6",
    });
    console.log("needed__url: ", uploadResponse.secure_url);
    res.json({ msg: "yaya" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("listening on 4000");
});
