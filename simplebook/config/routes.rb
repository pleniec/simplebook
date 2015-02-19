Rails.application.routes.draw do
  
  get '', to: 'single_page#index'

  scope '/:locale' do

    devise_for :users, controllers: {
      registrations: 'custom_devise/registrations',
      sessions: 'custom_devise/sessions'
    }, defaults: { format: :json }, constraints: { format: :json }

    get '/index', to: 'views#index'
    get '/home', to: 'views#home'
    get '/find_friends', to: 'views#find_friends'

  end

  namespace :api, defaults: { format: :json }, constraints: { format: :json } do
  	namespace :v1 do

  		scope :users do
  			post '/register', to: 'users#register'
        post '/login', to: 'users#login'
        post '/logout', to: 'users#logout'
  		end

      scope :friends do
        post '/potential_friends', to: 'friends#potential_friends'
      end

  	end
  end

end
