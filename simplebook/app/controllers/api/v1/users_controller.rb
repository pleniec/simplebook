module Api
	module V1
		class UsersController < Api::ApiController

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
					render json: {token: token}, status: :ok
				else
					render json: {error: t('api.v1.users.invalid_credentials')}, status: :unprocessable_entity
				end
			end

			private
			def register_params
				params.require(:user).permit(:email, :password, :first_name, :last_name)
			end

		end
	end
end
