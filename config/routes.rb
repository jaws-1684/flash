Rails.application.routes.draw do
  inertia "/groups" => "groups/index"
  inertia "/contacts" => "contacts/contacts"
  inertia "/settings" => "settings/settings"
  inertia "/new_group" => "groups/new"

  scope "api" do
    get "search", to: "users#search"
    get "search_groups", to: "group_chats#search"
  end

  namespace "chats" do
    post ":chat_id/messages", to: "chats#create"
    get ":chat_id/messages", to: "chats#show"
  end

  namespace "group_chats" do
    post ":group_chat_id/messages", to: "group_chats#create"
    get ":group_chat_id/messages", to: "group_chats#show"
  end

  devise_for :users, controllers: {
    registrations: "users/registrations",
    sessions: "users/sessions",
    omniauth_callbacks: "users/omniauth_callbacks",
    passwords: "users/passwords"
  }

  as :user do
    get "login", to: "users/sessions#new"
    get "signup", to: "users/registrations#new"
    post "signup", to: "users/registrations#create"
    patch "registrations", to: "users/registrations#update"
    post "login", to: "users/sessions#create"
    match "logout", to: "users/sessions#destroy", via: Devise.mappings[:user].sign_out_via
  end

  resources :group_chats, only: %i[create destroy]
  resources :chats, only: %i[index create destroy]
  resources :messages, only: [:destroy, :update]

  root "chats#index"
  # Redirect to localhost from 127.0.0.1 to use same IP address with Vite server
  constraints(host: "127.0.0.1") do
    get "(*path)", to: redirect { |params, req| "#{req.protocol}localhost:#{req.port}/#{params[:path]}" }
  end

  get "inertia-example", to: "inertia_example#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
