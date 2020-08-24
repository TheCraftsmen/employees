FROM python:3.8.5-alpine3.12
ENV PYTHONUNBUFFERED 1
RUN apk add --no-cache bash
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/