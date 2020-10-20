const axios = require("axios");
var cloudinary = require("cloudinary");

module.exports = (app) => {
  app.get("/api/images/all_folders", async (req, res) => {
    var folders = [];
    var coverIds = [];
    var coverUrls = [];
    var resArray = [];

    await cloudinary.v2.api.sub_folders("gallery", function (error, result) {
      //console.log(result);
      folders = result.folders;
    });

    console.log("Folders!");
    console.log(folders);

    for await (const element of folders) {
      //console.log(element.name);

      const cover = await cloudinary.v2.search
        .expression(`folder:gallery/${element.name}`)
        .sort_by("public_id", "desc")
        .max_results(1)
        .execute();

      console.log("COVER");
      console.log(cover);
      coverIds.push(cover.resources[0].public_id);
      coverUrls.push(cover.resources[0].url);
    }

    /*
    .then((result) => {
      console.log("INSIDE THEN")
      covers.push(result.resources[0].public_id)
      console.log(covers);
      //res.send(resArray);
    });
    */

    var jsonRes = [];

    for (let index = 0; index < folders.length; index++) {
      const arrContent = [];
      arrContent.push(folders[index].name);
      arrContent.push(coverIds[index]);
      resArray.push(arrContent);

      jsonRes.push({
        name: folders[index].name,
        coverId: coverIds[index],
        coverUrl: coverUrls[index],
      });
    }

    console.log("JSON-JSON-JSON");
    console.log(jsonRes);

    console.log("ForEach ends");
    console.log(resArray);
    console.log("FOLDERS");
    console.log(folders);
    console.log("COVERS");
    console.log(coverIds);
    console.log("Responce");
    console.log(resArray);

    res.send(jsonRes);
  });

  app.get("/api/images/:album", async (req, res) => {
    var jsonRes = [];
    const { album } = req.params;


    console.log(album);
    console.log("HEYHEYHEY IT DID WORK FINALLY!!!");

    await cloudinary.v2.search
      .expression(`folder:gallery/${album}`)
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute()
      .then((resImages) => {
        console.log(resImages.resources);

        for (let index = 0; index < resImages.resources.length; index++) {
          jsonRes.push({ src: resImages.resources[index].url, thumbnail: resImages.resources[index].url });
        }
       
        res.send(jsonRes);
      });
  });
};
