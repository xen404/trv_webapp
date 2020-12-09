module.exports = (app) => {
    app.get("/api/pdf_houserules", async (req, res) => {
        res.download('./DocumentsForDownload/HouseRules.pdf', 'HouseRules.pdf');
      });


      app.get("", async (req, res) => {
        res.download('./DocumentsForDownload/Formular.pdf', 'Formular.pdf');
      });
}