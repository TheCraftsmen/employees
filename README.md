django dumpdata test
======

for read the listings.db I used

```
python manage.py inspectdb > models.py
```

for testing purpose, I made the migration and made a new migrations folder called tests_migrations with the same 0001_inital content but i made a change in the CreateModel commented the managed = False if don't make this, I can't run the testcase.

And for generate the fixtures I run the next command.

```
python manage.py dumpdata listings.Listings > listings.json
```

After this I use this fixtures in the testcase for have test data.

For run the project you need docker and docker compose
first build with 

```
docker-compose build
```

and then run with

```
docker-compose up
```

The front run in localhost:3000 and the back run in localhost:8000.

the back use django and django-rest-framework and the front use react-redux.

Make this project has taken to me 4.5 hours work man.
