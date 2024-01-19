# SPA Calendar
「Rails API + React」を使用したカレンダー式予定管理アプリ

<img style="width: 48%;" src="https://github.com/fujii-kazuki/spa-calendar/assets/142955783/3251f125-d1fa-476c-88ee-bbd40e13e298">
<img style="width: 48%;" src="https://github.com/fujii-kazuki/spa-calendar/assets/142955783/d0ecd987-ac22-4f4b-8bdd-b4f12d7904e6">
<img style="width: 48%;" src="https://github.com/fujii-kazuki/spa-calendar/assets/142955783/00e7932a-3e5d-406c-b048-183264f66943">
<img style="width: 48%;" src="https://github.com/fujii-kazuki/spa-calendar/assets/142955783/b9cea543-dc32-4854-84f6-26f5f3d474be">

## 概要 
- [プレビュー](#プレビュー)
- [テーマについて](#テーマについて)
- [工夫・アピール](#工夫アピール)
- [反省点](#反省点)
- [使用技術](#使用技術)
- [機能一覧](#機能一覧)
- [作成期間](#作成期間)

## プレビュー
https://github.com/fujii-kazuki/spa-calendar/assets/142955783/fbdbfbcf-51fe-40c9-9bc6-4c6030e054dd

## テーマについて
「Rails API」と「Axiosによる非同期通信」を学習して身につけていた事もあり、それらの応用と学習も兼ねてシングルページアプリケーション式のカレンダーを作成しようと思いました。  
機能面については、カレンダーといえばスケジュールを書く事が醍醐味だと思い、予定管理機能の実装を決定。  
「スケジュールを書く」という事に着目し、UIに手書き感と紙感を意識した「温かみを感じられるアプリ」をテーマに開発に取り組みました。

## 工夫・アピール
- エラーハンドリングにRailsのConcernを用いたり,ロジック分離の為にReactのカスタムフックを用いたりなど、重複が無く、管理のし易いコードを書く事を徹底
- UI実装に「TailwindCSS」を利用し、共通スタイルはSassで独自のクラスを用意するなど、全体の統一感と管理のし易さを徹底
- カラーラジオボタンで予定に色を設定出来るようにする事で、予定の種類を識別し易くした
- 紙がヒラッ...と落ちてくるようなモーダルアニメーションを実装して、よりテーマを感じられるようにした  
※プレビュー動画だと倍速で分かりづらい

## 反省点
- SPAを活かせる「ページ遷移アニメーション」の実装が出来れば良かったが、計画が甘く、時間が足りなかった
- もう少し個性的な機能とアイデアがあると良かった

## 使用技術
- バックエンド
  - Ruby 3.2.2
  - Ruby on Rails API 7.1.2
  - Devise
- フロントエンド
  - Vite 5.0.8
  - React 18.2.0
  - React Router
  - Axios
  - FullCalendar
  - Sass
  - TailwindCSS
- その他
  - Docker / Docker-Compose
  - Visual Studio Code

## 機能一覧
- 認証（Gem Devise）
  - 新規登録
  - ログイン
  - ログアウト
  - 登録削除
- カレンダー(npm FullCalendar)
  - 次毎のページネーション
  - 予定閲覧
- 予定管理
  - 追加
  - 編集
  - 削除

## 作成期間
2024年1月12日〜2024年1月18日  
7日間（約52時間）
