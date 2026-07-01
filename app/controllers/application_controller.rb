class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_current_user_on_chat

  include Auth
  include Inertiable
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [ :username ])
    end
    def broadcast_to messageable, message, type
      channels = {
        "Chat" => -> { ChatChannel.broadcast_to(messageable, message) },
        "GroupChat" => -> { ChatGroupChannel.broadcast_to(messageable, message) } 
      }
      channels[type].call
    end
    def set_current_user_on_chat
      Chat.Current = current_user.try(:id)
    end
end
