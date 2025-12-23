class CreateMemos < ActiveRecord::Migration[7.1]
  def change
    create_table :memos do |t|
      t.text :body, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :memos, :created_at
  end
end
