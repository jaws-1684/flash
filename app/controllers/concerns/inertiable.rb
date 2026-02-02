require 'active_support/concern'

module Inertiable
   extend ActiveSupport::Concern
  
  included do
    inertia_share errors: -> {
      session.delete(:errors) || {} 
    }
    
    inertia_share flash: -> {
      {
        notice: flash[:notice],
        alert: flash[:alert]
      }
    }
    inertia_share authenticity: -> {
      {
        csrf_token: form_authenticity_token
      }
    }
    inertia_share current_user: -> {
      current_user
    }
  end
  
  def redirect_to(options = {}, response_options = {})
    if (errors = response_options.delete(:errors))
      session[:errors] = errors
    end
    super(options, response_options)
  end

  private

end