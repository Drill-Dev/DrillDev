# Dockerfile that will build the judging image  

FROM python:3.9.6-slim-buster

RUN pip install playwright