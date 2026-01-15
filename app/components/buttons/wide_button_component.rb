module Buttons
	class WideButtonComponent < ButtonsComponent
		CLASSES = "button font-medium mt-1 mb-1 actions flex justify-center items-center p-2 rounded-md cursor-pointer w-full"
		def initialize color: :blue, href: "", type: :button
			@color = set_color(color)
			@type = type
			@href = href
			@classes = CLASSES + " " + @color
		end
		private
			attr_reader :color, :href, :type
			def set_color color
				if color == :blue
					"bg-logo text-white hover:bg-blue-900/80"
				elsif color == :light_blue
					"outline outline-gray-300 hover:outline-gray-500"	
				end	
			end 
	end
end