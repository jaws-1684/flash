module Links
	class DefaultLinkComponent < LinksComponent
		CLASSES = "button actions text-blue-700 cursor-pointer hover:text-blue-400"
		def initialize href:
			@classes = CLASSES
			@href = href
		end
		private
			attr_reader :href
	end
end