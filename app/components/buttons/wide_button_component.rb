module Buttons
	class WideButtonComponent < ButtonsComponent
		CLASSES = "button font-medium mt-1 mb-1 actions w-full flex justify-center p-2 rounded-md cursor-pointer"
		def initialize color: :blue
			@color = set_color(color)
			@classes = CLASSES + " " + @color
		end
		private
			attr_reader :color
			def set_color color
				if color == :blue
					"bg-blue-500 text-white  hover:bg-blue-400"
				elsif color == :light_blue
					"bg-blue-300 hover:bg-blue-500 hover:text-white text-blue-700"	
				end	
			end 
	end
end