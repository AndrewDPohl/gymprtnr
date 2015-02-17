Rails.application.routes.draw do
  

  root to: 'users#index'

  get "users", to: "users#index"
  patch "users", to: "users#update"
  get "user_info", to: "sessions#user_info"

  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'logout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

#        users GET      /users(.:format)                   users#index
#              POST     /users(.:format)                   users#create
#     new_user GET      /users/new(.:format)               users#new
#    edit_user GET      /users/:id/edit(.:format)          users#edit
#         user GET      /users/:id(.:format)               users#show
#              PATCH    /users/:id(.:format)               users#update
#              PUT      /users/:id(.:format)               users#update
#              DELETE   /users/:id(.:format)               users#destroy
#         root GET      /                                  users#index
#       update GET      /update(.:format)                  users#create
#              GET|POST /auth/:provider/callback(.:format) sessions#create
# auth_failure GET|POST /auth/failure(.:format)            redirect(301, /)
#      signout GET|POST /logout(.:format)                  sessions#destroy

end
