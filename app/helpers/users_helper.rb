module UsersHelper
	def forgot_pass_link
		if devise_mapping.recoverable? && controller_name != 'passwords' && controller_name != 'registrations'
  			new_password_path(resource_name)
		end
	end
	def sign_up_link
		if devise_mapping.registerable? && controller_name != 'registrations'
  			new_registration_path(resource_name)
		end
	end
	def section_title title="Section title", html_class=""
		tag.h2 title, class: "text-4xl font-bold mb-8" + html_class
	end
	def login_link
		if controller_name != 'sessions' 
	  		new_session_path(resource_name)
		end 
	end
	def omniauth_links &block
		if devise_mapping.omniauthable?
			resource_class.omniauth_providers.each do |provider|
				yield(omniauth_authorize_path(resource_name, provider), provider)
			end
		end
	end
end