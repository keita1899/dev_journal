class CreateDailyReports < ActiveRecord::Migration[7.1]
  def change
    create_table :daily_reports do |t|
      t.text :content, null: false
      t.date :date, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end

    add_index :daily_reports, [:user_id, :date], unique: true
  end
end
