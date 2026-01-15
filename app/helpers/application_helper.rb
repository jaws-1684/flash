module ApplicationHelper
	PAGE_NAMES = {
		"users/sessions" => "Login",
		"users/registrations" => "Sign Up",
		"users/passwords" => "Forgot Password"
	}
	
	def page_name
		controller_name = params[:controller]
		if controller_name.match?(/\Ausers\S/)
			return PAGE_NAMES[controller_name] if PAGE_NAMES[controller_name]
		end
		controller_name.capitalize
	end
	def flash_errors
		flash.any? do |name, msg|  
			return msg if name == "alert" 
		end 
	end
end
