Rails.application.routes.draw do
  
  resources :users

  root to: 'users#index'

  # get '/logout', to: 'sessions#destroy'

  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'logout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

end
