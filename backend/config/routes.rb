Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.

  devise_for :users,
             path: "api/v1",
             controllers: {
               registrations: "api/v1/registrations",
               sessions: "api/v1/sessions",
             }

  namespace :api do
    namespace :v1 do
      get "health" => "health#show"
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
