class ChangeDataTypeForExperience < ActiveRecord::Migration[7.0]
  def change
    change_column :user_instruments, :experience, :string
  end
end
