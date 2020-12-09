const axios = require("axios");
var cloudinary = require("cloudinary");

module.exports = (app) => {
  app.get("/api/images/all_folders", async (req, res) => {
    var folders = [];
    var coverIds = [];
    var coverUrls = [];
    var resArray = [];

    await cloudinary.v2.api.sub_folders("gallery", function (error, result) {
      folders = result.folders;
    });

    for await (const element of folders) {
      const cover = await cloudinary.v2.search
        .expression(`folder:gallery/${element.name}`)
        .sort_by("public_id", "desc")
        .max_results(1)
        .execute();

      coverIds.push(cover.resources[0].public_id);
      coverUrls.push(cover.resources[0].url);
    }

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

    res.send(jsonRes);
  });

  app.get("/api/images/:album", async (req, res) => {
    var jsonRes = [];
    const { album } = req.params;

    await cloudinary.v2.search
      .expression(`folder:gallery/${album}`)
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute()
      .then((resImages) => {
        for (let index = 0; index < resImages.resources.length; index++) {
          jsonRes.push({
            src: resImages.resources[index].url,
            thumbnail: resImages.resources[index].url,
            width: resImages.resources[index].width,
            height: resImages.resources[index].height,
          });
        }

        res.send(jsonRes);
      });
  });
};
