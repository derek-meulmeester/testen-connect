# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
ruby "3.3.0"

# Server
gem "bootsnap", require: false

gem "puma", "~> 6.4"
gem "rails", "~> 7.1.2"

# Datastores
# gem "pg", "~> 1.5"
gem "sqlite3", "~> 1.4"

# Auth
gem "devise"

# Models
gem "activerecord-rescue_from_duplicate"
gem "frozen_record"
gem "smart_properties"

# API
gem "rack-cors"
gem "graphql"
gem "graphql-batch"
gem "graphiql-rails"

# Jobs/Service Objects
gem "active_operation"
gem "good_job"

# Mailer
gem "premailer-rails"

# Assets
gem "sprockets-rails"
gem "vite_rails"

# Config
gem "config"

# Finance
gem "stripe"

# Monitoring
gem "bugsnag"
gem "debug"
gem "newrelic_rpm"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

group(:development, :test) do
  gem "byebug"
  gem "factory_bot_rails"
  gem "faker"
  gem "letter_opener"
  gem "mocha"
  gem "rspec-rails"
  gem "rubocop"
  gem "rubocop-shopify", require: false

  gem "shoulda-matchers"
  gem "timecop"
end

group(:development) do
  gem "spring"
end
