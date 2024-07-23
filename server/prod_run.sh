export FLASK_ENV=development
export SQLALCHEMY_URL=postgresql://limes:pass123@db:14346/limes
alembic upgrade head
flask run --host=0.0.0.0 --port 30003