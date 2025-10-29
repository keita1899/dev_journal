Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      resources :daily_reports, only: %i[index create]
      resources :articles, only: %i[index show create]
      resources :memos, only: %i[create]
    end
  end
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  get 'up' => 'rails/health#show', as: :rails_health_check
end
