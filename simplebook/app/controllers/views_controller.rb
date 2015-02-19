class ViewsController < ApplicationController
	include TokenAuthentication
	skip_before_action :authenticate, only: [:index]

	layout 'main', except: [:index]

	def index
	end

	def home
	end

	def find_friends
	end
	
end