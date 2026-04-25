var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', { title: 'Home' });
});

/* Menu page */
router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Menu' });
});

/* About page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

/* Comments page */
router.get('/comments', function(req, res, next) {
  req.db.query('SELECT * FROM comments ORDER BY created_at DESC;', (err, results) => {
    if (err) {
      console.error('Error fetching comments:', err);
      return res.status(500).send('Error loading comments');
    }

    res.render('comments', {
      title: 'Customer Comments',
      comments: results
    });
  });
});


/* Add new customer comment */
router.post('/comments', function(req, res, next) {
  const name = req.body.name ? req.body.name.trim() : '';
  const comment = req.body.comment ? req.body.comment.trim() : '';

  //rerender page with validation message
  function showCommentError(message) {
    req.db.query('SELECT * FROM comments ORDER BY created_at DESC;', (err, results) => {
      if (err) {
        console.error('Error fetching comments after validation error:', err);
        return res.status(500).send('Error loading comments');
      }

      res.status(400).render('comments', {
        title: 'Customer Comments',
        comments: results,
        errorMessage: message,
        formData: { name, comment }
      });
    });
  }

  //Validation
  if (!name || !comment) {
    return res.status(400).send('Name and comment are required.');
  }

  //No long submissions please
  if (name.length > 100 || comment.length > 1001) {
    return res.status(400).send('Name or comment is too long.');
  }

  req.db.query(
    'INSERT INTO comments (name, comment) VALUES (?, ?);',
    [name, comment],
    (err, results) => {
      if (err) {
        console.error('Error adding comment:', err);
        return res.status(500).send('Error adding comment');
      }

      res.redirect('/comments');
    }
  );
});

router.post('/create', function (req, res, next) {
    const { task } = req.body;
    try {
      req.db.query('INSERT INTO todos (task) VALUES (?);', [task], (err, results) => {
        if (err) {
          console.error('Error adding todo:', err);
          return res.status(500).send('Error adding todo');
        }
        console.log('Todo added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/');
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).send('Error adding todo');
    }
});

router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM todos WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting todo:', err);
          return res.status(500).send('Error deleting todo');
        }
        console.log('Todo deleted successfully:', results);
        // Redirect to the home page after deletion
        res.redirect('/');
    });
    }catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Error deleting todo:');
    }
});

module.exports = router;