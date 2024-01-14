class CalendarEvent < ApplicationRecord
  belongs_to :user

  with_options presence: true do
    validates :title
    validates :start_date
    validates :end_date
  end

  # 開始日と終了日の逆転防止
  validate :date_check

  private

  def date_check
    if self.start_date < self.end_date
      errors.add(:end_date, 'は開始日より前の日付で登録できません。')
    end
  end
end
