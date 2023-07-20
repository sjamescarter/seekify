Rails.application.routes.draw do
  get '/hello', to: 'application#hello_world'
  
  # Defines the root path route ("/")
  # root "articles#index"
end
