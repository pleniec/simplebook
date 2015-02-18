module AngularHelper

	def angular_form(form_name, form_data_name, options = {})
		options.merge!({'ng-form' => form_name})
		content_tag(:div, options) do
			yield AngularForm.new(form_name, form_data_name)
		end
	end

	class AngularForm
		include ActionView::Helpers::FormTagHelper

		def initialize(form_name, form_data_name)
			@form_name = form_name
			@form_data_name = form_data_name
		end

		def text_field(name, options = {})
			add_angular_options(name, options)
			text_field_tag(name, '', options)
		end

		def email_field(name, options = {})
			add_angular_options(name, options)
			email_field_tag(name, '', options)
		end

		def password_field(name, options = {})
			add_angular_options(name, options)
			password_field_tag(name, '', options)
		end

		def validation_error(name, message)
			content_tag(:p, message, class: 'text-danger',
				'ng-show' => "#{@form_name}.#{name}.$invalid && #{@form_name}.#{name}.$dirty",)
		end

		private
		def add_angular_options(name, options)
			options.merge!({'ng-model' => "#{@form_data_name}.#{name}",
				'name' => name, class: 'form-control'})
		end

	end

end
