module Buttons
	class ThemeButtonComponent < ButtonsComponent
		CLASSES = {
			base: "cursor-pointer p-2",
			light: "text-logo hover:text-gray-300",
			dark: "dark:text-white dark:hover:text-gray-400"
		}

		def initialize
			@classes = CLASSES.values.join(" ")
		end
	end
end