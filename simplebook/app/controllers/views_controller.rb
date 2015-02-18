class ViewsController < ApplicationController

	before_action except: [:index] do
		unless User.valid_token?(params[:token])
			render nothing: true, status: :unauthorized
		end
	end

	def index
	end

	def home
	end
	
end