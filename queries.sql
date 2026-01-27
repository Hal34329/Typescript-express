-- INIT database
CREATE TABLE diary_entries (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  weather VARCHAR(20) NOT NULL,
  visibility VARCHAR(20) NOT NULL,
  comment TEXT -- 'TEXT' es como VARCHAR pero sin límite definido
);

-- INSERT de prueba (sin poner el ID, Postgres lo hace solo)
INSERT INTO diary_entries (date, weather, visibility, comment) 
VALUES ('2017-01-01', 'rainy', 'poor', 'Pretty scary flight, I''m glad I''m alive');
INSERT INTO diary_entries (date, weather, visibility, comment) 
VALUES ('2017-04-01', 'sunny', 'good', 'Everything went better than expected, I''m learning much');
INSERT INTO diary_entries (date, weather, visibility, comment) 
VALUES ('2017-04-15', 'windy', 'good', 'I''m getting pretty confident although I hit a flock of birds');
INSERT INTO diary_entries (date, weather, visibility, comment) 
VALUES ('2017-05-11', 'cloudy', 'good', 'I almost failed the landing but I survived');
-- New INSERTS
INSERT INTO diary_entries (date, weather, visibility, comment) 
VALUES ('2026-01-26', 'windy', 'ok', 'Weather Report, Wes Bluemarine, Dominic Pucci');

-- QUERY
SELECT * FROM diary_entries;