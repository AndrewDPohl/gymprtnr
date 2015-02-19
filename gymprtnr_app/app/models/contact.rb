class Contact < ActiveRecord::Base
  belongs_to :user, foreign_key: "user_id", class_name: "User"
  belongs_to :message, foreign_key: "message_id", class_name: "User"
end
