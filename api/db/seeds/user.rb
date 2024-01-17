##################################################################

# ユーザー

##################################################################

users = [
  { email: 'test1@test.com', password: 'password' },
  { email: 'test2@test.com', password: 'password' },
  { email: 'test3@test.com', password: 'password' },
];

users.each_with_index do |user, index|
  user = User.find_or_create_by!(email: user[:email]) do |end_user|
    puts "Userモデルのレコード作成（#{index + 1}/#{users.count}）"
    end_user.email = user[:email]
    end_user.password = user[:password]
  end
end