class CalendarEvent < ApplicationRecord
  belongs_to :user

  enum color: { blue: 0, red: 10, green: 20, yellow: 30 }

  with_options presence: true do
    validates :title
    validates :start_date
    validates :end_date
  end

  # 開始日と終了日の逆転防止
  validate :date_check

  private

  def date_check
    if start_date.present? && end_date.present? && start_date > end_date
      errors.add(:end_date, 'は予定開始日付より前の日付で登録できません。')
    end
  end
end
