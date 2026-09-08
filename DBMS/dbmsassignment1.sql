SELECT f.title
FROM film f
JOIN film_category fc
    ON f.film_id = fc.film_id
JOIN category c
    ON fc.category_id = c.category_id
WHERE f.rating = 'PG-13'
  AND c.name = 'Comedy';
  
  SELECT f.title, COUNT(r.rental_id) AS rental_count
FROM film f
JOIN film_category fc
    ON f.film_id = fc.film_id
JOIN category c
    ON fc.category_id = c.category_id
JOIN inventory i
    ON f.film_id = i.film_id
JOIN rental r
    ON i.inventory_id = r.inventory_id
WHERE c.name = 'Horror'
GROUP BY f.film_id, f.title
ORDER BY rental_count DESC
LIMIT 3;


SELECT DISTINCT
    c.first_name,
    c.last_name
FROM customer c
JOIN address a
    ON c.address_id = a.address_id
JOIN city ci
    ON a.city_id = ci.city_id
JOIN country co
    ON ci.country_id = co.country_id
JOIN rental r
    ON c.customer_id = r.customer_id
JOIN inventory i
    ON r.inventory_id = i.inventory_id
JOIN film f
    ON i.film_id = f.film_id
JOIN film_category fc
    ON f.film_id = fc.film_id
JOIN category cat
    ON fc.category_id = cat.category_id
WHERE co.country = 'India'
  AND cat.name = 'Sports';
  
  
  SELECT DISTINCT
    c.first_name,
    c.last_name
FROM customer c
JOIN address a
    ON c.address_id = a.address_id
JOIN city ci
    ON a.city_id = ci.city_id
JOIN country co
    ON ci.country_id = co.country_id
JOIN rental r
    ON c.customer_id = r.customer_id
JOIN inventory i
    ON r.inventory_id = i.inventory_id
JOIN film f
    ON i.film_id = f.film_id
JOIN film_actor fa
    ON f.film_id = fa.film_id
JOIN actor ac
    ON fa.actor_id = ac.actor_id
WHERE co.country = 'Canada'
  AND ac.first_name = 'NICK'
  AND ac.last_name = 'WAHLBERG';
  
  
  SELECT COUNT(DISTINCT fa.film_id) AS number_of_movies
FROM actor a
JOIN film_actor fa
    ON a.actor_id = fa.actor_id
WHERE a.first_name = 'SEAN'
  AND a.last_name = 'WILLIAMS';