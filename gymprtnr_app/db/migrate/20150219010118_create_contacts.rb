class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.references :user, index: true
      t.references :message, index: true

      t.timestamps null: false
    end
    add_foreign_key :contacts, :users
  end
end
