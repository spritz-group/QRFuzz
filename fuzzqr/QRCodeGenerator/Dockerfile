FROM python:3.9-buster
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN apt-get update && apt-get install -y libzbar0
RUN pip install -r requirements.txt

CMD tail -f /dev/null
