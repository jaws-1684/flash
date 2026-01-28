require 'digest'
require 'uri'
 
module AvatarProviders
  class Gravatar
    def initialize(email_address:, default: "https://www.gravatar.com/avatar", size: 40)
      @email_address = email_address.downcase
      @default = default
      @size =  size
    end

    def avatar_src
      "https://www.gravatar.com/avatar/#{hexdigest}?#{params}"
    end

    private 
      def hexdigest
        Digest::SHA256.hexdigest(@email_address)
      end
      def params
        URI.encode_www_form('d' => @default, 's' => @size)
      end
  end
end
