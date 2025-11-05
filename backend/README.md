# What’s Cooking backend
## Getting Started
First, navigate to the `./backend` directory in the project repo.
### Creating a virtual environment
Run `python -m venv myenv` to create the `myenv` virtual environment. Activate it by running `source myenv/bin/activate` (for macOS users) or `myenv\Scripts\activate` (for Windows users).
### Installing dependencies
Once the virtual environment is activated, you can install the dependencies. Run the command `pip install -r requirements.txt`.
### Setting up the database
To set up the database, run `python manage.py makemigrations` and then `python manage.py migrate`. You should see `db.sqlite3` appear in the directory.
### Running tests
To run the tests, use the command `pytest api/tests/ -q --disable-warnings`.
### Running the code
You can run the code using `python manage.py runserver`.