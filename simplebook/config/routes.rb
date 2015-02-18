Rails.application.routes.draw do
  
  get '', to: 'single_page#index'

  scope '/:locale' do

    devise_for :users, controllers: {
      registrations: 'custom_devise/registrations',
      sessions: 'custom_devise/sessions'
    }, defaults: { format: :json }, constraints: { format: :json }

  	get '/index', to: 'views#index'
    get '/home', to: 'views#home'

  end

  namespace :api, defaults: { format: :json }, constraints: { format: :json } do
  	namespace :v1 do

  		scope :users do
  			post '/register', to: 'users#register'
        post '/login', to: 'users#login'
  		end

  	end
  end

end
