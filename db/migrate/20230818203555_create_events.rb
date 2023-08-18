class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :date
      t.datetime :rehearsal
      t.boolean :public
      t.text :description
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :venue, null: false, foreign_key: true

      t.timestamps
    end
  end
end
