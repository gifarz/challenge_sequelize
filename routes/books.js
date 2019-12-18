var model = require("../models/index");

module.exports = function(app) {
  /* GET book listing. */
  app.get("/books", function(req, res, next) {
    model.Book.findAll({})
      .then(books =>
        res.json({
          error: false,
          data: books
        })
      )
      .catch(error =>
        res.json({
          error: true,
          data: [],
          error: error
        })
      );
  });

  /* GET by ID book listing. */
  app.get("/books/:id", function(req, res, next) {
    const book_id = req.params.id
      model.Book.findOne({
         where: {
            id : book_id
            }
      })
      .then(books => {
            if(books){
                   res.json({
                      error: false,
                      data: books
                  })
            } else {
                  res.json({
                      error: true,
                      data: "not found"
                  })
            }
      })

      .catch(error =>
        res.json({
          error: true,
          data: [],
          error: error
        })
      );
  });

  /* POST book. */
  app.post("/books", function(req, res, next) {
    const { title, author, pages, language } = req.body;
    model.Book.create({
      title: title,
      author: author,
      pages: pages,
      language: language
    })
      .then(book =>
        res.status(201).json({
          error: false,
          data: book,
          message: "New book has been created."
        })
      )
      .catch(error =>
        res.json({
          error: true,
          data: [],
          error: error
        })
      );
  });

  /* update book. */
  app.put("/books/:id", function(req, res, next) {
    const book_id = req.params.id;

    const { title, author, pages, language } = req.body;

    model.Book.update(
      {
        title: title,
        author: author,
        pages: pages,
        language: language
      },
      {
        where: {
          id: book_id
        }
      }
    )
      .then(book =>
        res.json({
          error: false,
          message: "book has been updated."
        })
      )
      .catch(error =>
        res.json({
          error: true,
          error: error
        })
      );
  });

  /* GET book listing. */
  /* Delete book. */
  app.delete("/books/:id", function(req, res, next) {
    const book_id = req.params.id;

    model.Book.destroy({
      where: {
        id: book_id
      }
    })
      .then(books => {
      if(books) {
        res.json({
          error: false,
          message: "Book has been delete."
        })
      } else {
         res.json({
            error: true,
            message: "Book not found"
         })
      }})
      .catch(error =>
        res.json({
          error: true,
          error: error
        })
      );
  });
};