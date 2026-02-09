class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  require 'date'
  include Auth
  include Inertiable
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  def order_by_creation_time messages
    ordered = messages.order(created_at: :desc).group_by {|mes| date_to_words(mes.created_at)}
    ordered.each_with_object([]) do |(k, value), a|
      a.push({
        group_name: k,
        data: value
      })
    end
  end
  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    end
    def date_to_words created_at
      date = DateTime.parse(created_at.to_s)
      words = if date.today?
                "Today"
              elsif date.yesterday? 
                "Yesterday"
              elsif date <= Time.now && date > 8.days.ago 
                date.strftime("%A")
              else
                date.strftime("%Y-%m-%d")    
              end
    end
   
end
