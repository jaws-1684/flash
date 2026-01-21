# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
   skip_before_action :authenticate_user!, only: %i[ new ]
  # GET /resource/sign_in
  def new
    render inertia: 'Auth/Login', props: {}
  end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate(auth_options)
    
    if resource
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      respond_with resource, location: after_sign_in_path_for(resource)
    else
      render inertia: 'Auth/Login', props: {
        errors: { general: 'Invalid email or password!' }
      }, status: :unprocessable_entity
    end
  end
 
  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
