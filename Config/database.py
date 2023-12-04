from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from Config.config import app

db = SQLAlchemy(app)
migrate = Migrate(app, db)