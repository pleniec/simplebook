module Api
	class BaseController < ApplicationController

		rescue_from ActionController::ParameterMissing do |exception|
			render json: {exception: exception.message}, status: 500
		end
		
	end
end