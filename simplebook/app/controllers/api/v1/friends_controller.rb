module Api
	module V1
		class FriendsController < Api::BaseController
			include TokenAuthentication

			def potential_friends
				total = User.where.not(id: current_user.id).count
				result = User.where.not(id: current_user.id).offset(params[:offset]).limit(params[:limit])
				render json: {total: total, result: result.as_json(only: [:id, :first_name, :last_name])}
			end

		end
	end
end