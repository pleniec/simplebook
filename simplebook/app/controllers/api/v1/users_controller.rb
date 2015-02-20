module Api
	module V1
		class UsersController < Api::BaseController
			include TokenAuthentication
			skip_before_action :authenticate, except: [:logout]

			def register
				user = User.new(register_params)
				if user.save
					render json: user, status: :created
				else
					render json: user.errors, status: :unprocessable_entity
				end
			end

			def login
				token = User.login(params[:email], params[:password])
				if token
					render json: {token: token}
				else
					render json: {error: t('api.v1.users.invalid_credentials')}, status: :unprocessable_entity
				end
			end

			def logout
				current_user.token = nil
				current_user.save!
				render nothing: true
			end

			private
			def register_params
				params.require(:user).permit(:email, :password, :first_name, :last_name)
			end

		end
	end
end
