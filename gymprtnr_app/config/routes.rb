Rails.application.routes.draw do
  
  resources :users

  root to: 'users#index'

  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]

end
