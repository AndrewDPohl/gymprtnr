class User < ActiveRecord::Base

  has_many :userssports
  has_many :photos

  def self.from_omniauth(auth)
    where(uid: auth.uid).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.facebook_image = auth.info.image
      user.save!(validate: false) # skip password validation
    end
  end

end
