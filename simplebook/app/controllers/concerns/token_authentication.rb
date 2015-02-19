module TokenAuthentication
	extend ActiveSupport::Concern

	included do
		before_action :authenticate
	end

	mattr_accessor :current_user

	private
	def authenticate
		token = params[:token]
		if token.nil?
			render nothing: true, status: :unauthorized
		else
			self.current_user = User.find_by_token(token)
			if self.current_user.nil?
				render nothing: true, status: :unauthorized
			end
		end
	end

end
