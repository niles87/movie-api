SELECT reviews.review, reviews.movie_id, movies.movie_name AS movie
FROM movies
left JOIN reviews 
ON movies.id =reviews.movie_id
ORDER BY movies.movie_name;