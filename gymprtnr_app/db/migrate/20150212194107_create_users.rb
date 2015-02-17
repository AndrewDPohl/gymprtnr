class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :name
      t.string :oauth_token
      t.datetime :oauth_expires_at
      t.integer :age
      t.string :city
      t.string :zipcode
      t.text :bio
      t.string :phone_number

      t.timestamps null: false
    end
  end
end
