class CreateUsersSports < ActiveRecord::Migration
  def change
    create_table :users_sports do |t|
      t.string :name
      t.integer :user_id
      t.integer :sport_id

      t.timestamps null: false
    end
  end
end
