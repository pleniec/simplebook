class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :first_name, presence: true
  validates :first_name, length: {in: 3..20}, if: -> (user) { user.first_name.present? }
  validates :last_name, presence: true
  validates :last_name, length: {in: 3..20}, if: -> (user) { user.last_name.present? }

  def self.login(email, password)
  	user = self.find_by_email(email)

  	return nil if user.nil?
  	return nil unless user.valid_password?(password)

  	user.token = SecureRandom.urlsafe_base64
  	user.save!

  	user.token
  end

  def self.valid_token?(token)
    return self.exists?(token: token)
  end

end
