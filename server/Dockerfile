FROM python:3.10

ENV PYTHONUNBUFFER=1

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY ../docker/server .

EXPOSE 8000

CMD ["python", "manage.py", "runserver"]
