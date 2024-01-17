##################################################################

# 予定

##################################################################

users_count = User.all.count

users_count.times do |i|
  puts "CalendarEventモデルのレコード作成（#{i + 1}/#{users_count}）"
  
  user_id = i + 1

  10.times do |j|
    start_date = (Date.today - rand(0..60)) + rand(0..60)
    end_date = start_date + rand(0..10)

    CalendarEvent.create!(
      title: "サンプル予定-#{i}-#{j}",
      description: 'サンプル予定の説明です。サンプル予定の説明です。サンプル予定の説明です。サンプル予定の説明です。サンプル予定の説明です。',
      start_date: start_date,
      end_date: end_date,
      color: [0, 10, 20, 30].sample,
      user_id: user_id
    )
  end
end