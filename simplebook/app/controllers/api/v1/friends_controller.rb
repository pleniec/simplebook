module Api
	module V1
		class FriendsController < Api::BaseController
			include TokenAuthentication

			def potential_friends
				render json: []
			end

		end
	end
end