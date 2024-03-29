Rails.application.routes.draw do
  namespace :api do
    resources :events, only: [:index, :create, :update, :destroy] do
      resources :invites, only: [:create, :destroy]
    end
    resources :invites, only: [:update]
    resources :instruments, only: [:index, :create]
    resources :profiles, only: [:index, :create, :update]
    resources :user_instruments, only: [:index, :create, :update, :destroy]
    resources :users, only: [:index, :destroy]
    resources :venues, only: [:index, :create, :show]

    get '/me', to: 'users#show'
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
  end
  
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
