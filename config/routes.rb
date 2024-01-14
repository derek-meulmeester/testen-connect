# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get "/api/stripe/accounts" => "stripe#list_accounts"
  post "/api/stripe/account" => "stripe#create_account"
  get "/api/stripe/account/:account_id" => "stripe#retrieve_account"
  get "/api/stripe/account/:account_id/account_link" => "stripe#create_account_link", as: :stripe_account_link
  post "/api/stripe/account/:account_id/account_session" => "stripe#create_account_session"

  root to: "dashboard#index"
  get "/*react_route", to: "dashboard#index"
end
