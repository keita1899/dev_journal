FROM ruby:3.2.2-slim

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev postgresql-client git vim

WORKDIR /backend

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .