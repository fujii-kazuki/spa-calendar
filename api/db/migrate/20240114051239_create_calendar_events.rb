class CreateCalendarEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :calendar_events do |t|
      t.string     :title
      t.string     :description
      t.date       :start_date
      t.date       :end_date
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
