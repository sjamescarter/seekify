class CreateUserInstruments < ActiveRecord::Migration[7.0]
  def change
    create_table :user_instruments do |t|
      t.string :skill
      t.integer :experience
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :instrument, null: false, foreign_key: true

      t.timestamps
    end
  end
end
