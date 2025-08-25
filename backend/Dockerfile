FROM ruby:3.2.2-slim AS build_deps
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev

FROM ruby:3.2.2-slim AS runtime_deps
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    tzdata \
    postgresql-client

FROM build_deps AS builder
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle config set --local without 'development test' && \
    bundle install --jobs $(nproc) --retry 3

FROM build_deps AS development
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs $(nproc) --retry 3
COPY . .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
CMD ["rails", "s", "-b", "0.0.0.0"]

FROM runtime_deps AS production
WORKDIR /app
COPY --from=builder /usr/local/bundle/ /usr/local/bundle/
COPY . .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
EXPOSE 8080
CMD ["bundle", "exec", "rails", "s", "-p", "8080", "-b", "0.0.0.0"]

