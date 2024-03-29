# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts 'seedの実行を開始'

# seedsフォルダ内の引数ファイルのパスを返す
def seeds_path(file_name)
  return "./db/seeds/#{file_name}.rb"
end

# ユーザー
require seeds_path('user')

# 予定
require seeds_path('calendar_event')

puts 'seedの実行を完了'