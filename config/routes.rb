Rails.application.routes.draw do
  resources :instruments, only: [:index, :create]
  resources :users, only: [:index]
  resources :profiles, only: [:index, :create, :update]
  resources :venues, only: [:index, :create, :show]
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
