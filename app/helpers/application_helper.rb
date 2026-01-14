module ApplicationHelper
	PAGE_NAMES = {
		"users/sessions" => "Login",
		"users/registrations" => "Sign Up"
	}
	def button_to _name = nil, options = nil, html_options = nil, &block
		super _name, options, html_options.merge(class: "cursor-pointer"), &block
	end
	def page_name
		controller_name = params[:controller]
		if controller_name.match?(/\Ausers\S/)
			return PAGE_NAMES[controller_name]
		end
		controller_name.capitalize
	end
end
