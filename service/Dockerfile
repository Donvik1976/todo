FROM python:3.10


RUN pip install --upgrade pip
COPY ./ ./
RUN pip3 install -r requirements.txt

RUN pip3 install gunicorn