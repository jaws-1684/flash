class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: %i[github google]
  has_many :user_providers, dependent: :destroy
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }      
end