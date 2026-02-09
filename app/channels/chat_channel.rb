class ChatChannel < ApplicationCable::Channel
  def subscribed
    chat = current_user.conversations.find(params[:id])
    stream_for chat
  end
  def unsubscribed
    stop_all_streams
  end
  def current_user
      if verified_user = env['warden'].user
        verified_user
      else
        reject_unauthorized_connection
      end
  end
end
